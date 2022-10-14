import React, { useState,useEffect,useContext} from 'react'  
import { Badge, Button,  } from 'react-daisyui'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'
import Notice from '../components/Notice' 
import SaleContext from '../contexts/private_sales_1'
import elite_1 from "../assets/1649668915457.png"
import UserContext from '../contexts/user'
import UTILS from '../utils'
import AfterAllowance from '../components/AfterAllowance'

function PrivateSaleA() {
  const {approveAllowance,checkAllowance,buyMEHG,cancelAllowance} = useContext(SaleContext) 
  const {disconnect,connect,formatAddress} = useContext(UserContext) 
  const {isAuthenticated, Moralis,user} = useMoralis()
  const [investment, setInvestment] = useState(0)
  const [trx, setTrx] = useState("")
  const [notify, setNotify] = useState(false)
  const [allowance, setAllowance] = useState(0)
  const [tokenValue, setTokenValue] = useState(0)
  const [isAmountValid, setIsAmountValid] = useState(false)
  const minInv = 10
  const maxInv = 1500
   
  useEffect(()=>{
   
    if (isAuthenticated) { 
      checkAllowance().then((value)=>{ 
        setAllowance(value) 
        validateAllowance(allowance)
        
      })
    }
    console.log(isAmountValid)
  },[])
  const  makeInvestment= async ()=>{
    'Import MEHG wallet, Click here to copy contract address '
   var res = await  buyMEHG(allowance)
   console.log(res)
   if (res.success){
    toast.success("Buy order placed successful. Add MEHG contract address to see tokens")
    setAllowance(0)
   }else{
    toast.error(res.message)
    setTrx(res.message)
   }
   setNotify(true)
  }
  const approveInvestment = async ()=>{
    console.log(investment)
    var res =  await approveAllowance(investment) 

    if(res){ 
      await checkAllowance()
      
      if (investment >= minInv || investment <= maxInv) {
        setAllowance(investment) 
        setIsAmountValid(true) 
        toast.success("Allowance Created")
      }else{
        toast.error("Error creating allowance")
      }
    }
  }

  const validateAllowance = (value)=>{
    if(value < minInv || value >maxInv ){ 
      setIsAmountValid(false)
    }else{
      setIsAmountValid(true)
    }
  }
  const handlePriceChange = (event)=>{
    var val = event.target.value 
    setInvestment(val)
    var tv = (val / 0.06).toFixed(1)
    setTokenValue(tv)
    validateAllowance(val) 
  }

  const makeCancel = async ()=>{
    let res = await cancelAllowance()
    if(res){
      toast.success("Allowance cancelled successfully")
      setAllowance(0)
    }else{
      toast.error("Error ocurred while cancelling allowance")
    }
  }
  
  const copyAddressToClip = ()=>{
    navigator.clipboard.writeText(UTILS.tokenAddress)
    toast.info('MEHG TOKEN contract copied to clipboard')
  }
  return (
    <div className='flex flex-col md:flex-row '>
        {/* details */}
        <div className='md:w-1/2 my-10'>
            <h3 className='text-2xl'>MEHG TOKEN SALE</h3>
            <h2 className='text-2xl md:text-3xl mb-3'>Private Sale Round 1</h2>
            <div className="divider"></div> 
            <p>- Total Supply - 3,000,000 MEHG</p>
            <p>- 70% Liquidity lock: Full liquidity Lock Period 999 years.</p>
             
            <div className="divider"></div> 
            <div className='flex flex-col md:flex-row gap-2'>
              <img src={elite_1} alt="meta-elite-1" className='border-2 border-primary rounded-full w-[300px] hover:animate-bounce object-fill' />
              <div className="stats stats-vertical sm:stats-horizontal shadow w-full">
                <div className="stat"> 
                    <div className="stat-title">Price</div>
                    <div className="stat-value">1 MEHG = $0.06</div>
                    <div className="flex flex-col gap-3 m-3">
                    <Badge color="success p-4 ">Min Purchase: 833.30 MEHG = $50.00</Badge>
                    <Badge color="success p-4  ">Max Purchase: 25,000 MEHG = $1,500</Badge> 
                    </div> 
                    
                </div>  
            </div>
            </div>
            
            

        </div>
        {/* actions */}
        <div className='md:w-1/2 md:p-10'>
            <Notice  type="info" message={`Click to copy MEHG token contract \n\n : ${formatAddress(UTILS.tokenAddress)}`}  clickFunc={()=>copyAddressToClip()}/>
            <Notice  type="warning" message="All purchases will be made using BUSD BEP 20"/>
            <Notice type={"error"} message="Use a new wallet address, don’t use any wallet used in MEHG Airdrop, Seed Sales or Previous Privates Sales"/>
            {
              !isAuthenticated ?  <Notice type="info" message="Connect your wallet to purchase MEHG" />: ""
            }
            {
              notify ?  <Notice type="success" message={trx} />: ""
            }
           
           {
            isAuthenticated && 
            <div>
              <div className='my-5 flex items-center justify-center'>  
            { 
            
            (allowance < minInv) ?
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Enter amount in BUSD you will like to buy</span> 
                </label>
                  <input  name='investment' onChange={handlePriceChange} type="text" placeholder="e.g 200" className="input input-accent input-bordered w-full max-w-xs" /> 
                  <label className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt">= {tokenValue} MEHG</span>  </label>
              </div> :
              <h4 className=' text-3xl font-black'> {(allowance / 0.06).toFixed(1)} MEHG</h4>
            }
              
            </div>
            
            <div className='flex items-center justify-center'>
                {
                  (allowance >= minInv) ? 
                  <AfterAllowance allowance={allowance} investFunc={makeInvestment} cancelAllowance={makeCancel}/> :
                  <Button className="btn btn-primary" onClick={approveInvestment} disabled={!isAmountValid}>Approve Allowance</Button>
                  
                }
            </div>
            </div>
           }
            
        </div>

    </div>
  )
}

export default PrivateSaleA