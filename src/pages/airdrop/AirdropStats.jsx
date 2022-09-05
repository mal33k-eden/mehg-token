import React, { useState,useContext,useEffect } from 'react' 
import PropTypes from "prop-types"
import AirdropContext from '../../contexts/airdrop' 
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'

function AirdropStats({connectedAddress, invites}) {
    const {user,isAuthenticated} = useMoralis()
    const {getAirdropDetails, getReferredAddresses} = useContext(AirdropContext)
    const [airdropDetails, setAirdropDetails] = useState({address:null, invitedBy:null})  
    useEffect(()=>{
       
        getAirdropDetails(connectedAddress).then((value)=>{
           if (value != undefined) {
            setAirdropDetails(value)
           }
            
        }) 
    },[connectedAddress,airdropDetails])

    const copyReferralLink = ()=>{
        var copyText = document.getElementById("referralLink");
        navigator.clipboard.writeText(copyText.innerHTML);
        toast.info('Referral link copied to clipboard.') 
    }
  return (
    <div className='flex flex-col gap-5 mb-10 '>
        <div className="card card-compact  bg-base-100 shadow-xl">
            <div className="card-body stat">
                <h2 className="stat-title text-primary">Total Referrals</h2>
                <h2 className=' text-2xl font-black'>{invites}</h2>
                <div className="card-actions justify-end">
                    </div>
            </div>
        </div>
        {
        (airdropDetails.invitedBy)  &&
        <div className="card card-compact  bg-base-100 shadow-xl">
            <div className="card-body stat">
                <h2 className="stat-title text-primary">Invited By</h2>
                <p>{airdropDetails.invitedBy}</p>
                <div className="card-actions justify-end">
                <div className="badge badge-accent cursor-pointer">Confirmed</div>
                </div>
            </div>
        </div>
        }
        <div className="card card-compact  bg-base-100 shadow-xl">
            <div className="card-body stat">
                <h2 className="stat-title text-primary">Task Link</h2>
                <p>www.gleam.io/mehg-link</p>
                <div className="card-actions justify-end">
                <div className="badge badge-accent cursor-pointer">Click To Begin Task</div>
                </div>
            </div>
        </div>
        <div className="card card-compact  bg-base-100 shadow-xl">
            <div className="card-body stat">
                <h2 className="stat-title text-primary">Invite Link</h2>
                <p id='referralLink'>Hello, i am inviting your to the MEHG token airdrop campaign. 
                    Follow this link to redeem free MEHG TOKENS : 
                    https://mehg.netlify.app/airdrop/referral/{user.get('ethAddress')}</p>
                <div className="card-actions justify-end">
                <div className="badge badge-accent cursor-pointer"
                onClick={copyReferralLink}>Click To Copy Referral Link</div>
                </div>
            </div>
        </div>
    </div>
  )
}

AirdropStats.propTypes={
    connectedAddress:PropTypes.string
}
export default AirdropStats