import { createContext } from "react"
import { useApiContract, useMoralis, useWeb3Contract } from "react-moralis";
import UTILS from "../utils";

const SaleContext = createContext()
export const RoundCProvider = ({children})=>{
    const {user, Moralis,enableWeb3} = useMoralis();
     
    const busdOptions = {
        contractAddress: UTILS.busdAddress, 
        abi: UTILS.busdAbi,
    }
    const saleOptions = {
        contractAddress: UTILS.seedAddress, 
        abi: UTILS.privateSaleAbi,
    }
    const approveAllowance = async (amount)=>{
        try {
            var res = await Moralis.executeFunction({
                ...busdOptions,
                functionName:'approve',
                
                params:{
                    '_value':Moralis.Units.ETH(amount),
                    "_spender":UTILS.saleAddress_1
                }
            })
            return true
        } catch (err) {
            console.log(err) 
        }
        return false
    }
    const buyMEHG = async (amount)=>{
        console.log(amount)
        var response = {
            success: false,
            message : null
        }
        try {
            var res = await Moralis.executeFunction({
                ...saleOptions,
                functionName:'BuymehgToken',
                params:{
                    // 'payableAmount':amount,
                    "_amount":amount
                }
            })
            response.success= true
            
        } catch (error) {
            response.success = false
            response.message=error['data'].message
            return response
        }
        return response
    }
    
    const checkAllowance = async ()=>{ 
        await enableWeb3()
        
        if (Moralis.isWeb3Enabled) {
            var owner = await user.get('ethAddress')
            var amount = 0
            try {
                var a = await Moralis.executeFunction({
                    ...busdOptions,
                    functionName:'allowance',
                    
                    params:{
                        '_owner':owner,
                        "_spender":UTILS.seedAddress
                    }
                }) 
                amount = Moralis.Units.FromWei(a) 
                return parseInt(amount)
            } catch (err) {
                console.log(err)
            }

        } 
        
        
        return amount
    }

    const cancelAllowance = async ()=>{
        try {
            var res = await Moralis.executeFunction({
                ...busdOptions,
                functionName:'approve',
                
                params:{
                    '_value':Moralis.Units.ETH(0),
                    "_spender":UTILS.seedAddress
                }
            })
            return true
            
        } catch (error) {
            console.log(error)
            
        }
        return false
    }

    return (
        <SaleContext.Provider value={{cancelAllowance, approveAllowance,checkAllowance,buyMEHG}}>
            {children}
        </SaleContext.Provider>
    )
}

export default SaleContext