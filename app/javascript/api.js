import axios from 'axios'

const search = {
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