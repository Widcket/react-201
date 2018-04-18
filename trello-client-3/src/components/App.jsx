import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TrelloAPI from '../services/trelloAPI';
import Lists from './Lists';
import List from './List';
import Card from './Card';
import NotFound from './NotFound';

class App extends Component {
    constructor(props) {
        super(props);

        this.api = new TrelloAPI();
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/lists"} component={
                        props => <Lists api={this.api} {...props} />
                    } />
                    <Route exact path='/lists/:listId' component={
                        props => <List api={this.api} {...props} />
                    } />
                    <Route exact path='/lists/:listId/cards/:cardId' component={
                        props => <Card api={this.api} {...props} />
                    } />
                    <Route path='/' component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;