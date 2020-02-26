import React from 'react'
import { shallow } from 'enzyme'
import { BatchedLoader, Provider } from '../src'
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
  const wrapper = shallow(<Provider client={testClient}><BatchedLoader /></Provider>)
  return { wrapper, props }
}

describe('BatchedLoader Test Suite', () => {
  it('Renders without crashing', () => {
    shallow(<Provider client={testClient}><BatchedLoader baseModel="availabilities" /></Provider>)
  })
})
