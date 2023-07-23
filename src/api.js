import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default async function getData({
  searchQuery = '',
  currentPage = 1,
  language = 'en',
  signal,
} = {}) {
  try {
    const params = new URLSearchParams({
      q: searchQuery,
      page: currentPage,
      per_page: 12,
      lang: language,
    });
    const response = await axios.get(
      `?key=${process.env.REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&${params}`,
      { signal }
    );

    return response.data;
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Aborted');
      return;
    }
    if (err.request.status === 400) return;
    console.log(err);
  }
}

export function getTotalPages(totalHits, itemsPerPage) {
  return Math.ceil(totalHits / itemsPerPage);
}
