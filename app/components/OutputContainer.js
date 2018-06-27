
import React from 'react'
import { ParentSize } from '@vx/responsive'

const OutputContainer = ({data}) => (
    <ParentSize>
      {size =>
        size.ref && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              minHeight: '300px',
              background: '#22282A',
            }}
          >
          {data}
          </div>
        )
      }
    </ParentSize>
  )
  
  export default OutputContainer