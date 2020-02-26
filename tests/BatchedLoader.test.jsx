import React from 'react'
import { shallow } from 'enzyme'
import { BatchedLoader, StandardAPIProvider } from '../src'
import StandardAPIClient from 'standardapi-client'

const testClient = new StandardAPIClient({
  baseUrl: 'https://test.com'
})

function setup() {
  const props = {
    baseModel: 'availabilities',
    params: {
      limit: 10
    }
  }
  const wrapper = shallow(<StandardAPIProvider client={testClient}><BatchedLoader /></StandardAPIProvider>)
  return { wrapper, props }
}

describe('BatchedLoader Test Suite', () => {
  it('Renders without crashing', () => {
    shallow(<StandardAPIProvider client={testClient}><BatchedLoader baseModel="availabilities" /></StandardAPIProvider>)
  })
})
