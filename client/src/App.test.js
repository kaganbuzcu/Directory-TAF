import React from 'react'
import { shallow } from 'enzyme/build'
import App from './App'
import Directory from './views/directory/Directory.js'


it('mounts without crashing', () => {
  const wrapper = shallow(<App/>)
  wrapper.unmount()
})

it('mounts Directory without crashing', () => {
  const wrapper = shallow(<Directory/>)
  wrapper.unmount()
})
