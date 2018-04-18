import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text || '' // Damos la posibilidad de precargar un texto, así lo podemos editar
        };

        this.updateText = this.updateText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateText(event) {
        this.setState({ text: event.target.value });
    }

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