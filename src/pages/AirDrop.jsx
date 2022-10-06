import React, {  useContext, useEffect, useState } from 'react' 
import { useMoralis } from 'react-moralis'
import {  useParams } from 'react-router-dom'
import Notice from '../components/Notice'  
import AirdropContext from '../contexts/airdrop' 
import AirdropClaim from './airdrop/AirdropClaim'
import AirdropStats from './airdrop/AirdropStats'
import ConfirmEntry from './airdrop/ConfirmEntry'
import elite_1 from "../assets/1649668915457.png"
import elite_2 from "../assets/1649664417576.png"
import elite_3 from "../assets/1649674832304.png"

function AirDrop() {
    const {addressExist,getReferredAddresses} = useContext(AirdropContext)
    const {referredBy='0x0000000000000000000000000000000000000000'} = useParams() 
    const {isAuthenticated,Moralis,user,enableWeb3} = useMoralis() 
    const [connectedUser, setConnectedUser] = useState(null)
    const [isRegistered, setIsRegistered] = useState(false)
    const [invites, setInvites]= useState(0)
    const [bigTotal, setBigTotal]= useState(2)
    //TODO- check if user is authenticated
    //TODO- check to see if user has created a referral link
    //TODO- get number of referrals from blockchain

    
    useEffect(()=>{ 
        enableWeb3().then(()=>{
            if (Moralis.isWeb3Enabled && isAuthenticated) {
                 
                setConnectedUser(user.get('ethAddress'))
                addressExist(user.get('ethAddress')).then((value)=>{ 
                    console.log(value)
                    setIsRegistered(value)
                }) 
            } 

            if (isAuthenticated) {
                getReferredAddresses().then((value)=>{
                    console.log(value)
                    setInvites(value)
                    if (invites <=2) {
                        setBigTotal(2)
                    }
                    if (invites > 10 && invites <=50) {
                        setBigTotal(50)
                    }
                    if (invites > 50) {
                        setBigTotal(100)
                    }  
                 })
            }
        })
        
       
        
    },[isAuthenticated,user,isRegistered])

    
     const checkRegistered = ()=>{
        addressExist(connectedUser).then((value)=>{
            console.log(value)
            setIsRegistered(value)
        })
     }
   

     
  return (
    <div className='flex flex-col font-bankGothic'>
        {/* details */}
        <div className='mb-20'>
            <h3 className='text-4xl font-black mb-3 text-primary'>MEHG TOKEN</h3>
            <h2 className='text-3xl text-primary'>Airdrop Program</h2>
            <p className='text-white'>
            Meta Elite Hunger Games P2E Airdrop Program is designed to empower 
            thousands of prospective MEHG gamers from around the globe, 
            With a Robust Liquidity of 70% and 999 Years Extreme Liquidity 
            Lock gives the project the MiDAS Touch for a promising future.
            </p>
            <p className='text-white'>Earn upto $3,000 completing Position MEGA 1 to 3.</p>
            <div className="divider"></div> 
            <div className="stats stats-vertical sm:stats-horizontal shadow w-full">
                <div className="stat text-primary cursor-pointer"> 
                    <div className='flex justify-start items-start'>
                        <img src={elite_1} alt="meta-elite-1" className='w-[300px] hover:animate-bounce' />
                    </div>
                    <div className="stat-title font-bold">Mega 1</div>
                    <div className="stat-value ">250 MEHG</div>
                    <div className="stat-desc">Referee 10 Members </div>
                </div>
                
                <div className="stat text-primary cursor-pointer">
                    <div className='flex justify-start items-start'>
                        <img src={elite_2} alt="meta-elite-1" className='w-[300px] hover:animate-bounce ' />
                    </div>
                    <div className="stat-title">Mega 2</div>
                    <div className="stat-value">12,500 MEHG</div>
                    <div className="stat-desc">Referee 50 Members</div>
                </div>
                
                <div className="stat text-primary cursor-pointer">
                    <div className='flex justify-start items-start'>
                        <img src={elite_3} alt="meta-elite-1" className='w-[300px] hover:animate-bounce ' />
                    </div>
                    <div className="stat-title">Mega 3</div>
                    <div className="stat-value">25,000 MEHG</div>
                    <div className="stat-desc">Referee 100 Members</div>
                </div>
                
            </div>

        </div>

        {
            isAuthenticated ?
            <div className='flex flex-col w-full '>
            {
                (isRegistered)?
                <div className='grid grid-cols-1 md:grid-cols-2 md:justify-items-center'>
                    <AirdropStats connectedAddress={connectedUser} invites={invites}/>
                    <AirdropClaim invites={invites} bigTotal={bigTotal}/>
                </div>
               
                :<ConfirmEntry referredBy={referredBy} connectedUser={connectedUser} checkRegistered={checkRegistered}/>
            }
        </div>
        :
        <Notice type={'info'} message="Kindly connect your wallet to start using the airdrop portal"/>
        }
        
    </div>
  )
}

export default AirDrop