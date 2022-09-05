import React,{ useContext, useState,useEffect} from 'react' 
import { Button, RadialProgress } from 'react-daisyui'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import Notice from '../../components/Notice'
import AirdropContext from '../../contexts/airdrop'
import PropTypes from "prop-types"
import UTILS from '../../utils'
import { toast } from 'react-toastify'

function AirdropClaim({connectedUser, invites, bigTotal}) {
    const {isAuthenticated, user,Moralis} = useMoralis()
    const { runContractFunction, error } =useWeb3Contract(); 
    const [errMsg, setErrMsg] = useState('')
    const [buttonAction, setButtonAction] = useState('CLAIM 250 MEHG TOKENS') 
    const {getReferredAddresses} = useContext(AirdropContext)
    const [percent, setPercent] =  useState(0)
     
    
   useEffect(()=>{
        let value = ((invites/bigTotal)*100).toFixed(0)
        value !== 100 ? setPercent(value):setPercent(100)
   },[invites,bigTotal])

    const claimToken = async ()=>{ 
        if (bigTotal > UTILS.stage_1) {
            setButtonAction('Pending')
        }else{ 
           
            if (Moralis.isWeb3Enabled() && isAuthenticated) { 
                try {
                    var options = {
                        abi: UTILS.tokenAbi,
                        contractAddress: UTILS.tokenAddress,
                        functionName: "transferFrom",
                        params: {from:UTILS.tokenAddress,to:user.get('ethAddress'), amount: Moralis.Units.ETH(250)},
                     } 
                     var r = await runContractFunction({params: options})
                      
                     if (r !== undefined) {
                        var res = await r.wait(2)
                        console.log(res)
                     }
                     if (error != null) {
                        setErrMsg(error['data']['message'])
                        toast.error(error['data']['message'])
                     }
                } catch (error) {
                    console.log(error)
                }
            } 
        }
    }
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title text-primary">Claim Airdrop</h2>
            <div className='text-center'>
                <div className=' mb-20'>
                    {(invites <=UTILS.stage_1) && <h4 className='my-5 font-bold text-lg text-primary'>Position: Mega 1 </h4>}
                    {(invites >UTILS.stage_1 && invites <=UTILS.stage_2) && <h4 className='my-5 text-primary'>Position: Mega 2 </h4>}
                    {(invites >UTILS.stage_2 ) && <h4 className='my-5 text-primary'>Position: Mega 3</h4>}
                </div>
                <RadialProgress color='warning' value={percent} size="10rem" thickness='0.4rem' >{percent}%</RadialProgress>
                <h4 className='my-5'>{invites} Referral(s)</h4>
            </div>
            {
                (errMsg !== '') && <Notice type={'error'} message={errMsg}/>
            }
            <div className='flex items-center justify-center'>
                <Button color='success' onClick={claimToken} >{buttonAction}</Button>
            </div>
        </div>
    </div>
    
    // <div className=' md:p-10'>
    //disabled={(invites<UTILS.stage_1)?true:false}
    //     <div>
    //         <div className='my-5 flex items-center justify-center'>  
                
    //         </div>
            
    //     </div>
              
    // </div>
  )
}

AirdropClaim.propTypes = {
    connectedUser: PropTypes.string
}
export default AirdropClaim