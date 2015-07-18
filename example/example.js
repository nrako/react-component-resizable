var WindowResizable = React.createClass({

  getInitialState: function(){
    return {
      width: 0,
      height: 0
    };
  },

  render: function(){
    var width = this.state.width, height = this.state.height;
    var div = React.createElement('div', {className: 'fill'}, width + 'x' + height);
    return React.createElement(Resizable, {onResize: this.onResize}, div);
  },

  onResize: function(resizeAttributes){
    var width = resizeAttributes.width, 
    height = resizeAttributes.height;

    this.setState({width: width, height: height})
  }

});

document.addEventListener("DOMContentLoaded", function(event) {
    React.render(React.createElement(WindowResizable), document.body);
});