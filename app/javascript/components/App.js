import React from 'react'
import PropTypes from 'prop-types'
import ImageUrlForm from './form.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {

    return (
      <>
        <div style={{ fontSize: "100px" }}>Hello {this.props.name}!</div>
        <ImageUrlForm />
      </>
    )
  }
}

export default App;