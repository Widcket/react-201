import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.updateText = this.updateText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Cuando cambia el valor del textarea lo guardamos en el state
    updateText(event) {
        this.setState({ text: event.target.value });
    }

    // Cuando hacemos click en el botón, le pasamos el texto al callback que vino en los props
    onSubmit() {
        this.props.onSubmit(this.state.text);
        this.setState({ text: '' });
    }

    render() {
        return (
            <div>
                <textarea value={this.state.text} onChange={this.updateText}></textarea>
                <button onClick={this.onSubmit}>{this.props.buttonLabel}</button>
            </div>
        );
    }
}

export default Form;