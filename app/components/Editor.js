// @flow
import AceEditor from 'react-ace';
import 'brace/mode/lua';
import 'brace/mode/json';
import 'brace/ext/language_tools';
import 'brace/theme/monokai';
import 'brace/theme/dracula';

import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Toggle from '@atlaskit/toggle';
import Tooltip from '@atlaskit/tooltip';
import Tabs, { TabItem } from '@atlaskit/tabs';
import PlayIcon from '@atlaskit/icon/glyph/vid-play';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import Navigation, { Skeleton } from '@atlaskit/navigation';
import ZencodePlot from './ZencodePlot';

export const jsonEditorProps = {
  mode: 'json',
  height: '400px',
  width: '100vw',
  fontSize: 15,
  theme: 'dracula',
  showPrintMargin: false,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  editorProps: { $blockScrolling: true }
};

const TooltipItem = (props: TabItemComponentProvided) => (
  <Tooltip content={props.data.tooltip}>
    <TabItem {...props} />
  </Tooltip>
);

export default class Editor extends Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      zencode: '',
      zendata: '',
      zenkeys: '',
      zenconfig: '',
      outputLog: '',
      errorLog: '',
      debugLog: '',
      isLive: false,
      collapseNav: false
    };
    this.toggleLiveCompile = this.toggleLiveCompile.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.onKeysChange = this.onKeysChange.bind(this);
    this.onConfigChange = this.onConfigChange.bind(this);
    this.toggleNavigation = this.toggleNavigation.bind(this);
    this.zenRun = this.zenRun.bind(this);
    this.printOutput = this.printOutput.bind(this);
    this.props.zenroom.print = this.printOutput;

    this.state.tabs = [
      {
        label: 'DATA',
        content: (
          <AceEditor
            {...jsonEditorProps}
            name="zenroom--data--editor"
            onChange={this.onDataChange}
            value={this.state.zendata}
          />
        ),
        tooltip: 'DATA in json format'
      },
      {
        label: 'KEYS',
        content: (
          <AceEditor
            {...jsonEditorProps}
            name="zenroom--keys--editor"
            onChange={this.onKeysChange}
            value={this.state.zenkeys}
          />
        ),
        tooltip: 'Your keys'
      },
      {
        label: 'CONFIG',
        content: (
          <AceEditor
            {...jsonEditorProps}
            name="zenroom--config--editor"
            onChange={this.onConfigChange}
          />
        ),
        tooltip: 'Your zenroom env config'
      }
    ];

    this.state.outputTabs = [
      { label: 'OUTPUT', content: this.state.outputLog },
      { label: `ERROR`, content: this.state.errorLog },
      { label: `DEBUG`, content: this.state.debugLog },
      { label: 'TERMINAL', content: <div /> },
      { label: 'REPR', content: <ZencodePlot /> }
    ];

  }

  printOutput = (text) => {
      console.log(text)
      if (arguments.length > 1) 
        text = Array.prototype.slice.call(arguments).join(' ');
      this.setState({outputLog: this.state.outputLog += `${text}<br/>`})
  }
  zenRun() {
    const zc = this.state.zencode === '' ? null : this.state.zencode;
    const zd = this.state.zendata === '' ? null : this.state.zendata;
    const zk = this.state.zenkeys === '' ? null : this.state.zenkeys;
    const zf = this.state.zenconfig === '' ? null : this.state.zenconfig;

    this.props.zenroom.ccall(
      'zenroom_exec',
      'number',
      ['string', 'string', 'string', 'string', 'number'],
      [zc, zf, zk, zd, 3]
    );
  }

  onCodeChange(__) {
    this.setState({ zencode: __ });
    if (this.state.isLive) this.zenRun();
  }
  onDataChange(__) {
    this.setState({ zendata: __ });
  }
  onKeysChange(__) {
    console.log(__, this.state.zenkeys);
    this.setState({ zenkeys: __ });
  }
  onConfigChange(__) {
    this.setState({ zenconfig: __ });
  }
  toggleNavigation() {
    this.setState({ collapseNav: !this.state.collapseNav });
  }
  toggleLiveCompile() {
    this.setState({ isLive: !this.state.isLive });
  }

  render() {
    return (
      <Page
        navigation={
          <Navigation
            isCollapsible
            isOpen={!this.state.collapseNav}
            onResize={this.toggleNavigation}
          >
            <Skeleton isCollapsed={this.state.collapseNav} />
          </Navigation>
        }
      >
        <Grid layout="fluid" spacing="compact">
          <GridColumn medium={7} spacing="compact">
            <div>
              <Button
                onClick={this.toggleNavigation}
                iconBefore={<DashboardIcon>expand</DashboardIcon>}
              />
              <Button
                onClick={this.zenRun}
                iconBefore={<PlayIcon label="run">run</PlayIcon>}
                isDisabled={this.state.isLive}
              />
              <Toggle onChange={this.toggleLiveCompile} />
              <span>live compile</span>
            </div>
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
              editorProps={{ $blockScrolling: true }}
            />
          </GridColumn>
          <GridColumn medium={5} spacing="compact">
            <Tabs components={{ Item: TooltipItem }} tabs={this.state.tabs} />
            <Tabs tabs={this.state.outputTabs} />
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}
