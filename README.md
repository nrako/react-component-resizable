React Resizable Component
=========================

[![CircleCI](https://circleci.com/gh/nrako/react-component-resizable.svg?style=svg)](https://circleci.com/gh/nrako/react-component-resizable)

A React component to implement cross-browser event based resize detection, without interval polling!.

[DEMO](http://nrako.github.io/react-component-resizable/)

## Usage
```
var Resizable = require('react-component-resizable');
```
```html
<Resizable className="via transferPropsTo" onResize={this.onResize}>
  Content...
</Resizable>
```

`npm install react-component-resizable --save`

## Prop types
```javascript
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
```

### Default style

The component will automatically embed some required style. This can be turned off using the `embedCss={false}` prop.

```css
.resize-triggers {
  visibility: hidden;
}

.resize-triggers, .resize-triggers > div, .contract-trigger:before {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.resize-triggers > div {
  overflow: auto;
}

.contract-trigger:before {
  width: 200%;
  height: 200%;
}

```

## Credits

Many thanks to [Daniel - backalleycoder.com](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/) for this blog post and [scecima and his project javascript-detect-element-resize](https://github.com/sdecima/javascript-detect-element-resize)!

## Licence

MIT

