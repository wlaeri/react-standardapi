# React StandardAPI
A React library for querying a Rails application through [StandardAPI](https://github.com/waratuman/standardapi). Requires [StandardAPI Client](https://github.com/wlaeri/standardapi-client) as a dependency.

## Installation

Using npm:

```bash
$ npm install react-standardapi standardapi-client
```

Using yarn:

```bash
$ yarn add react-standardapi standardapi-client
```

## Implementation

First the StandardAPI Client must be instantiated.

```node
import StandardAPIClient from 'standardapi-client';

const client = new StandardAPIClient({
  baseURL: API_BASE_URL
})
```

If the Rails server uses authorization headers you can add them on instantiation.

```node
import StandardAPIClient from 'standardapi-client';

const client = new StandardAPIClient({
  baseURL: API_BASE_URL,
  headers: {
    'Api-Key': API_KEY,
    'Api-Version': API_VERSION,
  }
})
```

Then, the React application must be wrapped in the `<StandardAPIProvider />` component which passes the StandardAPI client instance to the app through React context.

```node
import { StandardAPIProvider } from 'react-standardapi';
import ReactDOM from 'react-dom';

const app = () => (
  <StandardAPIProvider client={client}>
    <App />
  </StandardAPIProvider>
)

ReactDOM.render(app, document.getElementById('root'));
```

## Usage



## Resources

* [StandardAPI Docs](https://github.com/waratuman/standardapi)
* [StandardAPI Client Docs]()
* [React Docs]()

## Credits

React StandardAPI is heavily inspired by the GraphQL client library [Apollo Client](https://www.apollographql.com/docs/react/). Ultimately, React StandardAPI is an effort to provide an Apollo Client-like developer experience for StandardAPI.

## License

[MIT](LICENSE)
