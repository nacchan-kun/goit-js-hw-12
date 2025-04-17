import axios from 'axios';

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

  axios.defaults.baseURL = 'https://pixabay.com/api/';

  return await axios.get('', axiosOptions);
};