import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootNavigator } from './src/navigation /Navigator/RootNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef, setIsNavigationReady } from './src/navigation /Navigation'
import "./global.css";

const App = () => {
  return (
    <NavigationContainer ref={navigationRef} onReady={setIsNavigationReady}>
        <RootNavigator/>
    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({})