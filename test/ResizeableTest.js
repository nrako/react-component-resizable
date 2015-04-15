var React = require('react/addons');
var Resizeable = require('../src/component');
var ReactTestUtils = require('react/lib/ReactTestUtils');

describe('Resizeable', function () {

  it('should mount', function () {
    var root = ReactTestUtils.renderIntoDocument(React.createElement(Resizeable, {
      onResize: function () {}
    }));

    root.should.exist;
  });

  it('should clean up timeouts on unmount', function () {
    var clock = sinon.useFakeTimers();
    var container = document.createElement('div');

    React.render(React.createElement(Resizeable, {
      onResize: function () {}
    }), container);

    React.unmountComponentAtNode(container);

    clock.tick(1000);
    clock.restore();
  });
});
