import React, { Component } from 'react';

import Button from '@atlaskit/button';
import Toggle from '@atlaskit/toggle';
import PlayIcon from '@atlaskit/icon/glyph/vid-play';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import AstIcon from '@atlaskit/icon/glyph/bitbucket/branches';

import AceEditor from 'react-ace';
import 'brace/mode/lua';
import 'brace/mode/json';
import 'brace/theme/monokai';
import 'brace/theme/dracula';
import 'brace/ext/language_tools';

export default class ZencodeEditor extends Component<Props> {
  render() {
    return (
      <div>
        <div>
          <Button
            onClick={this.props.toggleNavigation}
            iconBefore={<DashboardIcon>expand</DashboardIcon>}
          />
          <Button
            id="run"
            onClick={this.props.zenRun}
            iconBefore={<PlayIcon label="run">run</PlayIcon>}
            isDisabled={this.props.isLive}
          />
          <Button
            onClick={this.props.zenAst}
            iconBefore={<AstIcon label="ast">ast</AstIcon>}
          />
          <Toggle onChange={this.props.toggleLiveCompile} />
          <span>live compile</span>
        </div>
        <AceEditor
          onChange={this.props.onCodeChange}
          highlightActiveLine
          mode="lua"
          value={this.props.zencode}
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
      </div>
    );
  }
}
