import { SafeAreaView, StyleSheet, Text, TextInput,ActivityIndicator, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ROUTES from '../navigation /routes/Routes'
import { RootStackScreenProps } from '../navigation /routes/types'
import { scale } from '../responsiveSize'
import { useAuthStore } from '../store/authStore'

type Props = RootStackScreenProps<typeof ROUTES.OTP>
const OTP = ({route,navigation}:Props) => {
    const [otp,setOtp] = useState<string>('');
    const [timer, setTimer] = useState<number>(53);
    const [localloading,setLocalLoading] = useState(false);
    const phoneNumber = route?.params?.phoneNumber;
    const {verifyOtp,sendOtp,isLoading:storeLoading, error,setError } = useAuthStore();

    useEffect(() => {
      if (timer > 0){
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        },1000)
        return () => clearInterval(interval);
      }
    },[timer]);

    useEffect(() =>{
      if(otp.length == 6 && !localloading && !storeLoading){
        handleVerify();
      }
    },[otp]);
    const handleVerify = async () => {
      if(!phoneNumber) return;
      setLocalLoading(true);
      setError(null);
      try{
          await verifyOtp(otp,phoneNumber);
          const {user} = useAuthStore.getState();
          if(!user?.firstName){
            navigation.navigate(ROUTES.SET_PIN)
          }
      }catch(err){
          console.error("Verify OTP Failed",err)
      }
    }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
         <View  style={{justifyContent:'flex-start',paddingTop:scale(48), paddingHorizontal: scale(24)}}>
            <Text style={{color:'black', fontSize:30,fontWeight:'bold',marginBottom:scale(8)}}>code de verification </Text>
         <View>
            <Text style={{ color: '#6B7280',fontSize:16}}>Enter le code envoyer a {phoneNumber}</Text>
         </View>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text  style={{color: '#3B82F6',fontSize:16,marginTop:scale(8)}}>Numero incorrect</Text>
         </TouchableOpacity>
         <TextInput
         style={{
          textAlign:'center',
           fontSize: 24,
           letterSpacing: 1.6,
           borderWidth:scale(1),
          borderColor: '#D1D5DB',
          color:'gray',
          paddingVertical:scale(16)
         }}
         keyboardType='phone-pad'
         value={otp}
         onChangeText={(text) => {
          const numericText = text.replace(/\D/g, '');
          setOtp(numericText)
         }}
         maxLength={6}
         autoFocus={true}
         autoComplete='one-time-code'
         />
         {error && <Text style={{color:'red',fontSize:16}}>{error}</Text> }
              {(localloading || storeLoading) && (
                <View style={{marginTop:scale(16),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <ActivityIndicator color='gray'/>
                  <Text style={{color:'gray',marginLeft:scale(8)}}>Verifying...</Text>
                </View>
              )}
         </View>

         <View style={{flexDirection:'row', justifyContent:'space-between',paddingHorizontal:scale(24), paddingBottom:scale(24),marginTop:scale(500)}}>
          <TouchableOpacity>
              <Text  style={{
    color: '#6B7280',        
    fontSize: 16,              
    opacity: timer > 0 ? 0.5 : 1, 
             }}>
    Rensend code in 0:{timer.toString().padStart(2,'0')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
          
          >
              <Text style={{
    color: '#6B7280',        
    fontSize: 16,              
    opacity: timer > 0 ? 0.5 : 1, 
             }}>Call me in 0:{timer.toString().padStart(2,'0')}</Text>
          </TouchableOpacity>
         </View>
    </SafeAreaView>
  )
} 

export default OTP;

const styles = StyleSheet.create({})