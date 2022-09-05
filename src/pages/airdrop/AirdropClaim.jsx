import React,{ useContext, useState,useEffect} from 'react' 
import { Button, RadialProgress } from 'react-daisyui'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import Notice from '../../components/Notice'
import AirdropContext from '../../contexts/airdrop'
import PropTypes from "prop-types"
import UTILS from '../../utils'

function AirdropClaim({connectedUser}) {
    const {isAuthenticated, user,Moralis} = useMoralis()
    const { runContractFunction, error } =useWeb3Contract(); 
    const [errMsg, setErrMsg] = useState('')
    const [buttonAction, setButtonAction] = useState('CLAIM MEHG TOKEN') 
    const {getReferredAddresses} = useContext(AirdropContext)
    const [invites, setInvites]= useState(0)
    const [bigTotal, setBigTotal]= useState(0)
    useEffect(()=>{
        if (isAuthenticated) {
            getReferredAddresses().then((value)=>{
                setInvites(value[0])
                setBigTotal(value[1])
            })
        } 
    },[isAuthenticated,invites])

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
    <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title text-primary">Claim Airdrop</h2>
            <div className='text-center'>
                <div className=' mb-20'>
                    {(invites <=10) && <h4 className='my-5 font-bold text-lg text-primary'>Position: Mega 1 </h4>}
                    {(invites >10 && invites <=50) && <h4 className='my-5 text-primary'>Position: Mega 2 </h4>}
                    {(invites >50 ) && <h4 className='my-5 text-primary'>Position: Mega 3</h4>}
                </div>
                <RadialProgress value={((invites/bigTotal)*100).toFixed(0)} size="10rem" thickness='0.4rem' >{((invites/bigTotal)*100).toFixed(0)}%</RadialProgress>
                <h4 className='my-5'>{invites} Referral(s)</h4>
            </div>
            {
                (errMsg !== '') && <Notice type={'error'} message={errMsg}/>
            }
            <div className='flex items-center justify-center'>
                <Button color='success' onClick={claimToken} disabled={(invites<2)?true:false}>{buttonAction}</Button>
            </div>
        </div>
    </div>
    
    // <div className=' md:p-10'>
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