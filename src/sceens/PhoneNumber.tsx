import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import '../../global.css';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ROUTES from '../navigation /routes/Routes';
import { useNavigation } from '@react-navigation/native';
import { scale } from '../responsiveSize';
import { useAuthStore } from '../store/authStore';

type RooStackParamList = {
  [key:string]:any
}

type PhoneNumberScreenNavigatorProp = NativeStackNavigationProp<RooStackParamList,
 typeof ROUTES.PHONE_NUMBER >;

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const navigation = useNavigation<PhoneNumberScreenNavigatorProp>();
  const {sendOtp, isLoading,error,setError} = useAuthStore()
  const[isLogin] = useState<boolean>(true)
  useEffect(() => {
    if (phoneNumber.length == 10 && !isLoading){
      handleContinue();
    }
  },[phoneNumber])
  const handleContinue = async () => {
    if(!PhoneNumber || PhoneNumber.length <10 ){
      setError ('Please enter a valid 10-digit number ')
      return;
      }
      setError(null);
      try{
         const fullPhone = `+91${phoneNumber}`
         const sessionId = await sendOtp(fullPhone)
         navigation.navigate(ROUTES.OTP, {phoneNumber:fullPhone,sessionId,isLoading})

              }catch(err){
         console.error('Handle continue', err)
      }
  }
  return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <View style={{justifyContent:'flex-start', paddingTop:48,paddingHorizontal:24}}>
        <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginBottom:scale(8)}}>
          Votre numéro de téléphone
        </Text>
        <Text style={{color:'gray', fontSize:16,marginBottom:40}}>
          Entrer votre numéro de téléphone pour commencer
        </Text>
        <View  style={{flexDirection:'row',alignItems:'center', width:'100%', borderColor:'#D1D5DB',borderWidth:scale(1),borderRadius:scale(8), paddingHorizontal: 16,paddingVertical: 12, backgroundColor:'#fff'}}>
          <Text style={{color:'gray', fontWeight:'700',fontSize:18,marginRight:scale(8)}}>+237 |</Text>
          <TextInput style={{color:'black',fontSize:18}} 
          placeholder='Votre numero de telephone'
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => {
            const numericText = text.replace(/\D/g, "");
            setPhoneNumber(numericText);
          }}
          maxLength={10}
          autoFocus={true}
          />
        </View>
        {error && <Text style={{color: 'red',marginTop:scale(8),fontSize:16}}>{error}</Text>}
         {(isLoading) && (
                        <View style={{marginTop:scale(16),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                          <ActivityIndicator color='gray'/>
                          <Text style={{color:'gray',marginLeft:scale(8)}}>Sending OTP...</Text>
                        </View>
                      )}
      </View >
      <View  style={{marginVertical:scale(375)}}>
      <TouchableOpacity>
          <Text style={{color:'blue',fontSize:16, textAlign:'center'}}>Cancel</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 

export default PhoneNumber

const styles = StyleSheet.create({})