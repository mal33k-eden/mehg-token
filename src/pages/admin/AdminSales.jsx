import React, { useContext, useEffect, useRef, useState } from 'react'
import Notice from '../../components/Notice'
import AdminContext from '../../contexts/admin'

function AdminSales() {
    const releaseVestedForm = useRef(null)
    const setVestingPeriodsForm = useRef(null)
    const [saleStatus,setSaleStatus] = useState()
    const [result, setResult]= useState('null')
    const [resultMessage, setResultMessage]= useState('')
    const {releaseVested,setVestingPeriods,privateSaleStatus,switchPrivateSaleStatus,returnUnsoldFunds,showVestingPeriod} = useContext(AdminContext)

    useEffect(()=>{
        privateSaleStatus().then((value)=>{
            setSaleStatus(value)
        })
    },[])
    const releaseVestedToken= async ()=>{
        const form = releaseVestedForm.current 
        const month = form['unlockSchedule'].value 
        let res = await releaseVested(month);
        setResult('releaseVested')
        if(res){
        setResultMessage('released vested token successfully')}else{
            setResultMessage('unable to release vested token. try again')
        }
    }
    const setVestedToken= async ()=>{
        const form = setVestingPeriodsForm.current 
        const schedule = form['unlockSchedule'].value
        const month = form['vestingMonths'].value
        const amount = form['releaseAmount'].value 
        let res = await setVestingPeriods(schedule,month,amount);
        setResult('setVestingPeriod')
        if(res){
        setResultMessage('vesting period set successfully')}else{
            setResultMessage('unable set vesting token. try again')
        }
    }
    const changeStatus= async (status)=>{
        var results = await switchPrivateSaleStatus(status)
        setResult('saleStatus')
        if(results){
        setResultMessage('status changed successfully')}else{
            setResultMessage('unable to update status. try again')
        }
    }
    const returnFunds= async ()=>{
        var results = await returnUnsoldFunds()
        setResult('funds')
        if(results){
        setResultMessage('funds moved successfully')}else{
            setResultMessage('unable to move funds. try again')
        }
    }
    const getVestingDetails= async ()=>{
        var results = await showVestingPeriod(0)
        // setResult('showVestingPeriods')
        // if(results){
        // setResultMessage('funds moved successfully')}else{
        //     setResultMessage('unable to move funds. try again')
        // }
        console.log(results)
    }
    
    
  return (
    <div className='flex flex-col flex-wrap md:flex-row gap-20'>
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl"> 
                <div className="card-body">
                    <h2 className="card-title">Release Vested</h2> 
                    { (result === 'releaseVested')&&
                        <Notice type={'info'} message={resultMessage}/>
                    }
                    <form ref={releaseVestedForm}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Enter Schedule</span> 
                            </label>
                            <input name={'unlockSchedule'} type="text" placeholder="_unlockSchedule" className="input input-accent input-bordered w-full max-w-xs" />  
                        </div>
                    </form>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={releaseVestedToken}>Release</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl"> 
                <div className="card-body">
                    <h2 className="card-title">Set Vesting Periods</h2> 
                    { (result === 'setVestingPeriod')&&
                        <Notice type={'info'} message={resultMessage}/>
                    }
                    <form ref={setVestingPeriodsForm}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Enter Schedule</span> 
                            </label>
                            <input name={'unlockSchedule'} type="text" placeholder="_unlockSchedule" className="input input-accent input-bordered w-full max-w-xs" />  
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Enter Month</span> 
                            </label>
                            <input name={'vestingMonths'} type="text" placeholder="_vestingMonths" className="input input-accent input-bordered w-full max-w-xs" />  
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Enter Amount</span> 
                            </label>
                            <input name={'releaseAmount'} type="text" placeholder="_releaseAmount" className="input input-accent input-bordered w-full max-w-xs" />  
                        </div>
                    </form>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={setVestedToken}>Set</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl"> 
                <div className="card-body">
                    <h2 className="card-title">Pause & Unpause</h2> 
                    { (result === 'saleStatus')&&
                        <Notice type={'info'} message={resultMessage}/>
                    }
                    <div className="card-actions justify-end">
                    {(saleStatus)?
                        <button className="btn btn-primary">Un-Pause</button>
                    :   <button className="btn btn-warning" onClick={()=>changeStatus(saleStatus)}>Pause</button>}

                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl"> 
                <div className="card-body">
                    <h2 className="card-title">Return Unsold Tokens</h2> 
                    { (result === 'funds')&&
                        <Notice type={'info'} message={resultMessage}/>
                    }
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={returnFunds}>Return</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl"> 
                <div className="card-body">
                    <h2 className="card-title">Show Vesting Period</h2> 
                    { (result === 'saleStatus')&&
                        <Notice type={'info'} message={resultMessage}/>
                    }
                    <h2 className="card-title">Current Vesting Count: 0</h2> 
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Enter Input</span> 
                        </label>
                        <input type="text" placeholder="input" className="input input-accent input-bordered w-full max-w-xs" />  
                    </div>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={getVestingDetails} >Show</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl"> 
                <div className="card-body">
                    <h2 className="card-title">Token Holder</h2>  
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Enter Address</span> 
                        </label>
                        <input type="text" placeholder="address" className="input input-accent input-bordered w-full max-w-xs" />  
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Enter Input</span> 
                        </label>
                        <input type="text" placeholder="Input" className="input input-accent input-bordered w-full max-w-xs" />  
                    </div>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Show</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminSales