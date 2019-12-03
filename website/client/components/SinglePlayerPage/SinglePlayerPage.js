import React from 'react'
const load = require('load-script')


export default class SinglePlayerPage extends React.Component {
  constructor(props) {
    super(props);
  }
  scriptTag = load("app.js", function (err, script) {
    if (err) {
      // print useful message
    }
    else {
      console.log(script.src);// Prints 'foo'.js'
      // use script
      // note that in IE8 and below loading error wouldn't be reported
    }
  })

  render() {
    return (
      <div>
        {/* <button onClick = {this.forceUpdate()} >Play Again</button> */}
        <div>
          {this.scriptTag}
        </div>
      </div>
    ) 
  }
}

