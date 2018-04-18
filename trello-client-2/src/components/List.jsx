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
            cards: null
        };

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

    addCard(text) {
        // Toma el ID de la lista en la cual se va agregar la card
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
            return ( // Agregamos el formulario para crear cards en la lista y le pasamos el callback 'addCard'
                <div>
                    <nav>
                        <Link to={`/lists`}>Listas</Link>
                    </nav>

                    <h1>{this.state.list.name}</h1>
                    <Form onSubmit={this.addCard} buttonLabel="+ Card" />
                    <ItemList items={this.getItems()} path={`${this.props.location.pathname}/cards`} />
                </div>
            );
        }

        return <Loading />;
    }
}

export default List;