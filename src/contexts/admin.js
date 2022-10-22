import { createContext, } from "react";
import { useMoralis,useWeb3Contract } from 'react-moralis'
import UTILS from "../utils";

const AdminContext = createContext()
export const AdminProvider = ({children})=>{
    const {user,Moralis} = useMoralis(); 
    const { runContractFunction, error } =useWeb3Contract(); 
    const airdropOptions = {
        abi: UTILS.airDropAbi,
        contractAddress: UTILS.airdropAddress,
    } 
    const saleOptions = {
        abi: UTILS.privateSaleAbi,
        contractAddress: UTILS.saleAddress,
    } 
    const tokenOptions = {
        abi: UTILS.tokenAbi,
        contractAddress: UTILS.tokenAddress,
    } 
    const airdropStatus= async ()=>{
        await Moralis.enableWeb3();
        var status = await Moralis.executeFunction({
            functionName:'paused',
            ...airdropOptions
        })
        return status
    }
    const switchAirdropStatus = async (curstatus)=>{
        let status= false;
        try {
            await Moralis.executeFunction({
                functionName:(curstatus)?'unpauseAirdrop':'pauseAirdrop',
                ...airdropOptions
            }) 
            status = true 
        } catch (error) {
            console.log(error['data']['message'])
            status = false
        }
        
        return status
    }
    const returnAirDropFunds= async ()=>{
        let status= false;
        try {
            await Moralis.executeFunction({
                functionName:'returnAirdropBalToken',
                ...airdropOptions
            }) 
            status = true 
        } catch (error) {
            console.log(error['data']['message'])
            status = false
        }
        
        return status
    }
    const approveAirDrop= async (month)=>{
        let status= false;
        try {
            await Moralis.executeFunction({
                functionName:'approveAirdrop',
                params:{
                    _vestingMonth:month
                },
                ...airdropOptions
            }) 
            status = true 
        } catch (error) {
            console.log(error['data']['message'])
            status = false
        }
        
        return status
    }
    const releaseVested= async (month)=>{
        let status= false;
        try {
            await Moralis.executeFunction({
                functionName:'releaseVestedToken',
                params:{
                    _unlockSchedule:month
                },
                ...saleOptions
            })  
            status = true 
        } catch (error) {
            console.log(error)
            status = false 
        }
        
        return status
    }
    const setVestingPeriods= async (schedule,month,amount)=>{
        let status= false;
        try {
            await Moralis.executeFunction({
                functionName:'setVestingPeriod',
                params:{
                    _unlockSchedule:schedule,
                    _releaseAmount:amount,
                    _vestingMonths:month
                },
                ...saleOptions
            })  
            status = true 
        } catch (error) {
            console.log(error)
            status = false 
        }
        
        return status
    }
    const privateSaleStatus= async ()=>{
        await Moralis.enableWeb3();
        var status = await Moralis.executeFunction({
            functionName:'paused',
            ...saleOptions
        })
        return status
    }
    const switchPrivateSaleStatus = async (curstatus)=>{
        let status= false;
        try {
            await Moralis.executeFunction({
                functionName:(curstatus)?'unpauseFirstPrivateSales':'pauseFirstPrivateSales',
                ...saleOptions
            }) 
            status = true 
        } catch (error) {
            console.log(error)
            console.log(error['data']['message'])
            status = false
        }
        
        return status
    }
    const returnUnsoldFunds= async ()=>{
        let status= false;
        try {
            await Moralis.executeFunction({
                functionName:'returnUnsoldToken',
                ...saleOptions
            }) 
            status = true 
        } catch (error) {
            console.log(error['data']['message'])
            status = false
        }
        
        return status
    }
    const showVestingPeriod= async (input)=>{
        let status= false;
        try {
           let res =  await Moralis.executeFunction({
                functionName:'vestingPeriod',
                params:{
                    "":input
                },
                ...saleOptions
            }) 
            return res
        } catch (error) {
            console.log(error)
            status = false
        }
        
        return status
    }
    const getTokenHolder= async (address,input)=>{
        let status= false;
        try {
           let res =  await Moralis.executeFunction({
                functionName:'tokenHolders',
                params:{
                    "":address,
                    "":input
                },
                ...tokenOptions
            }) 
            return res
        } catch (error) {
            console.log(error)
            status = false
        }
        
        return status
    }

     
    
    return (
        <AdminContext.Provider value={{user,airdropStatus,switchAirdropStatus,returnAirDropFunds,
        approveAirDrop,releaseVested,setVestingPeriods,privateSaleStatus,switchPrivateSaleStatus,returnUnsoldFunds,showVestingPeriod,getTokenHolder}}>
            {children}
        </AdminContext.Provider>
    )
}
export default AdminContext