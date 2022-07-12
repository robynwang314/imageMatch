import React from 'react'
import PropTypes from 'prop-types'
import api from "../api.js"


const ImageUrlForm = () => {
  const [imageURL, setImageURL] = React.useState("")

  function handleSubmit(e) {
    e.preventDefault()

    if (imageURL.length > 0) {
      let data = { image_url: imageURL }
      return api.search.reverse_image_url(data)

    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Image Url:
      </label>
      <input name="image_url" type="text" onChange={e => { setImageURL(e.target.value) }} />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default ImageUrlForm;