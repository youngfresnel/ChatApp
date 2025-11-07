import { CompositeScreenProps } from "@react-navigation/native";
import ROUTES from "./Routes"
import {NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type RootStackParamList = {
    [ROUTES.ROOT]:undefined,



    [ROUTES.ONBOARDING]:undefined,
    [ROUTES.PHONE_NUMBER]:undefined,
    [ROUTES.OTP]:undefined,
    [ROUTES.SET_PIN]:undefined,
    [ROUTES.SETUP_PROFILS]:{tempUserId?:string} | undefined;

    [ROUTES.MAIN_TABS]:undefined,

    [ROUTES.PROFILE]:{userId:string} |undefined,
}


export type ChatTabParamList = {
    [ROUTES.CHATS]:undefined,
    [ROUTES.CONTACT]:undefined,
};


export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;



export type ChatTabScreenProps <T extends keyof ChatTabParamList> = CompositeScreenProps<BottomTabScreenProps<ChatTabParamList, T>,NativeStackScreenProps<RootStackParamList>>;