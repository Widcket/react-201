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
        return ( // Renderiza un componente según la ruta actual
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/lists"} component={ // Todas las listas del board
                        props => <Lists api={this.api} {...props} />
                    } />
                    <Route exact path='/lists/:listId' component={ // El detalle de una lista
                        props => <List api={this.api} {...props} />
                    } />
                    <Route exact path='/lists/:listId/cards/:cardId' component={ // El detalle de una card
                        props => <Card api={this.api} {...props} />
                    } />
                    <Route path='/' component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;