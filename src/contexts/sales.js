import { createContext } from "react"
import { useApiContract, useMoralis, useWeb3Contract } from "react-moralis";
import UTILS from "../utils";

const SaleContext = createContext()
export const SaleProvider = ({children})=>{
    const {user, Moralis,enableWeb3} = useMoralis();
     
    const busdOptions = {
        contractAddress: UTILS.busdAddress, 
        abi: UTILS.busdAbi,
    }
    const saleOptions = {
        contractAddress: UTILS.saleAddress, 
        abi: UTILS.privateSaleAbi,
    }
    const approveAllowance = async (amount)=>{
        try {
            var res = await Moralis.executeFunction({
                ...busdOptions,
                functionName:'approve',
                
                params:{
                    '_value':Moralis.Units.ETH(amount),
                    "_spender":UTILS.saleAddress
                }
            })
            
        } catch (error) {
            console.log(error)
        }
        return res
    }
    const buyMEHG = async (amount)=>{
        var response = {
            success: false,
            message : null
        }
        try {
            var res = await Moralis.executeFunction({
                ...saleOptions,
                functionName:'BuymehgToken',
                params:{
                    'payableAmount':amount,
                    "_amount":(amount/0.06).toFixed(0)
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
            var amount = 0
            try {
                var a = await Moralis.executeFunction({
                    ...busdOptions,
                    functionName:'allowance',
                    
                    params:{
                        '_owner':user.get('ethAddress'),
                        "_spender":UTILS.saleAddress
                    }
                })
                console.log(a)
                amount = Moralis.Units.FromWei(a) 
                return amount
            } catch (error) {
                console.log(error)
            }

        } 
        
        
        return amount
    }

    return (
        <SaleContext.Provider value={{approveAllowance,checkAllowance,buyMEHG}}>
            {children}
        </SaleContext.Provider>
    )
}

export default SaleContext