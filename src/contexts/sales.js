import { createContext } from "react"
import { useApiContract, useMoralis, useWeb3Contract } from "react-moralis";
import UTILS from "../utils";

const SaleContext = createContext()
export const SaleProvider = ({children})=>{
    const {user, Moralis} = useMoralis();
     
    const busdOptions = {
        contractAddress: UTILS.busdAddress, 
        abi: UTILS.busdAbi,
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
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        
        return res
    }
    
    const checkAllowance = async ()=>{
        await Moralis.enableWeb3() 
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
            amount = Moralis.Units.FromWei(a) 
        } catch (error) {
            console.log(error)
        }
        
        return amount
    }

    return (
        <SaleContext.Provider value={{approveAllowance,checkAllowance}}>
            {children}
        </SaleContext.Provider>
    )
}

export default SaleContext