import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            card: null,
            list: null
        };
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