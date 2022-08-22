import React, {  useEffect, useState } from 'react'
import { Button, RadialProgress } from 'react-daisyui'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import Notice from '../components/Notice'  
import client from '../sanity'
import UTILS from '../utils'
function AirDrop() {
    const {isAuthenticated, user,Moralis} = useMoralis()
    const { runContractFunction, error } =useWeb3Contract();
    const [connectedUser, setConnectedUser] = useState(null)
    const [errMsg, setErrMsg] = useState('')
    const [invites, setInvites] = useState(0)
    const [bigTotal, setBigTotal] = useState(10)
    const [buttonAction, setButtonAction] = useState('CLAIM MEHG TOKEN')

    useEffect(()=>{ 
        console.log(connectedUser)
        if (isAuthenticated) {
            
            setConnectedUser(user.get('ethAddress'))
        } 
        if (connectedUser != null) {
            const query  = `*[_type == "investors" && lower(address) == '${connectedUser}'] {address,invitees}`   
        const params = {address: connectedUser}
        client.fetch(query,params)
        .then(function (data) { 
            if(data.length > 0){
                console.log(connectedUser)
                var y = data[0].invitees
                setInvites(y)
                if (invites <=10) {
                    setBigTotal(10)
                }
                if (invites > 10 && invites <=50) {
                    setBigTotal(50)
                }
                if (invites > 50) {
                    setBigTotal(100)
                }
            }
            
            
        }).catch((error)=>{console.log(error)})
        }
        
        
    },[connectedUser,isAuthenticated,invites])

    const claimToken = async ()=>{
        
        if (bigTotal > 10) {
            setButtonAction('Pending')
        }else{ 
            if (Moralis.isWeb3Enabled() && connectedUser != null) {
                
                var options = {
                    abi: UTILS.tokenAbi,
                    contractAddress: UTILS.tokenAddress,
                    functionName: "transferFrom",
                    params: {from:UTILS.tokenAddress,to:connectedUser, amount: Moralis.Units.ETH(250)},
                 } 
                 var r = await runContractFunction({params: options})
                 console.log(r)
                 if (r !== undefined) {
                    var res = await r.wait(2)
                    console.log(res)
                 }
                 if (error != null) {
                    setErrMsg(error['data']['message'])
                 }
            }else{
                Moralis.enableWeb3()
            }
            
        }
    }
  return (
    <div className='flex flex-col md:flex-row'>
        {/* details */}
        <div className='md:w-1/2'>
            <h3 className='text-2xl'>MEHG TOKEN</h3>
            <h2 className='text-3xl'>Airdrop Program</h2>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
            <div className="divider"></div> 
            <div className="stats stats-vertical sm:stats-horizontal shadow w-full">
                <div className="stat"> 
                    <div className="stat-title">Mega 1</div>
                    <div className="stat-value">250 MEHG</div>
                    <div className="stat-desc">Referee 10 Members </div>
                </div>
                
                <div className="stat">
                    <div className="stat-title">Mega 2</div>
                    <div className="stat-value">12,500 MEHG</div>
                    <div className="stat-desc">Referee 50 Members</div>
                </div>
                
                <div className="stat">
                    <div className="stat-title">Mega 3</div>
                    <div className="stat-value">25,000 MEHG</div>
                    <div className="stat-desc">Referee 100 Members</div>
                </div>
                
            </div>

        </div>
        {/* actions */}
        <div className='md:w-1/2 md:p-10'>

            {
                (!isAuthenticated)? <Notice type="info" message="Connect your wallet to claim your airdrop tokens" />:
           

            <div>
                <div className='my-5 flex items-center justify-center'>  
                <div>
                    {(invites <=10) && <h4 className='my-5'>Mega 1 Position</h4>}
                    {(invites >10 && invites <=50) && <h4 className='my-5'>Mega 2 Position</h4>}
                    {(invites >50 ) && <h4 className='my-5'>Mega 3 Position</h4>}
                    

                    <RadialProgress value={((invites/bigTotal)*100).toFixed(0)} size="5rem" thickness='0.8rem' >{((invites/bigTotal)*100).toFixed(0)}%</RadialProgress>
                    <h4 className='my-5'>{invites} Referrals</h4>
                </div>
            </div>
            {
                (errMsg !== '') && <Notice type={'error'} message={errMsg}/>
            }
            <div className='flex items-center justify-center'>
                
                <Button color='success' onClick={claimToken} disabled={(invites<10)?true:false}>{buttonAction}</Button>
            </div>
            </div>
             }
        </div>

    </div>
  )
}

export default AirDrop