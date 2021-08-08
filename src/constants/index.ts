import Constants from 'expo-constants'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

export { DefaultThemeColor } from './theme'
export const isIOS = Platform.OS === 'ios'

export const appVersion = `v. ${Constants.nativeAppVersion}; build ${Constants.nativeBuildVersion}`

export const osVersion = `${Device.osName} ${Device.osVersion}`

export const mobileVersion = `${Device.manufacturer} ${Device.modelName}`

export const technicalInfo = `${mobileVersion}; ${osVersion}; ${appVersion}`
