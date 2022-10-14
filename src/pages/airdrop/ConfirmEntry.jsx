import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'
import PropTypes from "prop-types"
import Notice from '../../components/Notice'
import { useContext,useEffect } from 'react'
import AirdropContext from '../../contexts/airdrop' 
import { toast } from 'react-toastify'
import UserContext from '../../contexts/user'

function ConfirmEntry({referredBy,connectedUser,checkRegistered}) {
    const {isAuthenticated, user,Moralis,enableWeb3} = useMoralis()
    const {generateLink,whitelistReferredAddress} = useContext(AirdropContext)
    const {formatAddress} = useContext(UserContext)
    const [isClicked, setIsClicked] = useState(false)
    const [formatedRefferedBy, setFormatedRefferedBy] = useState('')
    const registerForAirdrop = async ()=>{
        setIsClicked(true) 
        let res = await whitelistReferredAddress(referredBy) 
        if(!res.status) {
            toast.error(res.msg + ' Kindly speak with admin.')
            return false
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
    useEffect(()=>{
        let newAdd = formatAddress(referredBy)
        setFormatedRefferedBy(newAdd)
    })
     
  return (
    

    (!isAuthenticated)? <Notice type="info" message="Connect your wallet to have access your airdrop portal." />:
    <div className="card card-compact  w-auto bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="text-xl mb-2 font-bold pt-3 ">Welcome To MEHG Airdrop</h2>
            <h4 className='text-lg '>Click the button below to reveal your task link and your special referral link.</h4>
            
            {
                (referredBy != 'null' && referredBy.toLowerCase()  != connectedUser) && 
                <div className=''>
                    <h2 className='font-bold text-xl mt-6 '>Referred By</h2>
                    <h3 className='md:text-lg'>Address: {formatedRefferedBy}</h3>
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