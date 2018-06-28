import React from 'react';
import styled from 'styled-components';
import { ParentSize } from '@vx/responsive';

const Terminal = styled.pre`
  color: white;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.5em;
  height: auto;
  min-height: 400px;
  background: #22282A;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

const OutputContainer = (props) => (
  <ParentSize>
    {size =>
      size.ref && (
        <Terminal>
          {props.children}
        </Terminal>
      )
    }
  </ParentSize>
);

export default OutputContainer;
