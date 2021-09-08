import { Dispatch } from '@reduxjs/toolkit'
import { resetAuthState } from '@store/auth'

export const resetGlobalState = (dispatch: Dispatch) => {
  dispatch(resetAuthState())
}
