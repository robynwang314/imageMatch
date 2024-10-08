// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import App from "../components/App.js"

// const Hello = props => (
//   <div style={{ fontSize: "100px" }}>Hello {props.name}!</div>
// )

// Hello.defaultProps = {
//   name: 'David'
// }

// Hello.propTypes = {
//   name: PropTypes.string
// }

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App name={"React"} />,
    document.body.appendChild(document.createElement('div')),
  )
})


// // accept a name for example and a domNode where to render
// function renderIt(domNode) {
//   render(<App name={"React"} />, domNode);
// }

// window.renderIt = renderIt;