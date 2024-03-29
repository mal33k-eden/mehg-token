import React, { useState,useEffect,useContext} from 'react'  
import { Badge, Button,  } from 'react-daisyui'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'
import Notice from '../components/Notice' 
import elite_3 from "../assets/1649674832304.png"
import SaleContext from '../contexts/seed_sales'
import UserContext from '../contexts/user'
import UTILS from '../utils'

function SeedSale() {
  const {approveAllowance,checkAllowance,buyMEHG} = useContext(SaleContext) 
  const {disconnect,connect,formatAddress} = useContext(UserContext) 
  const {isAuthenticated, Moralis} = useMoralis()
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
        if (allowance < minInv || allowance > maxInv) {
          setIsAmountValid(true)
        }
      })
    }
  },[allowance, isAmountValid,isAuthenticated])
  const  makeInvestment= async ()=>{
    'Import MEHG wallet, Click here to copy contract address '
   var res = await  buyMEHG(allowance)
   if (res.success){
    toast.success("Buy order placed successful. Add MEHG contract address to see tokens")
    setAllowance(0)
   }else{
    setTrx(res.message)
   }
   setNotify(true)
  }
  const approveInvestment = async ()=>{
     await approveAllowance(investment)
     checkAllowance().then((value)=>{ 
      setAllowance(value)
      if (allowance < minInv || allowance > maxInv) {
        setIsAmountValid(true)
      }
    })
  }

  const handlePriceChange = (event)=>{
    var val = event.target.value
    setInvestment(val)
    var tv = (val / 0.04).toFixed(1)
    setTokenValue(tv)
    if (allowance < minInv || allowance > maxInv) {
      if(val < minInv || val >maxInv ){
        setIsAmountValid(false)
      }else{
        setIsAmountValid(true)
      } 
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
            <p>- Total Supply - 4,500,000 MEHG</p>
            <p>- 70% Liquidity lock: Full liquidity Lock Period 999 years.</p>
            <div className="divider"></div> 
            <div className='flex flex-col md:flex-row gap-2'>
              <img src={elite_3} alt="meta-elite-1" className='border-2 border-primary rounded-full w-[300px] hover:animate-bounce object-fill' />
              <div className="stats stats-vertical sm:stats-horizontal shadow w-full">
                <div className="stat"> 
                    <div className="stat-title">Price</div>
                    <div className="stat-value">1 MEHG = $0.04</div>
                    <div className="flex flex-col gap-3 m-3">
                    <Badge color="success p-4 ">Min Purchase: 50,000.00 MEHG = $2,000.00</Badge>
                    <Badge color="success p-4  ">Max Purchase: 125,000 MEHG = $5,000</Badge> 
                    </div> 
                    
                    </div>  
                </div>
            </div>
            
            

        </div>
        {/* actions */}
        <div className='md:w-1/2 md:p-10'>
            <Notice  type="info" message={`Click to copy MEHG token contract  : ${formatAddress(UTILS.tokenAddress)}`}  clickFunc={()=>copyAddressToClip()}/>
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
              <h4 className=' text-3xl font-black'> {(allowance / 0.04).toFixed(1)} MEHG</h4>
            }
              
            </div>
            
            <div className='flex items-center justify-center'>
                {
                  (allowance >= minInv) ? 
                  <Button color='success' onClick={makeInvestment}>Buy MEHG For ${allowance}</Button> :
                  <Button className="btn btn-primary" onClick={approveInvestment} disabled={!isAmountValid}>Approve Allowance</Button>
                  
                }
            </div>
            </div>
           }
            
        </div>

    </div>
  )
}

export default SeedSale