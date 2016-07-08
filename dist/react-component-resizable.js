(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var pendingException;
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			try {
				to[keys[i]] = from[keys[i]];
			} catch (err) {
				if (pendingException === undefined) {
					pendingException = err;
				}
			}
		}
	}

	if (pendingException) {
		throw pendingException;
	}

	return to;
};

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var React = global.React || require('react');
var objectAssign = require('object-assign');

var Resizable = React.createClass({

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

  getDefaultProps: function getDefaultProps() {
    return {
      triggersClass: 'resize-triggers',
      expandClass: 'expand-trigger',
      contractClass: 'contract-trigger',
      embedCss: true
    };
  },

  requestFrame: function requestFrame(fn) {
    return (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
      return window.setTimeout(fn, 20);
    })(fn);
  },

  cancelFrame: function cancelFrame(id) {
    return (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout)(id);
  },

  componentDidMount: function componentDidMount() {
    this.resetTriggers();
    this.initialResetTriggersTimeout = setTimeout(this.resetTriggers, 1000);
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.initialResetTriggersTimeout);
  },

  componentDidUpdate: function componentDidUpdate() {
    this.resetTriggers();
  },

  resetTriggers: function resetTriggers() {
    var contract = this.refs.contract;
    var expandChild = this.refs.expandChild;
    var expand = this.refs.expand;

    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
  },

  onScroll: function onScroll() {
    if (this.r) this.cancelFrame(this.r);
    this.r = this.requestFrame(function () {
      var dimensions = this.getDimensions();

      if (this.haveDimensionsChanged(dimensions)) {
        this.lastDimensions = dimensions;
        this.props.onResize(dimensions);
      }
    }.bind(this));
  },

  getDimensions: function getDimensions() {
    var el = this.refs.resizable;
    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  },

  haveDimensionsChanged: function haveDimensionsChanged(dimensions) {
    return dimensions.width != this.lastDimensions.width || dimensions.height != this.lastDimensions.height;
  },

  render: function render() {
    var props = objectAssign({}, this.props, { onScroll: this.onScroll, ref: 'resizable' });
    return React.createElement('div', props, [this.props.children, React.createElement('div', { className: this.props.triggersClass, key: 'trigger' }, [React.createElement('div', { className: this.props.expandClass, ref: 'expand', key: 'expand' }, React.createElement('div', { ref: 'expandChild' })), React.createElement('div', { className: this.props.contractClass, ref: 'contract', key: 'contract' })]), this.props.embedCss ? React.createElement('style', { key: 'embededCss', dangerouslySetInnerHTML: { __html: '.resize-triggers { visibility: hidden; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }' } }) : null]);
  }

});

module.exports = Resizable;
global.Resizable = Resizable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"object-assign":1,"react":"react"}]},{},[2]);
