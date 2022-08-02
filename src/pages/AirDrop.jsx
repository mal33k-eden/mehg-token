import React from 'react'
import { Button, RadialProgress } from 'react-daisyui'
import Notice from '../components/Notice' 
function AirDrop() {
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
            <Notice type="info" message="Connect your wallet to claim your airdrop tokens" />

            <div className='my-5 flex items-center justify-center'>  
                <div>
                    <h4 className='my-5'>Mega 1 Position</h4>
                    <RadialProgress value={70} size="5rem" thickness='0.8rem' >70%</RadialProgress>
                    <h4 className='my-5'>7 Referrals</h4>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <Button color='success'>Claim MEHG Tokens</Button>
            </div>
        </div>

    </div>
  )
}

export default AirDrop