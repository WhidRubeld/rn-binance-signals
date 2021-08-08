import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  Colors,
} from 'react-native-paper'

export const DefaultThemeColor = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: Colors.blueA700,
    accent: Colors.orangeA400,
    background: Colors.grey50,
  },
  roundness: 10,
}
