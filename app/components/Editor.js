// @flow
import AceEditor from 'react-ace';
import 'brace/mode/lua';
import 'brace/mode/json';
import 'brace/ext/language_tools';
import 'brace/theme/monokai';
import 'brace/theme/dracula';

import React, { Component } from 'react';
import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button';
import Toggle from '@atlaskit/toggle';
import Tooltip from '@atlaskit/tooltip';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import PlayIcon from '@atlaskit/icon/glyph/vid-play';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import AstIcon from '@atlaskit/icon/glyph/bitbucket/branches';
import Navigation, { Skeleton } from '@atlaskit/navigation';
import OutputContainer from './OutputContainer';
import ZencodePlot from './ZencodePlot';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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

export const outputEditorProps = {
  theme: 'dracula',
  height: '400px',
  width: '100vw',
  highlightActiveLine: false,
  showGutter: false,
  showPrintMargin: false,
  wrapEnabled: true,
  readOnly: true,
}

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
      outputAst: '',
      errorLog: '',
      debugLog: '',
      errorCounter: 0,
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
    this.zenAst = this.zenAst.bind(this);
    this.printOutput = this.printOutput.bind(this);
    this.printError = this.printError.bind(this);
    this.props.zenroom.print = this.printOutput;
    this.props.zenroom.printErr = this.printError;
  }

   parseAstToData = (ast, result) => {
    let childCount = Object.keys(ast).length - 2;
    if (typeof ast !== 'object')
      return
      let name = (ast.tag === 'Id' || ast.tag === 'String') ? ast[1] : ast.tag
      let element = {name: name, children: []}
    for (let i=1; i <= childCount; i++) {
      this.parseAstToData(ast[i], element)
    }
    if (element.children.length == 0)
      delete element.children
    
    result.children.push(element)
  }



  printOutput = msg => {
    let json = ''
    try {
      json = JSON.parse(msg)
    } catch(e) {}
    if (json instanceof Object) { 
      let dataResult = {name: 'start', children: [] }
      this.parseAstToData(JSON.parse(msg), dataResult)
      this.setState({ outputAst: dataResult });
    }
    this.setState({ outputLog: this.state.outputLog.concat(`${msg}\n`) });
  };

  printError = msg => {
    if (!typeof msg === "string")
      return
    if (msg.startsWith('[!]')) {
      this.setState({ 
        errorLog: this.state.errorLog.concat(`${msg}\n`),
        errorCounter: this.state.errorCounter + 1,
       })
    } else {
      this.setState({ debugLog: this.state.debugLog.concat(`${msg}\n`) })
    }
    console.error(msg);
  };

  zenRun() {
    this.setState({outputLog: '', errorLog: '', debugLog: '', errorCounter: 0})
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

  zenAst() {
    const zc = this.state.zencode === '' ? null : this.state.zencode;
    this.props.zenroom.ccall(
      'zenroom_parse_ast',
      'number',
      ['string', 'int', 'string', 'number', 'string', 'number'],
      [zc, 0, this.state.outputLog, 0, '', 0]
    );
  }

  onCodeChange(__) {
    this.setState({ zencode: __ });
    if (this.state.isLive) {
      this.zenRun();
    }
  }
  onDataChange(__) {
    this.setState({ zendata: __ });
  }
  onKeysChange(__) {
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
              <Button
                onClick={this.zenAst}
                iconBefore={<AstIcon label="ast">ast</AstIcon>}
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
              debounceChangePeriod={600}
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
            <Tabs>
              <TabList>
                <Tab>DATA</Tab>
                <Tab>KEYS</Tab>
                <Tab>CONFIG</Tab>
              </TabList>

              <TabPanel>
                <OutputContainer>
                  <AceEditor {...jsonEditorProps} name="zenroom--data--editor" onChange={this.onDataChange} value={this.state.zendata} />
                </OutputContainer>
              </TabPanel>
              <TabPanel>
                <OutputContainer>
                  <AceEditor {...jsonEditorProps} name="zenroom--keys--editor" onChange={this.onKeysChange} value={this.state.zenkeys} />
                </OutputContainer>
              </TabPanel>
              <TabPanel>
                <OutputContainer>
                  <AceEditor {...jsonEditorProps} name="zenroom--config--editor" onChange={this.onKeysChange} value={this.state.zenconfig} />
                </OutputContainer>
              </TabPanel>
            </Tabs>

            <Tabs>
              <TabList>
                <Tab>OUTPUT</Tab>
                <Tab>ERROR <Badge max={99}>{this.state.errorCounter}</Badge></Tab>
                <Tab>DEBUG</Tab>
                <Tab>AST</Tab>
                <Tab>VISUAL CODE</Tab>
              </TabList>

              <TabPanel>
                <OutputContainer>
                  <Button iconBefore={<TrashIcon/>} />
                  <AceEditor {...outputEditorProps} name="zenroom--output--editor" value={this.state.outputLog} readOnly />
                </OutputContainer>
                {/* <OutputContainer>{this.state.outputLog}</OutputContainer> */}
              </TabPanel>
              <TabPanel>
                <OutputContainer>{this.state.errorLog}</OutputContainer>
              </TabPanel>
              <TabPanel>
                <OutputContainer>{this.state.debugLog}</OutputContainer>
              </TabPanel>
              <TabPanel>
                <AceEditor {...jsonEditorProps} name="zenroom--ast--editor" value={this.state.outputAst} readOnly />
              </TabPanel>
              <TabPanel>
                <OutputContainer>
                  <ZencodePlot ast={this.state.outputAst} />
                </OutputContainer>
              </TabPanel>
            </Tabs>
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}
