import { IPermissions } from '@interfaces'
import { createSlice } from '@reduxjs/toolkit'
import { NotificationPermissionsStatus } from 'expo-notifications'

export interface PermissionState {
  data: IPermissions
}

const initialState: PermissionState = {
  data: {
    notifications: null,
  },
}

export const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions(state, { payload }) {
      state.data = payload
    },
    setNotificationPermission(
      state,
      { payload }: { payload: NotificationPermissionsStatus }
    ) {
      state.data.notifications = payload
    },
  },
})

export const { setPermissions, setNotificationPermission } =
  permissionSlice.actions

export default permissionSlice.reducer
