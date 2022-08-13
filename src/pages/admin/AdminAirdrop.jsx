import { success } from 'daisyui/src/colors'
import React, { useContext, useEffect, useRef, useState } from 'react' 
import Notice from '../../components/Notice'
import AdminContext from '../../contexts/admin'

function AdminAirdrop() {
    const [adStatus, setAdStatus]= useState(false)
    const [result, setResult]= useState('null')
    const [resultMessage, setResultMessage]= useState('')
    const {airdropStatus,switchAirdropStatus,returnAirDropFunds,approveAirDrop} = useContext(AdminContext)
    const vestingMonthRef = useRef(null)
    useEffect(()=>{
        airdropStatus().then((value)=>{ 
            setAdStatus(value)
        })
    },[])
    const changeStatus= async (status)=>{
        var results = await switchAirdropStatus(status)
        setResult('airDStatus')
        if(results){
        setResultMessage('status changed successfully')}else{
            setResultMessage('unable to update status. try again')
        }
    }
    const returnFunds= async ()=>{
        var results = await returnAirDropFunds()
        setResult('funds')
        if(results){
        setResultMessage('funds moved successfully')}else{
            setResultMessage('unable to move funds. try again')
        }
    }
    const callApproveAirDrop = async ()=>{
        const form = vestingMonthRef.current 
        const month = form['vestingMonths'].value 
        if(month > 0){
            console.log(month)
            var results = await approveAirDrop(month)
            setResult('approve')
            if(results){
            setResultMessage('Vesting month set successfully')}else{
                setResultMessage('unable to set vesting month. try again')
            }
        }
    }
  return (
    <div className='flex flex-col md:flex-row gap-20'>
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl"> 
                <div className="card-body">
                    <h2 className="card-title">Approve</h2> 
                    { (result === 'approve')&&
                        <Notice type={'info'} message={resultMessage}/>
                    }
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Enter Months</span> 
                        </label>
                        <form ref={vestingMonthRef}>
                            <input name={'vestingMonths'} type="text" placeholder="_vestingMonths" className="input input-accent input-bordered w-full max-w-xs" />  
                        </form>
                        
                    </div>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={callApproveAirDrop}>Approve</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            
            <div className="card card-compact w-96 bg-base-100 shadow-xl"> 
                <div className="card-body">
                    <h2 className="card-title">Pause & Unpause</h2> 
                    { (result === 'airDStatus')&&
                        <Notice type={'info'} message={resultMessage}/>
                    }
                    <div className="card-actions justify-end">
                    {(adStatus)?
                        <button className="btn btn-primary" onClick={()=>changeStatus(adStatus)}>Un-Pause</button>
                    :   <button className="btn btn-warning" onClick={()=>changeStatus(adStatus)}>Pause</button>}

                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl"> 
                <div className="card-body">
                    <h2 className="card-title">Return Airdrop</h2> 
                    { (result === 'funds')&&
                        <Notice type={'info'} message={resultMessage}/>
                    }
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={()=>returnFunds()}>Return</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default AdminAirdrop