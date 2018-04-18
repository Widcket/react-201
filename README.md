# React 201

Aplicación React de ejemplo presentada en una charla para mis compañeros de trabajo.
Se trata de un cliente de Trello que permite ver/crear/editar/borrar listas y cards de un board dado. Está desarrollada en 3 etapas:

- **trello-client-1**: Sólo permite ver listas y cards.
- **trello-client-2**: Permite crear listas y cards.
- **trello-client-3**: Permite editar y borrar listas y cards.

Para correr la app, primero hay que agregar la API key y el token de Trello, y el ID de un board en el archivo `src/services/trelloAPI.js` del ejemplo que se quiera correr.

Luego en el directorio del ejemplo ejecutar:

```
$ npm install
$ npm start
```

Se abrirá una pestaña del navegador con la app.

Para obtener las credenciales de la API de Trello referirse a su [documentación](https://trello.readme.io/docs/api-introduction).