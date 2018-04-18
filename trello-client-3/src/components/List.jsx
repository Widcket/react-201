import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import ItemList from './ItemList';
import Loading from './Loading';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null,
            cards: null,
            isEditing: false // Para mostrar/ocultar el formulario de edición
        };

        this.editList = this.editList.bind(this);
        this.updateList = this.updateList.bind(this);
        this.closeList = this.closeList.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    componentDidMount() {
        this.props.api.getList(this.props.match.params.listId, (error, list) => {
            if (error) console.error(error);
            else {
                console.info(list);
                this.setState({ list: list });
            }
        });

        this.props.api.getCards(this.props.match.params.listId, (error, cards) => {
            if (error) console.error(error);
            else {
                console.info(cards);
                this.setState({ cards: cards });
            }
        });
    }

    getItems() {
        if (this.state.cards) {
            const items = {};

            for (let index in this.state.cards) {
                items[this.state.cards[index].id] = this.state.cards[index].name;
            }

            return items
        }

        return [];
    }

    editList(text) {
        this.setState({ isEditing: !this.state.isEditing });
    }

    updateList(text) {
        // Toma el ID de la lista que queremos actualizar y el nombre nuevo
        this.props.api.updateList(this.state.list.id, text, (error, list) => {
            if (error) console.error(error);
            else {
                console.info(list);
                // Actualizamos la lista y ocultamos el formulario de edición
                this.setState({ list: {...this.state.list, name: list.name}, isEditing: false });
            }
        });
    }

    closeList() {
        // Toma el ID de la lista que queremos cerrar
        this.props.api.closeList(this.state.list.id, (error, list) => {
            if (error) console.error(error);
            else {
                console.info(list);
                 // Como ya cerramos la lista actual, volvemos al listado principal
                this.props.history.push('/lists');
            }
        });
    }

    addCard(text) {
        this.props.api.createCard(this.state.list.id, text, (error, card) => {
            if (error) console.error(error);
            else {
                console.info(card);
                this.setState({ cards: [card, ...this.state.cards] });
            }
        });
    }

    render() {
        if (this.state.list) {
            return (
                <div>
                    <nav>
                        <Link to={`/lists`}>Listas</Link>
                    </nav>

                    <h1>{this.state.list.name}</h1>
                    <button onClick={this.editList}>Editar</button>

                    { // El formulario de edición
                        this.state.isEditing ?
                            <Form onSubmit={this.updateList} text={this.state.list.name} buttonLabel="Guardar" /> :
                            ''
                    }

                    <button onClick={this.closeList}>Borrar</button>
                    <Form onSubmit={this.addCard} buttonLabel="+ Card" />
                    <ItemList items={this.getItems()} path={`${this.props.location.pathname}/cards`} />
                </div>
            );
        }

        return <Loading />;
    }
}

export default List;