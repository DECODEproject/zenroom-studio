// @flow
import React from 'react'
import { ParentSize } from '@vx/responsive'
import Tree from './Tree'
import data from './ExampleData'

const ZencodePlot = () => (
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
          <Tree
            data={data}
            width={size.width * 0.9}
            height={size.height * 0.9}
          />
        </div>
      )
    }
  </ParentSize>
)

export default ZencodePlot