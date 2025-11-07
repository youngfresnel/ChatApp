import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ROUTES from '../navigation /routes/Routes'
import { RootStackScreenProps } from '../navigation /routes/types'

type Props = RootStackScreenProps<typeof ROUTES.OTP>
const OTP = ({route,navigation}:Props) => {
    const [otp,setOtp] = useState<string>('');
    const [timer, setTimer] = useState<number>(53);
    const [localloading,setLocalLocal] = useState(false);
    const phoneNumber = route?.params?.phoneNumber;
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
         <View>
            <Text>code de verification </Text>
         </View>
         <View>
            <Text>Enter le code envoyer a {phoneNumber}</Text>
         </View>
    </SafeAreaView>
  )
} 

export default OTP

const styles = StyleSheet.create({})