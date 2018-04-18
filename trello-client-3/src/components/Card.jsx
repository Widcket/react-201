import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import Loading from './Loading';

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            card: null,
            list: null,
            isEditing: false
        };

        this.editCard = this.editCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    componentDidMount() {
        this.props.api.getCard(this.props.match.params.cardId, (error, card) => {
            if (error) console.error(error);
            else {
                console.info(card);
                this.setState({ card: card });
            }
        });

        this.props.api.getList(this.props.match.params.listId, (error, list) => {
            if (error) console.error(error);
            else {
                console.info(list);
                this.setState({ list: list });
            }
        });
    }

    editCard(text) {
        this.setState({ isEditing: !this.state.isEditing });
    }

    updateCard(text) {
        // Toma el ID de la card que queremos actualizar y el texto nuevo
        this.props.api.updateCard(this.state.card.id, text, (error, card) => {
            if (error) console.error(error);
            else {
                console.info(card);
                this.setState({ card: {...this.state.card, name: card.name}, isEditing: false });
            }
        });
    }

    deleteCard() {
        const listId = this.state.card.idList;

        // Toma el ID de la card que queremos borrar
        this.props.api.deleteCard(this.state.card.id, (error, card) => {
            if (error) console.error(error);
            else {
                console.info(card);
                // Como ya borramos la card, volvemos a la página de la lista
                this.props.history.push(`/lists/${listId}`);
            }
        });
    }

    render() {
        if (this.state.card && this.state.list) {
            const timestamp = parseInt(this.state.card.id.toString().substr(0, 8), 16) * 1000;
            const date = new Date(timestamp).toLocaleDateString('es-AR');

            return (
                <div>
                    <nav>
                        <Link to={`/lists`}>Listas</Link>
                        /
                        <Link to={`/lists/${this.state.card.idList}`}>{this.state.list.name}</Link>
                    </nav>

                    <h1>{this.state.card.name}</h1>
                    <button onClick={this.editCard}>Editar</button>

                    {
                        this.state.isEditing ?
                            <Form onSubmit={this.updateCard} text={this.state.card.name} buttonLabel="Guardar" /> :
                            ''
                    }

                    <button onClick={this.deleteCard}>Borrar</button>
                    <ul>
                        <li key="date">Creación: {date}</li>
                    </ul>
                </div>
            );
        }

        return <Loading />;
    }
}

export default Card;