import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ItemList extends Component {
    render() {
        let list = [];

        for (let key in this.props.items) {
            if (this.props.items.hasOwnProperty(key)) {
                const path = this.props.path.endsWith('/') ? this.props.path : `${this.props.path}/`;

                list.push(
                    <li key={key}>
                        <Link to={`${path}${key}`}>{this.props.items[key]}</Link>
                    </li>
                );
            }
        }

        return <ul>{list}</ul>;
    }
}

export default ItemList;