// @flow
import React, { Component } from 'react';

import AceEditor from 'react-ace';

import 'brace/mode/lua';
import 'brace/mode/json';
import 'brace/theme/monokai';
import 'brace/theme/dracula';

import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button';
import Toggle from '@atlaskit/toggle';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import PlayIcon from '@atlaskit/icon/glyph/vid-play';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import Navigation, { Skeleton } from '@atlaskit/navigation';
import AstIcon from '@atlaskit/icon/glyph/bitbucket/branches';

import OutputContainer from '../containers/OutputContainer';
import ZencodePlot from './ZencodePlot';

export const jsonEditorProps = {
  mode: 'json',
  height: '200px',
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
  height: '600px',
  width: '100vw',
  highlightActiveLine: false,
  showGutter: false,
  showPrintMargin: false,
  wrapEnabled: true,
  readOnly: true
};

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
    this.errorCounter = 0;
    this.outputLog = '';
    this.errorLog = '';
    this.debugLog = '';

    const { zenroom } = this.props;
    zenroom.print = this.printOutput;
    zenroom.printErr = this.printError;
  }

  parseAstToData = (ast, result) => {
    const childCount = Object.keys(ast).length - 2;

    if (typeof ast !== 'object') return;

    const name =
      ast.tag === 'Id' || ast.tag === 'String'
        ? ast['1']
        : `${ast.tag} ${Math.random()
            .toString(36)
            .substr(2, 4)}`;
    const element = { name, children: [] };
    for (let i = 1; i <= childCount; i += 1) {
      this.parseAstToData(ast[i], element);
    }
    if (element.children.length === 0) delete element.children;

    result.children.push(element);
  };

  printOutput = msg => {
    let json = '';

    try {
      json = JSON.parse(msg);
    } catch (e) {}

    if (json instanceof Object) {
      const dataResult = { name: 'start', children: [] };
      this.parseAstToData(JSON.parse(msg), dataResult);
      this.setState({ outputAst: dataResult });
    }

    this.outputLog = this.outputLog.concat(`${msg}\n`);
  };

  printError = msg => {
    if (typeof msg !== 'string') return;

    if (msg.toString().startsWith('[!]')) {
      this.errorLog = this.errorLog.concat(
        `${new Date().toISOString()}:  ${msg}\n`
      );
      this.errorCounter += 1;
    }

    this.debugLog = this.debugLog.concat(
      `${new Date().toISOString()}:  ${msg}\n`
    );
  };

  zenRun() {
    this.errorLog = '';
    this.debugLog = '';
    this.outputLog = '';
    this.errorCounter = 0;
    const { zenroom } = this.props;
    const { zencode, zendata, zenkeys, zenconfig } = this.state;

    const zc = zencode === '' ? null : zencode;
    const zd = zendata === '' ? null : zendata;
    const zk = zenkeys === '' ? null : zenkeys;
    const zf = zenconfig === '' ? null : zenconfig;

    zenroom.ccall(
      'zenroom_exec',
      'number',
      ['string', 'string', 'string', 'string', 'number'],
      [zc, zf, zk, zd, 3]
    );

    this.setState({
      errorLog: this.errorLog,
      debugLog: this.debugLog,
      outputLog: this.outputLog,
      errorCounter: this.errorCounter
    });
  }

  zenAst() {
    const { zencode, outputAst } = this.state;
    const { zenroom } = this.props;

    const zc = zencode === '' ? null : zencode;
    zenroom.ccall(
      'zenroom_parse_ast',
      'number',
      ['string', 'int', 'string', 'number', 'string', 'number'],
      [zc, 0, outputAst, 0, '', 0]
    );
  }

  onCodeChange(__) {
    const { isLive } = this.state;
    this.setState({ zencode: __ });
    if (isLive) this.zenRun();
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
    const { collapseNav } = this.state;
    this.setState({ collapseNav: !collapseNav });
  }

  toggleLiveCompile() {
    const { isLive } = this.state;
    this.setState({ isLive: !isLive });
  }

  render() {
    const {
      collapseNav,
      isLive,
      zencode,
      zendata,
      zenkeys,
      zenconfig,
      errorCounter,
      outputLog,
      outputAst,
      errorLog,
      debugLog
    } = this.state;

    return (
      <Page
        navigation={
          <Navigation
            isCollapsible
            isOpen={!collapseNav}
            onResize={this.toggleNavigation}
          >
            <Skeleton isCollapsed={collapseNav} />
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
                id="run"
                onClick={this.zenRun}
                iconBefore={<PlayIcon label="run">run</PlayIcon>}
                isDisabled={isLive}
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
              value={zencode}
              focus
              height="calc(100vh - 37px)"
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
                  <AceEditor
                    {...jsonEditorProps}
                    name="zenroom--data--editor"
                    onChange={this.onDataChange}
                    value={zendata}
                  />
                </OutputContainer>
              </TabPanel>
              <TabPanel>
                <OutputContainer>
                  <AceEditor
                    {...jsonEditorProps}
                    name="zenroom--keys--editor"
                    onChange={this.onKeysChange}
                    value={zenkeys}
                  />
                </OutputContainer>
              </TabPanel>
              <TabPanel>
                <OutputContainer>
                  <AceEditor
                    {...jsonEditorProps}
                    name="zenroom--config--editor"
                    onChange={this.onKeysChange}
                    value={zenconfig}
                  />
                </OutputContainer>
              </TabPanel>
            </Tabs>

            <Tabs>
              <TabList>
                <Tab>OUTPUT</Tab>
                <Tab>
                  ERROR
                  <Badge
                    value={errorCounter}
                    max={99}
                    appearance={errorCounter ? 'important' : 'primaryInverted'}
                  />
                </Tab>
                <Tab>DEBUG</Tab>
                <Tab>AST</Tab>
                <Tab>VISUAL CODE</Tab>
              </TabList>

              <TabPanel>
                <OutputContainer>
                  <Button iconBefore={<TrashIcon />} />
                  <AceEditor
                    {...outputEditorProps}
                    name="zenroom--output--editor"
                    value={outputLog}
                    readOnly
                  />
                </OutputContainer>
              </TabPanel>
              <TabPanel>
                <OutputContainer>{errorLog}</OutputContainer>
              </TabPanel>
              <TabPanel>
                <OutputContainer>{debugLog}</OutputContainer>
              </TabPanel>
              <TabPanel>
                <AceEditor
                  {...jsonEditorProps}
                  name="zenroom--ast--editor"
                  value={JSON.stringify(outputAst)}
                  readOnly
                />
              </TabPanel>
              <TabPanel>
                <OutputContainer>
                  <ZencodePlot ast={outputAst} />
                </OutputContainer>
              </TabPanel>
            </Tabs>
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}
