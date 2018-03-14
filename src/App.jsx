import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'App.css';

import Incidents from 'components/incidents/incidents';

export default class App extends React.Component {
    constructor () {
        super();
        this.history = createBrowserHistory(this.props);
    }

    render () {
        return (
            <MuiThemeProvider>
                <Router history={this.history}>
                    <div className="container">
                        <Route exact path="/" component={Incidents} />
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}
