import React from 'react'
import { Detector } from 'react-detect-offline'


function Connection(props) {
  return (
    <div>
        <Detector 
            render={({online})=>(
                online ? props.children:
                <div style={{color:'grey'}}>
                    <p>Connecting...</p>
                </div>
            )}
         />
    </div>
  )
}

export default Connection