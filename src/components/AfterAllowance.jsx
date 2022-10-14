import React from 'react'
import { Button } from 'react-daisyui'

function AfterAllowance({investFunc, cancelAllowance, allowance}) {
  return (
    <div className='flex flex-col gap-4'>
        <Button color='success' onClick={investFunc}>Buy MEHG For ${allowance}</Button>
        <Button size="xs"   color='ghost' onClick={cancelAllowance}>Cancel ${allowance}</Button>
    </div>
  )
}

export default AfterAllowance