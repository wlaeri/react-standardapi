# React StandardAPI
A React library for querying a Rails application through [StandardAPI](https://github.com/waratuman/standardapi). Requires [StandardAPI Client](https://github.com/wlaeri/standardapi-client) as a peer dependency.

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

First the StandardAPI Client must be instantiated. Headers are optional.

```react
import StandardAPIClient from 'standardapi-client'

const client = new StandardAPIClient({
  baseURL: API_BASE_URL,
  headers: {
    'Api-Key': API_KEY,
    'Api-Version': API_VERSION,
  }
})
```

Then, the React application must be wrapped in the `<Provider />` component which passes the StandardAPI client instance to the app through React context. Then you are able to use the `<Read />` component which retrieves data from StandardAPI.

```react
import { Provider } from 'react-standardapi'
import ReactDOM from 'react-dom'

params = {
  limit: 10,
  offset: 0,
  where: {
    status: 'INCOMPLETE'
  }
}

const app = () => (
  <Provider client={client}>
    <Read baseModel='todos' params={params}>
    {({ data, loading, error, refetch }) => {
      if (loading) return renderLoading()
      if (error) return renderError(error)
      return (
        <div>
          { data.map(t => renderTodoItem(t, refetch)) }
          <button onClick={refetch}>Reload</button>
        </div>
      )
    }}
    </Read>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
```

## Read

The children of the `<Read />` component receive four props. The `loading` prop is a boolean indicating whether the request has completed or is still in flight. The `error` prop is the error object in the event the request fails. The `data` is the response payload of a successful request, and `refetch` is a function that retriggers the StandardAPI call.

Data can be mutated using the client's `create`, `update`, and `destroy` methods and the data can be refetched using the `refetch` function. For example, consider the `renderTodoItem` function below.

```react
const renderTodoItem = (t, refetch) => (
  <div>
  	<h1>{ t.name }</h1>
  	<p>{ t.description }</p>
  	<button onClick={() => deleteTodo(t.id, refetch)}
  </div>
 )
 
 const deleteTodo = async (id, refetch) => {
   try {
 	  await client.destroy('todos', id)
 	  refetch()
   } catch (e) {
 	  handleError(e)
 	}
 }
    
```
In the above example, we use the StandardAPI client to delete a todo and then use the `refetch` function to refresh the list of todos.

## BatchedLoader
If you want to load data dynamically using pagination, you can use the `<BatchedLoader />` component. The `batchSize` prop sets the number of records returned in each batched load. 

```react
const Newsfeed = () => (
  <Provider client={client}>
    <BatchedLoader baseModel='articles' params={{ include: { author: true }}} batchSize={5}>
      {({ data, error, fetchNextBatch }) => {
        if (error) return <div>Error...</div>

        return (
          <div>
            {
              data.map(a => {
                if (a.loading) return <ArticleLoader />
                else return <ArticleCard article={a} />
              })
            }
            <button onClick={fetchNextBatch}>Load More Articles</button>
          </div>
        )
      }}
    </BatchedLoader>
  </Provider>
)
```
The `<BatchedLoader />` component returns loading objects (e.g. `{ loading: true, index: 3 }`) while the query is loading which allows for rendering dummy UI before the content loads. Calling the `fetchNextBatch` function adds the next batch of loading objects onto the data array. When the query is resolved, the loading objects are replaced with the records returned from the StandardAPI call.

## Resources

* [StandardAPI Docs](https://github.com/waratuman/standardapi)
* [StandardAPI Client Docs](https://github.com/wlaeri/standardapi-client)
* [StandardAPI React Boilerplate App](https://github.com/wlaeri/standardapi-boilerplate)
* [React Docs](https://reactjs.org/)

## Credits

React StandardAPI is heavily inspired by the GraphQL client library [Apollo Client](https://www.apollographql.com/docs/react/). Ultimately, React StandardAPI is an effort to provide an Apollo Client-like developer experience for StandardAPI.

## License

[MIT](LICENSE)
