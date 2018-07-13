// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page, { Grid, GridColumn } from '@atlaskit/page';

type Props = {};

export default class Home extends Component<Props> {
  render() {
    return (
      <Page>
        <Grid>
          <GridColumn medium={8}>
            <h1>Zenroom Studio</h1>
            <Link to="/editor">
              <i className="fa fa-plus-circle" />
              create a new project
            </Link>
            <br />
            <br />
            <Link to="/">
              <i className="fa fa-folder" />
              open a project
            </Link>
          </GridColumn>
          <GridColumn medium={4} />
        </Grid>
      </Page>
    );
  }
}
