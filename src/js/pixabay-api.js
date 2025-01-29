import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48410810-6cc12cd8ef8f80f7e97e53d15';

export async function searchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Image search error:', error);
    throw error;
  }
}
