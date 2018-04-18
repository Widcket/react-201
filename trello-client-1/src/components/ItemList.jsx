import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ItemList extends Component {
    // Toma un diccionario de ítems y arma con ellos un listado de links
    render() {
        let list = []; // Creamos un array

        for (let key in this.props.items) {
            if (this.props.items.hasOwnProperty(key)) {
                const path = this.props.path.endsWith('/') ? this.props.path : `${this.props.path}/`;

                list.push( // Agregamos los ítems del diccionario al array
                    <li key={key}>
                        <Link to={`${path}${key}`}>{this.props.items[key]}</Link>
                    </li>
                );
            }
        }

        return <ul>{list}</ul>; // Devolvemos el listado con los ítems
    }
}

export default ItemList;