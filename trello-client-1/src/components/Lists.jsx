import React, { Component } from 'react';
import ItemList from './ItemList';
import Loading from './Loading';

class Lists extends Component {
    constructor(props) {
        super(props);

        // Inicializamos el state
        this.state = {
            lists: null
        };
    }

    componentDidMount() {
        this.props.api.getLists((error, data) => {
            // Seguimos la convención de Node, donde el primer parámetro del callback es el error
            if (error) console.error(error);
            else {
                console.info(data.lists);
                this.setState({ lists: data.lists });
            }
        });
    }

    // Llamamos a este método desde render()
    getItems() {
        const items = {};

        for (let index in this.state.lists) { // Armamos un diccionario que ItemList pueda usar
            items[this.state.lists[index].id] = this.state.lists[index].name;
        }

        return items
    }

    render() {
        if (this.state.lists) { // Si se cargaron las listas, las mostramos con un ItemList
            return (
                <div>
                    <h1>Listas</h1>
                    <ItemList items={this.getItems()} path={this.props.location.pathname} />
                </div>
            );
        }

        return <Loading />; // No se cargaron las listas todavía
    }
}

export default Lists;