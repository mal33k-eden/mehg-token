import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Badge, Button, RadialProgress } from 'react-daisyui'
import { MoralisContext } from 'react-moralis'
import Notice from '../components/Notice' 
import SaleContext from '../contexts/sales'

function PrivateSaleA() {
  const {approveAllowance,checkAllowance,buyMEHG} = useContext(SaleContext)
  const {isAuthenticated} = useContext(MoralisContext)
  const [investment, setInvestment] = useState(0)
  const [trx, setTrx] = useState(false)
  const [allowance, setAllowance] = useState(0)
  const [tokenValue, setTokenValue] = useState(0)
  const [isAmountValid, setIsAmountValid] = useState(false)
  const minInv = 10
  const maxInv = 1500
  useEffect(()=>{
    console.log(allowance)
    checkAllowance().then((value)=>{
      setAllowance(value)
      if (allowance < minInv || allowance > maxInv) {
        setIsAmountValid(true)
      }
    })
    
  },[allowance, isAmountValid])
  const  makeInvestment= async ()=>{
     
   var res = await  buyMEHG(allowance)
    setTrx(true)
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
    var tv = (val / 0.06).toFixed(1)
    setTokenValue(tv)
    if (allowance < minInv || allowance > maxInv) {
      if(val < minInv || val >maxInv ){
        setIsAmountValid(false)
      }else{
        setIsAmountValid(true)
      } 
    }
  }
  
  return (
    <div className='flex flex-col md:flex-row '>
        {/* details */}
        <div className='md:w-1/2 my-10'>
            <h3 className='text-2xl'>MEHG TOKEN SALE</h3>
            <h2 className='text-3xl'>Private Sale Round 1</h2>
            <p>Total Supply - 3,000,000 MEHG</p>
            <p>Full Unlocking Period - 5 Months</p>
            <p>TGE - 7%</p>
            <p>Unlocking Schedule - (93%) 1st Month 5%, 2nd 8%, 3rd 10%, 4th 30%, 5th 40%.</p>
            <div className="divider"></div> 
            <div className="stats stats-vertical sm:stats-horizontal shadow w-full">
                <div className="stat"> 
                    <div className="stat-title">Price</div>
                    <div className="stat-value">1 MEHG = $0.06</div>
                    <div className=" ">
                    <Badge color="success">Min Purchase: 833.30 MEHG = $50</Badge>
                    <Badge color="success">Max Purchase: 25,000 MEHG = $1,500</Badge> 
                    </div> 
                    
                </div>  
            </div>
            

        </div>
        {/* actions */}
        <div className='md:w-1/2 md:p-10'>
            <Notice  type="warning" message="All purchases will be made using BUSD BEP 20"/>
            <Notice type={"error"} message="Use a new wallet address, don’t use any wallet used in MEHG Airdrop, Seed Sales or Previous Privates Sales"/>
            {
              !isAuthenticated ?  <Notice type="info" message="Connect your wallet to purchase MEHG" />: ""
            }
             {
              trx ?  <Notice type="success" message="Buy order placed successful" />: ""
            }
           

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
                  (allowance >= 10) ? 
                  <Button color='success' onClick={makeInvestment}>Buy MEHG For ${allowance}</Button> :
                  <Button className="btn btn-primary" onClick={approveInvestment} disabled={!isAmountValid}>Approve Allowance</Button>
                  
                }
            </div>
        </div>

    </div>
  )
}

export default PrivateSaleA