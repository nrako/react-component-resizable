/**
 * @jsx React.DOM
 */

var React        = require('react');
var objectAssign = require('object-assign');

var Resizeable = React.createClass({

  lastDimensions: {
    width: null,
    height: null
  },

  propTypes: {
    triggersClass: React.PropTypes.string,
    expandClass: React.PropTypes.string,
    contractClass: React.PropTypes.string,
    embedCss: React.PropTypes.bool,
    onResize: React.PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      triggersClass: 'resize-triggers',
      expandClass: 'expand-trigger',
      contractClass: 'contract-trigger',
      embedCss: true
    };
  },

  requestFrame: function (fn) {
    return (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn){ return window.setTimeout(fn, 20); })(fn);
  },

  cancelFrame: function (id) {
    return (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout)(id);
  },

  componentDidMount: function () {
    this.resetTriggers();
    this.initialResetTriggersTimeout = setTimeout(this.resetTriggers, 1000);
  },

  componentWillUnmount: function () {
    clearTimeout(this.initialResetTriggersTimeout);
  },

  componentDidUpdate: function () {
    this.resetTriggers();
  },

  resetTriggers: function () {
    var contract = this.refs.contract.getDOMNode();
    var expandChild = this.refs.expandChild.getDOMNode();
    var expand = this.refs.expand.getDOMNode();

    contract.scrollLeft      = contract.scrollWidth;
    contract.scrollTop       = contract.scrollHeight;
    expandChild.style.width  = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft        = expand.scrollWidth;
    expand.scrollTop         = expand.scrollHeight;
  },

  onScroll: function () {
    if (this.r) this.cancelFrame(this.r);
    this.r = this.requestFrame(function () {
      var dimensions = this.getDimensions();

      if (this.haveDimensionsChanged(dimensions)) {
        this.lastDimensions = dimensions;
        this.props.onResize(dimensions);
      }
    }.bind(this));
  },

  getDimensions: function () {
    var el = this.refs.resizable.getDOMNode();

    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  },

  haveDimensionsChanged: function (dimensions) {
    return dimensions.width != this.lastDimensions.width || dimensions.height != this.lastDimensions.height;
  },

  render: function() {
    var props = objectAssign({}, this.props, {onScroll: this.onScroll, ref: 'resizable'});
    return (
      React.createElement('div', props,
        [
          this.props.children,
          React.createElement('div', {className: this.props.triggersClass, key: 'trigger'},
            [
              React.createElement('div', {className: this.props.expandClass, ref: 'expand', key: 'expand'}, React.createElement('div', {ref: 'expandChild'})),
              React.createElement('div', {className: this.props.contractClass, ref: 'contract', key: 'contract'})
            ]
          ),
          this.props.embedCss ? React.createElement('style', {key: 'embededCss', dangerouslySetInnerHTML: {__html: '.resize-triggers { visibility: hidden; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }'}}) : null
        ]
      )
    );
  }

});

module.exports = Resizeable;
