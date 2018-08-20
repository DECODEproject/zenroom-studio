import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';
import 'brace/ext/language_tools';

import OutputContainer from '../containers/OutputContainer';

export const jsonEditorProps = {
  mode: 'json',
  height: '200px',
  width: '100vw',
  fontSize: 15,
  theme: 'github',
  showPrintMargin: false,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  editorProps: { $blockScrolling: true }
};

export default class ConfigTabs extends Component<Props> {
  render() {
    return (
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
              onChange={this.props.onDataChange}
              value={this.props.zendata}
            />
          </OutputContainer>
        </TabPanel>

        <TabPanel>
          <OutputContainer>
            <AceEditor
              {...jsonEditorProps}
              name="zenroom--keys--editor"
              onChange={this.props.onKeysChange}
              value={this.props.zenkeys}
            />
          </OutputContainer>
        </TabPanel>

        <TabPanel>
          <OutputContainer>
            <AceEditor
              {...jsonEditorProps}
              name="zenroom--config--editor"
              onChange={this.props.onConfigChange}
              value={this.props.zenconfig}
            />
          </OutputContainer>
        </TabPanel>
      </Tabs>
    );
  }
}
