import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button';
import TrashIcon from '@atlaskit/icon/glyph/trash';

import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';
import 'brace/ext/language_tools';

import OutputContainer from './OutputContainer';
import ZencodePlot from '../components/ZencodePlot';

export const outputEditorProps = {
  theme: 'github',
  height: '600px',
  width: '100vw',
  highlightActiveLine: false,
  showGutter: false,
  showPrintMargin: false,
  wrapEnabled: true,
  readOnly: true
};

export default class OutputTabs extends Component<Props> {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>OUTPUT</Tab>
          <Tab>
            ERROR &nbsp;
            <Badge
              value={this.props.errorCounter}
              max={99}
              appearance={
                this.props.errorCounter ? 'important' : 'primaryInverted'
              }
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
              value={this.props.outputLog}
              readOnly
            />
          </OutputContainer>
        </TabPanel>
        <TabPanel>
          <OutputContainer>{this.props.errorLog}</OutputContainer>
        </TabPanel>
        <TabPanel>
          <OutputContainer>{this.props.debugLog}</OutputContainer>
        </TabPanel>
        <TabPanel>
          <AceEditor
            {...outputEditorProps}
            name="zenroom--ast--editor"
            value={JSON.stringify(this.props.outputAst)}
            readOnly
          />
        </TabPanel>
        <TabPanel>
          <OutputContainer>
            <ZencodePlot ast={this.props.outputAst} />
          </OutputContainer>
        </TabPanel>
      </Tabs>
    );
  }
}
