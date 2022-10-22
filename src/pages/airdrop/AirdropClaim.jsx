import React,{ useContext, useState,useEffect} from 'react' 
import { Button, RadialProgress } from 'react-daisyui'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { usePapaParse } from 'react-papaparse';
import Notice from '../../components/Notice'
import AirdropContext from '../../contexts/airdrop'
import PropTypes from "prop-types"
import UTILS from '../../utils'
import { toast } from 'react-toastify'

function AirdropClaim({ invites, bigTotal}) { 
    const { readRemoteFile } = usePapaParse();
    const {isAuthenticated, user,Moralis} = useMoralis()
    const { runContractFunction, error } =useWeb3Contract(); 
    const [errMsg, setErrMsg] = useState('')
    const [buttonAction, setButtonAction] = useState('CLAIM 250 MEHG TOKENS') 
    const {getReferredAddresses} = useContext(AirdropContext)
    const [percent, setPercent] =  useState(0)
    const [taskCompleted, setTaskCompleted] = useState(false)
    
     
    
   useEffect(()=>{
        let value = ((invites/bigTotal)*100).toFixed(0)
        value !== 100 ? setPercent(value):setPercent(100)
        getAirdropFile(user.get('ethAddress'))
   },[invites,bigTotal])

   const getAirdropFile =async  (userAddress)=>{ 
    console.log(userAddress)
    readRemoteFile('http://mheg.gazelleweb-tech.com/mehg_airdrop.csv', {
        header: true,
        worker: true,
        complete: (results) => {
            let data = results.data
            var profile = data.filter((item)=>item['Wallet'].toLowerCase()==userAddress.toLowerCase())
            if(profile.length > 0){ 
                if (profile[0]['Status'] == 'Completed') {
                    setTaskCompleted(true)
                }else{
                    setTaskCompleted(false)
                }
            }else{
                setTaskCompleted(false)
            }
            
        },
    });
}
    const claimToken = async ()=>{ 
        if (taskCompleted) {
            if (bigTotal > UTILS.stage_1) {
                setButtonAction('Pending')
            }else{ 
               
                if (Moralis.isWeb3Enabled() && isAuthenticated) { 
                    try {
                        var options = {
                            abi: UTILS.tokenAbi,
                            contractAddress: UTILS.tokenAddress,
                            functionName: "transferFrom",
                            params: {from:UTILS.airdropAddress,to:user.get('ethAddress'), amount: Moralis.Units.ETH(250)},
                         } 
                         var r = await runContractFunction({params: options})
                          
                         if (r !== undefined) {
                            var res = await r.wait(2)
                            toast.success('You have claimed successfully.')
                         }
                         if (error != null) {
                            setErrMsg(error['data']['message'])
                            toast.error(error['data']['message'])
                         }
                    } catch (error) {
                        console.log(error.data)
                    }
                } 
            }
        }else{
            toast.error('You have not completed the required task. Please speak to our admins for directions.')
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
                <RadialProgress className="text-success"  color='success' value={percent} size="10rem" thickness='0.4rem' >{percent}%</RadialProgress>
                <h4 className='my-5'>{invites} Referral(s)</h4>
            </div>
            {
                (errMsg !== '') && <Notice type={'error'} message={errMsg}/>
            }
            <div className='flex items-center justify-center'>
                <Button color='success' onClick={claimToken}  >{buttonAction}</Button>
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