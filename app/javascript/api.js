import axios from 'axios'

const search = {
  create: data => {
    return axios({
      url: 'image',
      method: "POST",
      data
    });
  },
  reverse_image_url: data => {
    return axios({
      url: 'search_by_url',
      method: "POST",
      dataType: "json",
      data
    });
  }
}

const api = {
  search
}

export default api