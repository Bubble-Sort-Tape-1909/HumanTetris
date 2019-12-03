import React from 'react'
const load = require('load-script')


// const SinglePlayerPage = () => {
//   return <div id="game" />
// }

// const SinglePlayerPage = React.createClass({
//   render: function() {
//     return (
//       <div>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width initial-scale=1.0" />
//         <title>Human Tetris</title>
//         <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
//         <div id="app" />
//       </div>
//     );
//   }
// });


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
    // const scriptTag = load("app.js", function (err, script) {
    //   if (err) {
    //     // print useful message
    //   }
    //   else {
    //     console.log(script.src);// Prints 'foo'.js'
    //     // use script
    //     // note that in IE8 and below loading error wouldn't be reported
    //   }
    // })
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

