import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, largeSrc, onClick }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleScrollLock = () => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;

    document.documentElement.classList.add('active-modal');
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  };

  const handleClick = () => {
    handleScrollLock();
    onClick();
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <>
      {error ? (
        <li className={styles.placeholder}></li>
      ) : (
        <li
          className={loading ? `${styles.placeholder}` : `${styles.container}`}
        >
          <img
            className={styles.image}
            style={loading ? { visibility: 'hidden' } : {}}
            src={src}
            data-src={largeSrc}
            alt=""
            onLoad={handleLoad}
            onError={handleError}
            onClick={handleClick}
          />
        </li>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  largeSrc: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
