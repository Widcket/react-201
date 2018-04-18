class TrelloAPI {
    baseUrl = 'https://api.trello.com/1';
    boardId = 'BOARD_ID';

    credentials = {
        key: 'KEY',
        token: 'TOKEN'
    };

    getUrl(urlString, params) {
        const url = new URL(urlString);

        // Encodeamos los parámetros y los agregamos a la URL
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        return url;
    }

    makeRequest(url, callback) {
        fetch(url) // Devuelve una promise
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
}

export default TrelloAPI;