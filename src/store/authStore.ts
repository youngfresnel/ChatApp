import {create} from 'zustand'
import axios from 'axios';
import {persist, createJSONStorage } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';

const API_BASE_URL = 'http://localhost:3000/api';
axios.defaults.baseURL = API_BASE_URL;
interface User {
    _id:string;
    phone:string;
    firstName?:string;
    lastName?:string;
    email?:string;
};


interface AuthState {
    user: User | null ;
    token: string | null;
    isLoading:boolean;
    error:string | null;
    sessionId:string | null;
    sendOtp:(phone:string) => Promise<string>;
    verifyOtp:(otp:string,phone:string) => Promise<void>;
    setPin:(pin:string) => Promise<void>
    verifyPin:(pin:string) => Promise<boolean>
    completeProfile: (firstName:string, lastName:string, email:string) => Promise<void>;
    verifyToken:() => Promise<void>
    signOut:()=> Promise<void>
    setError:(error:string | null) => void ;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set,get) => ({
            user:null,
            token:null,
            isLoading:false,
            error:null,
            sessionId:null,

            sendOtp:async(phone:string) => {
                set ({isLoading:true,error:null});
                try{
                     const response = await axios.post("/auth/send-otp",{phone});
                     console.log('sendOtp response:',response.data);
                     const sessionId = response.data.sessionId;
                     if (!sessionId){
                        const msg = "OTP sent, but no sessionId returned. Check backend ";
                        set({error:msg});
                        throw new Error (msg);
                     };
                     set ({sessionId});
                     return sessionId;
                }catch(err:unknown){
                    console.error("Send Otp Failed",err);
                    const msg = (err as any)?.response?.data?.error || 'Failed to send OTP';
                    set({error:msg});
                    throw new Error(msg);
                }finally{
                    set({isLoading:false});
                }

            },
            verifyOtp:async(otp:string,phone:string) => {
                set({isLoading:true,error:null});
                const sessionId = get().sessionId;
                if(!sessionId) throw new Error ('No Session ID');

                try{
                      const response = await axios.post("/auth/verify-otp",{sessionId,otp,phone})
                      set ({token:response?.data?.token, user:response.data.user,sessionId:null});
                }catch(err:unknown){
                     const errorMsg = (err as any )?.response?.data?.error || 'Invalid OTP';
                     set ({error:errorMsg});
                     throw err;
                }finally{
                    set({isLoading:false})
                }
            },
            setPin:async(pin:string) => {
                set ({isLoading:true,error:null});
                const token = get().token;
                try{
                    await axios.post('/auth/set-pin',{pin},{headers:{Authorization:`Bearer ${token}` }})
                }catch (err:any){
                     set ({error:err.response?.data?.error})
                     throw err;
                }finally{
                    set({isLoading:false})
                }
            },

            verifyPin: async (pin: string) => {
                const {token} = get();
                 set ({isLoading:true,error:null});
                try{
                     const response = await axios.post("/auth/verify-pin",{pin},{
                        headers:{Authorization:`Bearer ${token}`}
                     });
                     set ({isLoading:false});
                     return response.data.success;
                }catch (err:unknown) {
                    const errorMsg = (err as any )?.response?.data?.error || 'Vrification Failed'
                       set ({isLoading:false,error:errorMsg})
                     throw err;
                }
            },

            signOut:async () => {


            },
            verifyToken:async() => {

                
            },
            
            completeProfile:async(firstName:string,lastName:string,email:string) => {


            },

            setError:(error:string | null) => set ({error}),

        }),
        {
            name:'auth-storage',
            storage:createJSONStorage(() => EncryptedStorage),
            partialize:(state) => ({token: state.token,user:state.user}),
        }
    )
)
