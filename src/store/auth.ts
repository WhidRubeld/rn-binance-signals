import { AuthForm, IProfile, PasswordForm } from '@interfaces'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ApiService, HttpService, StorageService } from '@services'

export interface AuthState {
  ready: boolean
  profile: IProfile | null
  token: string | null
}

const initialState: AuthState = {
  ready: false,
  profile: null,
  token: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: AuthForm, { rejectWithValue }) => {
    try {
      return await ApiService.login(payload)
    } catch (e) {
      console.warn(e)
      return rejectWithValue('Error')
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (payload: AuthForm, { rejectWithValue }) => {
    try {
      return await ApiService.register(payload)
    } catch (e) {
      console.warn(e)
      return rejectWithValue('Error')
    }
  }
)

export const profile = createAsyncThunk(
  'auth/profile',
  async (payload, { rejectWithValue }) => {
    try {
      return await ApiService.profile()
    } catch (e) {
      console.warn(e)
      return rejectWithValue('Error')
    }
  }
)

export const passwordChange = createAsyncThunk(
  'auth/passwordChange',
  async (payload: PasswordForm, { rejectWithValue }) => {
    try {
      return await ApiService.passwordChange(payload)
    } catch (e) {
      console.warn(e)
      return rejectWithValue('Error')
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState(state) {
      Object.assign(state, initialState)
      state.ready = true

      HttpService.removeToken()
      StorageService.removeToken()
    },
    setAuthState(
      state,
      { payload }: { payload: { profile: IProfile; token: string } }
    ) {
      Object.assign(state, payload)
      state.ready = true

      HttpService.setToken(payload.token)
      StorageService.setToken(payload.token)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.token = payload.access_token
      state.ready = true

      HttpService.setToken(payload.access_token)
      StorageService.setToken(payload.access_token)
    })
    builder.addCase(profile.fulfilled, (state, { payload }) => {
      state.profile = payload
    })
    builder.addCase(passwordChange.fulfilled, (state, { payload }) => {
      state.profile = payload
    })
  },
})

export const { resetAuthState, setAuthState } = authSlice.actions

export default authSlice.reducer
