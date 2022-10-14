import React from 'react'

function Notice({type, message, clickFunc}) {
    let info = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 h-3 w-3 md:h-6 md:w-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    let warning = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-3 w-3 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    let success = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-3 w-3 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    let error = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-3 w-3 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  return (
    <div className={`alert alert-${type} shadow-lg my-3 ${clickFunc != undefined && 'cursor-pointer' }`}  onClick={()=>clickFunc()} >

        <div className='flex justify-around justify-items-center '>
            {
                (function(){
                    if(type =='info') { return info}
                    if(type =='warning') { return warning}
                    if(type =='success') { return success}
                    if(type =='error') { return error}
                     
                })()
            }
           <span className='text-lg'>{message}</span>
        </div>
    </div>
  )
}

export default Notice