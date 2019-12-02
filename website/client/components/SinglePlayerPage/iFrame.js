import React from 'react'

class iFrame extends React.Component {
  render() {
    return (
      <div>
        <iframe
          src={this.props.src}
          height={this.props.height}
          width={this.props.width}
        />
      </div>
    )
  }
}
export default iFrame

{
  /*
PUT THIS IN A RENDER TO VIEW IFRAME:

<Iframe src="http://plnkr.co/" height="500" width="500" /> */
}
