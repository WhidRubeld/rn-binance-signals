// @ts-ignore
import Splash from '@assets/images/splash.png'
import { useTheme } from '@hooks'
import React, { useState, useEffect } from 'react'
import { Animated, Easing, Image, StyleSheet } from 'react-native'

const animationValue = new Animated.Value(0)

export default function CustomSplashScreen({ loading }: { loading: boolean }) {
  const { colors } = useTheme()
  const [completeAnimation, setCompleteAnimation] = useState<boolean>(false)

  useEffect(() => {
    if (loading) setCompleteAnimation(false)
    else launchCompleteAnimation()
  }, [loading])

  const launchCompleteAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 7e2,
      easing: Easing.in(Easing.exp),
      useNativeDriver: true,
    }).start(() => setCompleteAnimation(true))
  }

  const opacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  const transform = [
    {
      scale: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.5],
      }),
    },
  ]

  if (!completeAnimation) {
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.container,
          { opacity, transform, backgroundColor: colors.surface },
        ]}
      >
        <Image source={Splash} resizeMode="contain" />
      </Animated.View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
