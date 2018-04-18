class TrelloAPI {
    baseUrl = 'https://api.trello.com/1';
    boardId = 'BOARD_ID';

    credentials = {
        key: 'KEY',
        token: 'TOKEN'
    };

    getUrl(urlString, params) {
        const url = new URL(urlString);

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        return url;
    }

    getRequestData(method) {
        return {
            method: method,
            body: {},
            headers: new Headers()
        };
    }

    makeRequest(url, callback, requestData) {
        fetch(url, requestData)
            .then(data => data.json())
            .then(json => {
                callback(null, json);
            })
            .catch(error => {
                callback(error, null);
            });
    }

    getLists(callback) {
        const urlString = `${this.baseUrl}/boards/${this.boardId}`;
        const params = {...this.credentials, fields: 'id,name', lists: 'open', list_fields: 'id,name'}
        const url = this.getUrl(urlString, params);

        this.makeRequest(url, callback);
    }

    getList(listId, callback) {
        const urlString = `${this.baseUrl}/lists/${listId}`;
        const url = this.getUrl(urlString, this.credentials);

        this.makeRequest(url, callback);
    }

    // Es una request POST que toma el id del board y el nombre de la lista
    createList(title, callback) {
        const urlString = `${this.baseUrl}/lists`;
        const params = {...this.credentials, idBoard: this.boardId, name: title.trim()}
        const url = this.getUrl(urlString, params);
        const requestData = this.getRequestData('POST');

        this.makeRequest(url, callback, requestData);
    }

    getCards(listId, callback) {
        const urlString = `${this.baseUrl}/lists/${listId}/cards`;
        const params = {...this.credentials, fields: 'id,name,idList'}
        const url = this.getUrl(urlString, params);

        this.makeRequest(url, callback);
    }

    getCard(cardId, callback) {
        const urlString = `${this.baseUrl}/cards/${cardId}`;
        const url = this.getUrl(urlString, this.credentials);

        this.makeRequest(url, callback);
    }

    // Es una request POST que toma el id de la lista y el texto de la card
    createCard(listId, text, callback) {
        const urlString = `${this.baseUrl}/cards`;
        const params = {...this.credentials, idList: listId, name: text.trim()}
        const url = this.getUrl(urlString, params);
        const requestData = this.getRequestData('POST');

        this.makeRequest(url, callback, requestData);
    }
}

export default TrelloAPI;