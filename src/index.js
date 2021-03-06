import { PropTypes } from 'prop-types'
import React, { PureComponent } from 'react'

class ComponentResizableComponent extends PureComponent {

  lastDimensions = {
    width: null,
    height: null
  }

  static propTypes = {
    triggersClass: PropTypes.string,
    expandClass  : PropTypes.string,
    contractClass: PropTypes.string,
    embedCss     : PropTypes.bool,
    onResize     : PropTypes.func.isRequired
  }

  static defaultProps = {
      triggersClass: 'resize-triggers',
      expandClass: 'expand-trigger',
      contractClass: 'contract-trigger',
      embedCss: true
  }

  requestFrame = fn =>
    (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn){ return window.setTimeout(fn, 20) })(fn)

  cancelFrame = id =>
    (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout)(id)

  componentDidMount() {
    this.resetTriggers()
    this.initialResetTriggersTimeout = setTimeout(this.resetTriggers, 1000)
  }

  componentWillUnmount () {
    clearTimeout(this.initialResetTriggersTimeout)

    // Cancel pending animation frame rqeuest if one exists when we're
    // unmounting. If we don't, then the frame callback may be called after
    // `this.refs.resizable` has been removed from the dom, causing an error.
    // @see https://github.com/nrako/react-component-resizable/issues/17
    if (this.r) this.cancelFrame(this.r);
  }

  componentDidUpdate () {
    this.resetTriggers()
  }

  resetTriggers = () => {
    var contract = this.refs.contract
    var expandChild = this.refs.expandChild
    var expand = this.refs.expand

    contract.scrollLeft      = contract.scrollWidth
    contract.scrollTop       = contract.scrollHeight
    expandChild.style.width  = expand.offsetWidth + 1 + 'px'
    expandChild.style.height = expand.offsetHeight + 1 + 'px'
    expand.scrollLeft        = expand.scrollWidth
    expand.scrollTop         = expand.scrollHeight
  }

  onScroll = () => {
    if (this.r) this.cancelFrame(this.r)
    this.r = this.requestFrame(function () {
      var dimensions = this.getDimensions()

      if (this.haveDimensionsChanged(dimensions)) {
        this.lastDimensions = dimensions
        this.props.onResize(dimensions)
      }
    }.bind(this))
  }

  getDimensions = () => {
    var el = this.refs.resizable
    return {
      width: el.offsetWidth,
      height: el.offsetHeight,
    }
  }

  haveDimensionsChanged = dimensions =>
    dimensions.width != this.lastDimensions.width || dimensions.height != this.lastDimensions.height


  render() {
    const {triggersClass, expandClass, contractClass, embedCss, onResize, ...rest} = this.props
    var props = { ...rest, onScroll: this.onScroll, ref: 'resizable' }
    return (
      React.createElement('div', props, [
        this.props.children,
        React.createElement('div', {className: triggersClass, key: 'trigger'},
          [
            React.createElement('div', {className: expandClass, ref: 'expand', key: 'expand'}, React.createElement('div', {ref: 'expandChild'})),
            React.createElement('div', {className: contractClass, ref: 'contract', key: 'contract'})
          ]
        ),
        embedCss ? React.createElement('style', {
          key: 'embededCss',
          dangerouslySetInnerHTML: {
            __html: '.resize-triggers { visibility: hidden; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }'
          }
        }) : null
      ])
    )
  }
}

export default ComponentResizableComponent
