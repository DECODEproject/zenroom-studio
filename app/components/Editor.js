// @flow
import React, { Component } from 'react';
import styles from './Editor.css';

import Page, { Grid, GridColumn } from '@atlaskit/page';
import Navigation, { Skeleton } from '@atlaskit/navigation';

import Tooltip from '@atlaskit/tooltip';
import Tabs, { TabItem } from '@atlaskit/tabs';

import AceEditor, {split as SplitEditor} from 'react-ace';
import 'brace/mode/lua';
import 'brace/mode/json';
import 'brace/ext/language_tools';
import 'brace/theme/monokai';
import 'brace/theme/dracula';

export const jsonEditorProps = {
  mode: "json",
  height: "300px",
  width: "100vw",
  fontSize: 15,
  theme: "dracula",
  showPrintMargin: false,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
}

const TooltipItem = (props: TabItemComponentProvided) => (
  <Tooltip content={props.data.tooltip}>
    <TabItem {...props} />
  </Tooltip>
);

export default class Editor extends Component<Props> {
  props: Props;

  onCodeChange(__) {
    this.setState({zencode: __})
    this.props.zenroom.ccall('zenroom_exec', 
    'number',
    ['string',
     'string',
     'string',
     'string',
     'number'],
    [this.state.zencode, 
     this.state.zenconfig,
     this.state.zenkeys,
     this.state.zendata, 3])
  }

  onDataChange(__) { this.setState({zendata: __}) }
  onKeysChange(__) { this.setState({zenkeys: __}) }
  onConfigChange(__) { this.setState({zenconfig: __}) }

  constructor(props: Props) {
    super(props)

    this.state = {
      zencode: '',
      zendata: '',
      zenkeys: '',
      zenconfig: '',
    }
    this.onCodeChange = this.onCodeChange.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
    this.onKeysChange = this.onKeysChange.bind(this)
    this.onConfigChange = this.onConfigChange.bind(this)

    this.state.tabs =  [
      {
        label: 'DATA',
        content: <AceEditor {...jsonEditorProps} name='zenroom--data--editor' onChange={this.onDataChange} value={this.state.zendata}/>,
        tooltip: 'DATA in json format',
      },
      {
        label: 'KEYS',
        content: <AceEditor {...jsonEditorProps} name='zenroom--keys--editor' onChange={this.onKeysChange} value={this.state.zenkeys}/>,
        tooltip: 'Your keys',
      },
      {
        label: 'CONFIG',
        content: <AceEditor {...jsonEditorProps} name='zenroom--config--editor' onChange={this.onConfigChange} value={this.state.zenconfig}/>,
        tooltip: 'Your zenroom env config',
      },
    ]
  }


  render() {
    return (
      <Page
        navigation={
          <Navigation>
            <Skeleton/>
          </Navigation>
        }
        >
        <Grid layout="fluid" spacing="compact">
          <GridColumn medium={7} spacing="compact">
            <AceEditor
              onChange={this.onCodeChange}
              highlightActiveLine
              mode="lua"
              value={this.state.zencode}
              focus
              height="100vh"
              width="auto"
              fontSize={15}
              theme="monokai"
              name="zenroom--editor"
              showPrintMargin={false}
              enableBasicAutocompletion
              enableLiveAutocompletion
              editorProps={{$blockScrolling: true}}
            />
          </GridColumn>
          <GridColumn medium={5} spacing="compact">
            <Tabs
              components={{ Item: TooltipItem }}
              onSelect={(tab, index) => console.log('Selected Tab', index + 1)}
              tabs={this.state.tabs}
            />
          </GridColumn>
        </Grid>
      </Page>
    )
  }
}