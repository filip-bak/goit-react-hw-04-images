import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import styles from './Modal.module.css';
import { PuffLoader } from 'react-spinners';

const Modal = ({ largeImage, onClickExit }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const removeModal = () => {
    document.documentElement.classList.remove('active-modal');
    document.body.style.paddingRight = '';
    onClickExit('', -1);
  };

  const handleOverlayClick = e => {
    const { nodeName } = e.target;
    if (nodeName === 'DIV') {
      removeModal();
    }
  };

  const handleEscapeKey = e => {
    if (e.key === 'Escape') {
      removeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {loading && <PuffLoader color="#3da7db" loading={loading} />}{' '}
        <img
          onKeyDown={handleEscapeKey}
          className={styles.img}
          src={largeImage}
          style={loading ? { display: 'none' } : {}}
          alt=""
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string,
  onClickExit: PropTypes.func,
};

export default Modal;
