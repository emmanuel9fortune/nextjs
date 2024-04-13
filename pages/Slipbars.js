import React from 'react'

function Slipbars({frnds}) {
  return (
    <div className='trasnactionslip'>
        <p>{frnds[1]?.amount} (SOL)</p>
        <small>{new Date(frnds[1]?.time?.toDate()).toLocaleString()}</small>
    </div>
  )
}

export default Slipbars