import { NotificationPermissionsStatus } from 'expo-notifications'

export interface IPermissions {
  notifications: NotificationPermissionsStatus | null
}
