/**
 * @jsx React.DOM
 */

var React = require('react');

var Resizeable = React.createClass({
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
  },
  componentDidUpdate: function () {
    this.resetTriggers();
  },

  resetTriggers: function () {
    var contract = this.refs.contract.getDOMNode();
    var expandChild = this.refs.expandChild.getDOMNode();
    var expand = this.refs.expandChild.getDOMNode();

    contract.scrollLeft      = contract.scrollWidth;
    contract.scrollTop       = contract.scrollHeight;
    expandChild.style.width  = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft        = expand.scrollWidth;
    expand.scrollTop         = expand.scrollHeight;
  },

  checkTriggers: function () {
    var element = this.refs.resizable.getDOMNode();
    return element.offsetWidth != this.lastWidth || element.offsetHeight != this.lastHeight;
  },

  onScroll: function () {
    if (this.r) this.cancelFrame(this.r);
    this.r = this.requestFrame(function () {
      if (!this.checkTriggers())
        return;

      var el = this.refs.resizable.getDOMNode();

      this.lastWidth = el.offsetWidth;
      this.lastHeight = el.offsetHeight;

      this.props.onResize({
        width: this.lastWidth,
        height: this.lastHeight
      });

    }.bind(this));
  },

  render: function() {

    return this.transferPropsTo(
      React.DOM.div({onScroll: this.onScroll, ref: 'resizable'},
        [
          this.props.children,
          React.DOM.div({className: this.props.triggersClass},
            [
              React.DOM.div({className: this.props.expandClass, ref: 'expand'}, React.DOM.div({ref: 'expandChild'})),
              React.DOM.div({className: this.props.contractClass, ref: 'contract'})
            ]
          ),
          this.props.embedCss ? React.DOM.style({}, '.resize-triggers { visibility: hidden; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }') : null
        ]
      )
    );
  }

});

module.exports = Resizeable;
