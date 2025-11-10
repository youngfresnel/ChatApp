import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from '../routes/Routes';
import PhoneNumber from '../../sceens/PhoneNumber';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from '../../sceens/Chat';
import Contact from '../../sceens/Contact';
import {ChatsIcon} from 'phosphor-react-native'
import OTP from '../../sceens/OTP';
import SetPin from '../../sceens/SetPin';

const AuthStack = createNativeStackNavigator();

function AuthNavigator(){
  return(
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
      <AuthStack.Screen name={ROUTES.PHONE_NUMBER} component={PhoneNumber}/> 
      <AuthStack.Screen name={ROUTES.OTP} component={OTP}/>    
      <AuthStack.Screen name={ROUTES.SET_PIN} component={SetPin}/>     

    </AuthStack.Navigator>
  )

}

const  Tab = createBottomTabNavigator();

function MainTabsNavigator(){
  return(
    <Tab.Navigator
    screenOptions={({route}) =>({
      tabBarActiveTintColor:"black",
      tabBarInactiveTintColor:'gray',
      tabBarStyle:{backgroundColor:'#fff'},
      headerShown:false,
      tabBarIcon:({focused,color,size}:{focused:boolean; color:string; size:number}) =>{
        let iconName:string;
        if (route.name == ROUTES.CHATS) {
          iconName = focused ? "chatbubble" : "chatbubble-outline"
        } else if(route?.name == ROUTES.CONTACT){
          iconName = focused? "person" : 'person-outline'
        } else {
          return null
        }
        return <ChatsIcon name={iconName} size={size} color={color}/>

      }

    })}
    >
          <Tab.Screen name={ROUTES.CHATS} component={Chat} options={{title:"Chats"}}/>
          <Tab.Screen name={ROUTES.CONTACT} component={Contact} options={{title:"Profils"}}/>
    </Tab.Navigator>
  );
}
    
  const RootStack = createNativeStackNavigator ();
  
  export function RootNavigator(){
      const user = false;
    return(
      <RootStack.Navigator screenOptions={{headerShown:false}}>
          {user ? (
            <>
               <RootStack.Screen name={ROUTES.MAIN_TABS} component={MainTabsNavigator}/>
            </>

          ):(
            <RootStack.Screen name={ROUTES.ROOT} component={AuthNavigator}/>
          )}
      </RootStack.Navigator>
    )
  }

  