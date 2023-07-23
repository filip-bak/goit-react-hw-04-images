import { useEffect, useState } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import getData, { getTotalPages } from 'api';
import DotsLoader from './DotsLoader';
import Placeholder from './Placeholder';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [language, setLanguage] = useState('en')

  useEffect(() => {
    async function fetchData() {
      try {
        if (searchQuery !== null) {
          setIsLoading(true);
          const data = await getData({
            searchQuery,
            currentPage,
          });

          // First SearchQuery change
          if (typeof searchQuery === 'string' && currentPage === 1) {
            setImages(data.hits);
            setTotalPages(getTotalPages(data.totalHits, 12));
            window.scrollTo(0, 0);
            return;
          }

          // On load more pictures
          if (currentPage > 1) {
            setImages(state => [...state, ...data.hits]);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchQuery, currentPage]);

  const handleSubmit = query => {
    if (searchQuery === query) {
      return;
    }
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setCurrentPage(state => state + 1);
  };

  const ifShowButton = () => {
    const noMoreImages = totalPages === currentPage;

    if (images.length < 12 || noMoreImages) {
      return false;
    } else if (searchQuery !== null) {
      return true;
    }
  };

  const ifNoImagesFound =
    images.length === 0 &&
    currentPage === 1 &&
    totalPages === 0 &&
    searchQuery !== '';

  return (
    <div className="wrapper">
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />

      {isLoading ? (
        <DotsLoader loading={isLoading} />
      ) : (
        <>
          {ifNoImagesFound && <Placeholder title="Sorry, no images found" />}
          {ifShowButton() && <Button onLoadMore={handleLoadMore} />}
        </>
      )}
    </div>
  );
};
