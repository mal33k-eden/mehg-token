import { createContext, useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { toast } from "react-toastify";
import client from "../sanity";
import UTILS from "../utils";

const AirdropContext = createContext()

export const AirdropProvider = ({children})=>{
    const {isAuthenticated,Moralis,user,enableWeb3} = useMoralis()
    const { data,runContractFunction, error } =useWeb3Contract(); 
    const [bigTotal, setBigTotal] = useState(10)
    const [invites, setInvites] = useState(0)
    useEffect(()=>{
        if (isAuthenticated) {
            getReferredAddresses().then(()=>{
                console.log('kl')
            })
        } 
    },[])
    const addressExist = async (address) => {
        console.log(address)
          const params = {
          address:address,
        }; 
        const query  = `*[_type == "referralLink" && lower(address) == '${address}'] {address}` 
        let records = await client.fetch(query, params);
        console.log(records)
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
                return {
                    status:false,
                    msg:error
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
                
            } catch (error) {
                console.log(error)
            }
            if(data != undefined){
                setInvites(data.length)
                if (data.length <=2) {
                    setBigTotal(2)
                }
                if (data.length > 10 && data.length <=50) {
                    setBigTotal(50)
                }
                if (data.length > 50) {
                    setBigTotal(100)
                }
            }
        }
      
    }
    return (
        <AirdropContext.Provider value={{generateLink,addressExist,getAirdropDetails,
            whitelistReferredAddress,getReferredAddresses,bigTotal,invites

        }}>{children}</AirdropContext.Provider>
    )
}

export default AirdropContext