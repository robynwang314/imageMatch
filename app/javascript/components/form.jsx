import React from 'react'
import PropTypes from 'prop-types'
import api from "../api.js"


const ImageUrlForm = () => {
  const [imageURL, setImageURL] = React.useState("")
  const [websiteURL, setWebsiteURL] = React.useState("")

  function handleSubmit(e) {
    e.preventDefault()

    if (imageURL.length > 0 || websiteURL > 0) {
      let data = { image_url: imageURL, website_url: websiteURL }
      return api.search.reverse_image_url(data)

    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        {"Website Url: "}
      </label>
      <input name="website_url" type="text" onChange={e => { setWebsiteURL(e.target.value) }} />
      <br />
      <br />
      <label>
        {"Image Url: "}
      </label>
      <input name="image_url" type="text" onChange={e => { setImageURL(e.target.value) }} />

      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default ImageUrlForm;