// @flow
import React from 'react';
import styled from 'styled-components';
import { ParentSize } from '@vx/responsive';
// import PropTypes from 'prop-types';

const Terminal = styled.pre`
  color: white;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.5em;
  height: auto;
  min-height: 200px;
  background: #22282a;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
`;

type Props = {
  children?: React.Node
};

// export default class Home extends Component<Props> {


const OutputContainer = (props: Props) => (
  <ParentSize>
    {size => size.ref && <Terminal>{props.children}</Terminal>}
  </ParentSize>
);

export default OutputContainer;
