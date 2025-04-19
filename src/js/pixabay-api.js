

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotos = async (
  searchedQuery,
  searchedPage,
  searchedPerPage
) => {
  const axiosOptions = {
    params: {
      key: '48435380-ac618ab0bf8356a94370146f1',
      q: searchedQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: searchedPage,
      per_page: searchedPerPage,
    },
  };

  const response = await axios.get('', axiosOptions);
  return response.data; // ✅ only return the data object
};