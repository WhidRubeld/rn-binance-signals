import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Colors,
} from 'react-native-paper'

export const DefaultThemeColor = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: Colors.deepOrange900,
    accent: Colors.blueA700,
  },
  // roundness: 10,
}

export const DarkThemeColor = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: Colors.deepOrange900,
    accent: Colors.blueA700,
  },
  // roundness: 10,
}
