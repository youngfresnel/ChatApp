import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import '../../global.css';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ROUTES from '../navigation /routes/Routes';
import { useNavigation } from '@react-navigation/native';
import { scale } from '../responsiveSize';

type RooStackParamList = {
  [key:string]:any
}

type PhoneNumberScreenNavigatorProp = NativeStackNavigationProp<RooStackParamList,
 typeof ROUTES.PHONE_NUMBER >;

const PhoneNumber = () => {
  const [PhoneNumber, setPhoneNumber] = useState<string>('');
  const navigation = useNavigation<PhoneNumberScreenNavigatorProp>();
  const [error, setError] = useState<string>('');
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
          value={PhoneNumber}
          onChangeText={(text) => {
            const numericText = text.replace(/\D/g, "");
            setPhoneNumber(numericText);
          }}
          maxLength={10}
          autoFocus={true}
          />
        </View>
        {error && <Text style={{color: '#EF4444',marginTop:scale(8),fontSize:16}}>{error}</Text>}
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