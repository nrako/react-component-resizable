import React from 'react'
import {render} from 'react-dom'
import styles from './style.css'

import Resizable from '../../src'

let Demo = React.createClass({
  getInitialState () {
    return {}
  },
  onResize(dimmensions) {
    this.setState(dimmensions)
  },
  render() {
    return <div className="yourApp">
      <h1>react-component-resizable Demo</h1>
      <a href="https://github.com/nrako/react-component-resizable">github.com/nrako/react-component-resizable</a>
      <hr/>
      <Resizable
        className="resizable"
        onResize={this.onResize}
      >
        <p>{this.state.width} / {this.state.height}</p>
      </Resizable>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
