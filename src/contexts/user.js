import { createContext, } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { toast } from "react-toastify";

const UserContext = createContext()

export const UserProvider = ({children})=>{

    const { authenticate, isAuthenticated, logout,user,Moralis} = useMoralis(); 
    const connect = async ()=>{  
        try{
             await  authenticate({provider: 'walletConnect',
              chainId:97,
              mobileLinks: [
                'rainbow',
                'metamask',
                'argent',
                'trust',
                'imtoken',
                'pillar',
              ],}) 
            
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
    return (
        <UserContext.Provider value={{user,isAuthenticated,fetch,disconnect,connect, accountChanged}}>
            {children}
        </UserContext.Provider>
    )

}
export default UserContext