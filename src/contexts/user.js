import { createContext, } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { toast } from "react-toastify";

const UserContext = createContext()

export const UserProvider = ({children})=>{

    const { authenticate, isAuthenticated, logout,user,Moralis, authError} = useMoralis(); 
    const connect = async ()=>{  
        try{
            await Moralis.enableWeb3()
             await  authenticate({
                // provider:'walletconnect',
                signingMessage:"MEHG Token Auth",
                
             }) 
             console.log(authError)
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
    const accountChanged = async ()=>{
        
            await disconnect()
            // toast.info('Address changed. Reconnect your wallet address.')
        
    }
    const formatAddress = (address)=>{
        var front = address.slice(0,4)
        var back = address.slice(-4)
        return front +'.....'+ back
    }
    return (
        <UserContext.Provider value={{formatAddress,user,isAuthenticated,fetch,disconnect,connect, accountChanged}}>
            {children}
        </UserContext.Provider>
    )

}
export default UserContext