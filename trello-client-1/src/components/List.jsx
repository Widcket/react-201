import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemList from './ItemList';
import Loading from './Loading';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null,
            cards: null
        };
    }

    componentDidMount() {
        // Para obtener los datos de la lista
        this.props.api.getList(this.props.match.params.listId, (error, list) => {
            if (error) console.error(error);
            else {
                console.info(list);
                this.setState({ list: list });
            }
        });

        // Para obtener las cards de la lista
        this.props.api.getCards(this.props.match.params.listId, (error, cards) => {
            if (error) console.error(error);
            else {
                console.info(cards);
                this.setState({ cards: cards });
            }
        });
    }

    getItems() {
        if (this.state.cards) { // Si se cargaron las cards
            const items = {};

            for (let index in this.state.cards) { // Armamos un diccionario con las cards que ItemList pueda usar
                items[this.state.cards[index].id] = this.state.cards[index].name;
            }

            return items
        }

        return []; // Se cargó la lista pero las cards todavía no, así que devolvemos un array vacío
    }

    render() {
        if (this.state.list) { // Si se cargó la lista, mostramos el nombre y sus cards
            return (
                <div>
                    <nav>
                        <Link to={`/lists`}>Listas</Link>
                    </nav>

                    <h1>{this.state.list.name}</h1>
                    <ItemList items={this.getItems()} path={`${this.props.location.pathname}/cards`} />
                </div>
            );
        }

        return <Loading />;
    }
}

export default List;