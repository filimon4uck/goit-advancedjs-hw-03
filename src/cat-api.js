import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ovvU1r7uJAtFvIQ1VaTO4vVX5FZyrjVAD3RTXHYZtYDboLu7zDw1lvE8Osa1OrXy';
export function fetchBreeds() {
  return axios({
    method: 'get',
    url: 'https://api.thecatapi.com/v1/breeds',
  }).then(res => {
    if (res.status !== 200) {
      throw new Error(res.statusText || 'Error');
    }
    return res.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios({
    method: 'get',
    url: `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
  }).then(res => {
    if (res.data.length === 0) {
      throw new Error(res.statusText || 'Error');
    }
    return res.data;
  });
}
