import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static propTypes = { src: PropTypes.string, onClick: PropTypes.func };

  state = {
    loaded: false,
    error: false,
  };

  scrollLock = () => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;

    document.documentElement.classList.add('active-modal');
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  };

  handleClick = () => {
    const { onClick } = this.props;

    this.scrollLock();
    onClick();
  };

  handleLoad = () => {
    this.setState({ loaded: true });
  };

  handleError = () => {
    this.setState({ error: true });
  };

  render() {
    const { src, largeSrc } = this.props;
    const { loaded, error } = this.state;
    // onClick
    return (
      <>
        {error ? (
          <li className={styles.placeholder}></li>
        ) : (
          <li
            className={loaded ? `${styles.container}` : `${styles.placeholder}`}
          >
            <img
              className={styles.image}
              style={loaded ? {} : { visibility: 'hidden' }}
              src={src}
              data-src={largeSrc}
              alt=""
              onLoad={this.handleLoad}
              onError={this.handleError}
              onClick={this.handleClick}
            />
          </li>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
