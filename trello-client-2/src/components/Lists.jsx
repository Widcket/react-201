import React, { Component } from 'react';
import Form from './Form';
import ItemList from './ItemList';
import Loading from './Loading';

class Lists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: null
        };

        // Hay que bindear 'this' al callback, sino dentro del callback 'this' va a ser 'undefined'
        this.addList = this.addList.bind(this);
    }

    componentDidMount() {
        this.props.api.getLists((error, data) => {
            if (error) console.error(error);
            else {
                console.info(data.lists);
                this.setState({ lists: data.lists });
            }
        });
    }

    getItems() {
        const items = {};

        for (let index in this.state.lists) {
            items[this.state.lists[index].id] = this.state.lists[index].name;
        }

        return items
    }

    // Este método es un callback llamado desde el Form cuando se hace click en el botón '+ List'
    addList(text) {
        this.props.api.createList(text, (error, list) => {
            if (error) console.error(error);
            else {
                console.info(list);
                // Agregamos la nueva lista al comienzo del array, para que aparezca primero
                // Se hace una copia del array anterior para no modificar el state en forma directa
                this.setState({ lists: [list, ...this.state.lists] });
            }
        });
    }

    render() {
        if (this.state.lists) {
            return ( // Agregamos el formulario para crear listas y le pasamos el callback 'addList'
                <div>
                    <h1>Listas</h1>
                    <Form onSubmit={this.addList} buttonLabel="+ List" />
                    <ItemList items={this.getItems()} path={this.props.location.pathname} />
                </div>
            );
        }

        return <Loading />;
    }
}

export default Lists;