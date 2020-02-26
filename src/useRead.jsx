import { useEffect, useState, useContext } from 'react'
import context from './context'
import invariant from 'invariant'

const useRead = (baseModel, params) => {
  const client = useContext(context)
  invariant(client, 'You must wrap your app in a Provider' +
      ' component in order to use the useRead hook.')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [count, setCount] = useState(0)
  
  useEffect(async () => {
    try {
      const response = await client.read(baseModel, params)
      setData(response.data)
      setLoading(false)
      if (response.data && response.data.length) setCount(response.data.length)
      else setCount(1)
    } catch (e) {
      setError(e)
    }
  })

  const refetch = async () => {
    try {
      setLoading(true)
      setData(null)
      setError(null)
      setCount(0)
      const response = await client.read(baseModel, params)
      setData(response.data)
      setLoading(false)
      if (response.data && response.data.length) setCount(response.data.length)
      else setCount(1)
    } catch (e) {
      setError(e)
    }
  }

  return {
    loading,
    data,
    error,
    count,
    refetch
  }
}

export default useRead
