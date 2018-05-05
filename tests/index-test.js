import expect from 'expect'
import sinon from 'sinon'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import Resizable from 'src/'

describe('Resizable', function () {
  it('should mount', function () {
    var root = ReactTestUtils.renderIntoDocument(React.createElement(Resizable, {
      onResize: function () {}
    }))

    expect(root).toExist()
  })

  it('should call onResize when resized', function (done) {
    var container = document.createElement('div')
    document.body.appendChild(container)
    var handleResize = sinon.spy()
    var component = ReactDOM.render(React.createElement(Resizable, {
      onResize: function() {
        handleResize()

        component.refs.resizable.style.width = '700px'
        ReactTestUtils.Simulate.scroll(component.refs.resizable)
        if (handleResize.callCount == 2) done()
      }
    }), container)

    component.refs.resizable.style.width = '400px'
    ReactTestUtils.Simulate.scroll(component.refs.resizable)
  })

  it('should clean up timeouts on unmount', function () {
    var clock = sinon.useFakeTimers()
    clock.clearTimeout = sinon.spy()
    var container = document.createElement('div')

    var component = ReactDOM.render(React.createElement(Resizable, {
      onResize: function () {}
    }), container)

    expect(component.initialResetTriggersTimeout).toNotBe(null)

    ReactDOM.unmountComponentAtNode(container)

    expect(clock.clearTimeout.called).toBe(true)
  })

})
