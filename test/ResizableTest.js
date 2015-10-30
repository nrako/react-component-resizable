var React = require('react');
var ReactDOM = require('react-dom');
var Resizable = require('../src/component');
var ReactTestUtils = require('react-addons-test-utils');

describe('Resizable', function () {

  it('should mount', function () {
    var root = ReactTestUtils.renderIntoDocument(React.createElement(Resizable, {
      onResize: function () {}
    }));

    root.should.exist;
  });

  it('should clean up timeouts on unmount', function () {
    var clock = sinon.useFakeTimers();
    var container = document.createElement('div');

    ReactDOM.render(React.createElement(Resizable, {
      onResize: function () {}
    }), container);

    ReactDOM.unmountComponentAtNode(container);

    clock.tick(1000);
    clock.restore();
  });

  it('should have default value for last dimensions when first rendered', function (done) {
    var node = ReactTestUtils.renderIntoDocument(React.createElement(Resizable, {
      onResize: function () {
        done();
      }
    }));
    
    ReactTestUtils.Simulate.scroll(node.refs.resizable);
  });

});
