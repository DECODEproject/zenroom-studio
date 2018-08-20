// @flow
import React, { Component } from 'react';

import AceEditor from 'react-ace';
import 'brace/mode/lua';
import 'brace/mode/json';
import 'brace/theme/monokai';
import 'brace/theme/dracula';
import 'brace/ext/language_tools';

import Button from '@atlaskit/button';
import Toggle from '@atlaskit/toggle';
import PlayIcon from '@atlaskit/icon/glyph/vid-play';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import Navigation, { Skeleton } from '@atlaskit/navigation';
import AstIcon from '@atlaskit/icon/glyph/bitbucket/branches';

import ConfigTabs from '../containers/ConfigTabs';
import OutputTabs from '../containers/OutputTabs';

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

    this.errorCounter = 0;
    this.outputLog = '';
    this.errorLog = '';
    this.debugLog = '';
  }

  parseAstToData = (ast, result) => {
    const childCount = Object.keys(ast).length - 2;

    if (typeof ast !== 'object') return;

    const name =
      ast.tag === 'Id' || ast.tag === 'String'
        ? `${ast[1]} ${Math.random()
            .toString(36)
            .substr(2, 2)}`
        : `${ast.tag} ${Math.random()
            .toString(36)
            .substr(2, 2)}`;
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

    this.setState({
      errorLog: this.errorLog,
      debugLog: this.debugLog,
      outputLog: this.outputLog,
      errorCounter: this.errorCounter
    });
  }

  zenAst() {
    const zc = this.state.zencode === '' ? null : this.state.zencode;
    this.props.zenroom.ccall(
      'zenroom_parse_ast',
      'number',
      ['string', 'int', 'string', 'number', 'string', 'number'],
      [zc, 0, this.state.outputAst, 0, '', 0]
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
                id="run"
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
            <ConfigTabs
              onDataChange={this.onDataChange}
              onKeysChange={this.onKeysChange}
              onConfigChange={this.onConfigChange}
              zendata={this.state.zendata}
              zenkeys={this.state.zenkeys}
              zenconfig={this.state.zenconfig}
            />

            <OutputTabs
              errorCounter={this.state.errorCounter}
              outputLog={this.state.outputLog}
              errorLog={this.state.errorLog}
              debugLog={this.state.debugLog}
              outputAst={this.state.outputAst}
            />
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}
