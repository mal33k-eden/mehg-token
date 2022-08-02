import { createContext, useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";

const UserContext = createContext()

export const UserProvider = ({children})=>{

    const { authenticate, isAuthenticated, logout,user,enableWeb3,web3} = useMoralis(); 
    const { runContractFunction, error } =useWeb3Contract();
    const connect = async ()=>{  
        try{
            await authenticate()
             
        }catch(error){
            console.log(error)
        }
    }
    const disconnect = async ()=>{ 
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserContext.Provider value={{user,isAuthenticated,fetch,disconnect,connect}}>
            {children}
        </UserContext.Provider>
    )

}
export default UserContext