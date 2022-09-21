import React from 'react'
import PropTypes from 'prop-types'
import api from "../api.js"
import { serialize } from 'object-to-formdata';

async function handleGenerateImageFile(storedImage) {
  let data = { stored_image: storedImage.host_url }
  return await api.search.create_image_file(data)
}

const ImageUrlForm = () => {
  const [imageURL, setImageURL] = React.useState("")
  const [websiteURL, setWebsiteURL] = React.useState("")
  const [imageFile, setImageFile] = React.useState(null)
  const [storedImage, setStoredImage] = React.useState("")

  React.useEffect(() => {
    if (storedImage) {
      handleGenerateImageFile(storedImage)
    }

    return () => storedImage
  }, [storedImage])

  async function handleSubmit(e) {
    e.preventDefault()

    // if (websiteURL.length > 0 && imageURL.length > 0) {
    //   let data = { website_url: websiteURL, image_url: imageURL }

    //   return api.search.reverse_image_url(data)
    // }

    if (websiteURL.length > 0 && imageFile) {
      let image = { image_file: imageFile }
      console.log(imageFile)

      const { data } = await api.search.create(serialize(image))
      setStoredImage(data.image)
    }
  }

  return (
    <>
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

      {storedImage && <img src={storedImage?.host_url} alt="image" />}
    </>
  )
}

export default ImageUrlForm;
