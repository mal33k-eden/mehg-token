import React from 'react'
import { Badge, Button, RadialProgress } from 'react-daisyui'
import Notice from '../components/Notice' 

function PrivateSaleA() {
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
            <Notice type="info" message="Connect your wallet to purchase MEHG" />

            <div className='my-5 flex items-center justify-center'>  
              <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter amount in BUSD you will like to buy</span> 
              </label>
                <input type="text" placeholder="e.g 200" className="input input-accent input-bordered w-full max-w-xs" /> 
                <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt">= 1000 MEHG</span>  </label>
              </div>
            </div>
            <div className='flex items-center justify-center'>
                <Button color='success'>Buy MEHG</Button>
            </div>
        </div>

    </div>
  )
}

export default PrivateSaleA