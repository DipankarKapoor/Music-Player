import axios from 'axios';

const API_URL = 'https://cms.samespace.com/items/songs';

export const fetchSongs = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};
