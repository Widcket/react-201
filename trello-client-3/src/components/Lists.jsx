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

    addList(text) {
        this.props.api.createList(text, (error, list) => {
            if (error) console.error(error);
            else {
                console.info(list);
                this.setState({ lists: [list, ...this.state.lists] });
            }
        });
    }

    render() {
        if (this.state.lists) {
            return (
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