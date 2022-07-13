import React from 'react'
import PropTypes from 'prop-types'
import api from "../api.js"


const ImageUrlForm = () => {
  const [imageURL, setImageURL] = React.useState("")
  const [websiteURL, setWebsiteURL] = React.useState("")
  const [imageFile, setImageFile] = React.useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    // if (websiteURL.length > 0 && imageURL.length > 0) {
    //   let data = { website_url: websiteURL, image_url: imageURL }

    //   return api.search.reverse_image_url(data)
    // }

    if (websiteURL.length > 0 && imageFile) {
      let data = { image_file: imageFile }
      // console.log(imageFile)

      return api.search.create(data)
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
      <input type="file" accept="image/*" multiple={false} onChange={e => setImageFile(e.target.files[0])} />

      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default ImageUrlForm;