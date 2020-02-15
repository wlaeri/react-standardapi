import React from 'react'
import Context from './context'
import invariant from 'invariant'
import PropTypes from 'prop-types'

class Read extends React.Component {
  static contextType = Context
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      data: null,
      refetch: this.refetch.bind(this)
    }
  }

  async refetch() {
    console.log('Hello1', this)
    this.setState({
      loading: true,
      error: null,
      data: null
    })
    console.log('Hello2')
    try {
      const { baseModel, params } = this.props
      const client = this.context
      console.log('Hello3')
      const response = await client.read(baseModel, params)
      const newState = {
        loading: false,
        data: response.data
      }
      console.log('Hello4')
      this.setState(newState, () => {
        return {
          ...this.state,
          ...newState
        }
      })
    } catch (err) {  
      console.log('Hello5', err) 
      const newState = {
        loading: false,
        error: err
      }
      this.setState(newState, () => {
        return {
          ...this.state,
          ...newState
        }
      })
    }
  }

  async componentDidMount() {
    const client = this.context
    invariant(client, 'You must wrap your app in a Provider' +
      ' component in order to use the Read component.')
    
    const { baseModel, params } = this.props

    try {
      const response = await client.read(baseModel, params)
      this.setState({
        loading: false,
        data: response.data
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: err,
      })
    }
  }

  render () {
    const { children } = this.props
    invariant(children, 'The Read component must render a child component.')
    return children(this.state)
  }
}

Read.propTypes = {
  baseModel: PropTypes.string.isRequired,
  params: PropTypes.object
}

export default Read
