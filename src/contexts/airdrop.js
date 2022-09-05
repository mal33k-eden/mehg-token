import { createContext, useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { toast } from "react-toastify";
import client from "../sanity";
import UTILS from "../utils";

const AirdropContext = createContext()

export const AirdropProvider = ({children})=>{
    const {isAuthenticated,Moralis,user,enableWeb3} = useMoralis()
    const { data,runContractFunction, error } =useWeb3Contract();   
    
    const addressExist = async (address) => {
        console.log(address)
          const params = {
          address:address,
        }; 
        const query  = `*[_type == "referralLink" && lower(address) == '${address}'] {address}` 
        let records = await client.fetch(query, params);
        if (records.length > 0 ) {
            return true
        }
        return false
      };
    const getAirdropDetails = async (address) => {
      const params = {
        address:address,
      }; 
      const query  = `*[_type == "referralLink" && lower(address) == '${address}'] {address,invitedBy}` 
      let records = await client.fetch(query, params);
      return records[0]
    };
    const generateLink = async (connectedUser,referredBy)=>{
        const isValid = await addressExist(connectedUser)
        if (isValid) return false 

        const participant = {
            _type: 'referralLink',
            address: connectedUser, 
            invitedBy: referredBy, 
        }          
        try {
            await client.create(participant)
            return true
        } catch (error) {
            console.log(error)
        }
        return false
    }
    const whitelistReferredAddress =async  (referredBy)=>{
        await enableWeb3()
        if (Moralis.isWeb3Enabled) {
            try {
                  await Moralis.executeFunction({
                    abi: UTILS.airDropAbi,
                    contractAddress: UTILS.airdropAddress,
                    functionName: "airdropWhitelist",
                    params: {_referredBy:referredBy},
                })
                return {
                    status:true,
                }
            } catch (err) {
                console.log(error)
                return {
                    status:false,
                    msg:error || err.data.message
                } 
            }
           
         } 
        return false
    }
    const getReferredAddresses =async  ()=>{
        await enableWeb3()
        if (Moralis.isWeb3Enabled) {
            var options = {
                abi: UTILS.airDropAbi,
                contractAddress: UTILS.airdropAddress,
                functionName: "getReferral",
                params:{
                    _referrer:user.get('ethAddress')
                }
             } 
            try {
                await runContractFunction({params: options})
                
            } catch (err) { 
            } 
            if(data != undefined){
                return data.length
            }
           
        }
        return 0 
    }
    return (
        <AirdropContext.Provider value={{generateLink,addressExist,getAirdropDetails,
            whitelistReferredAddress,getReferredAddresses

        }}>{children}</AirdropContext.Provider>
    )
}

export default AirdropContext