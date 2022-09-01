import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'
import PropTypes from "prop-types"
import Notice from '../../components/Notice'
import { useContext,useEffect } from 'react'
import AirdropContext from '../../contexts/airdrop' 
import { toast } from 'react-toastify'

function ConfirmEntry({referredBy,connectedUser,checkRegistered}) {
    const {isAuthenticated, user,Moralis,enableWeb3} = useMoralis()
    const {generateLink,whitelistReferredAddress} = useContext(AirdropContext)
    const [isClicked, setIsClicked] = useState(false)
    const registerForAirdrop = async ()=>{
        setIsClicked(true)
        if(referredBy != 'null'){
            //send registeration to airdrop contract 
            let res = await whitelistReferredAddress(referredBy)
            console.log(res)
            if(!res.status) {
                toast.error(res.msg + ' Kindly speak with admin.')
                return false
            }
        }
        const  createLink = await generateLink(connectedUser,referredBy)
        
        if(createLink){
            toast.success('Your airdrop referral and task link created successfully!')
            toast.onChange((payload)=>{
                if(payload.status == 'removed'){
                    // setIsClicked(false)
                    checkRegistered()
                }
            })
            
        }else{
            toast.error('You are not able to generate your referral and task link. Kindly speak with admin.')
            setIsClicked(false)
        }
        
    }
     
  return (
    

    (!isAuthenticated)? <Notice type="info" message="Connect your wallet to have access your airdrop portal." />:
    <div className="card card-compact  w-auto bg-base-100 shadow-xl">
        <div className="card-body stat">
            <h2 className="text-xl mb-2 font-bold pt-3">Welcome To MEHG Airdrop</h2>
            <h4 className='text-lg'>Click the button below to reveal your task link and your special referral link.</h4>
            
            {
                (referredBy != 'null' && referredBy.toLowerCase()  != connectedUser) && 
                <div>
                    <h2 className='font-bold text-xl mt-6'>Referred By</h2>
                    <h3 className='text-lg'>Address: {referredBy}</h3>
                </div>
            }
            {
                (referredBy.toLowerCase()  == connectedUser || referredBy == undefined) ? <Notice type={'warning'} message="You not able to refer yourself. It is not allowed in this Airdrop Program."/>:
                <div className="card-actions justify-end">
                    <button className="btn btn-primary cursor-pointer" onClick={registerForAirdrop} disabled={isClicked}>Generate Task Link</button>
                </div>
            }
            
        </div>
    </div>
  )
}

ConfirmEntry.propTypes = {
    referredBy:PropTypes.string,
    connectedUser:PropTypes.string

}

export default ConfirmEntry