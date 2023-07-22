import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';

import styles from './ImageGallery.module.css';
import Modal from 'components/Modal';

export class ImageGallery extends Component {
  static propTypes = { images: PropTypes.arrayOf(PropTypes.object) };

  state = {
    largeImg: '',
    index: -1,
  };

  handleClick = (largeImg, index) => {
    this.setState({
      largeImg,
      index,
    });
  };

  render() {
    // map items from api
    const { images } = this.props;
    const { largeImg } = this.state;
    return (
      <>
        <ul className={styles.container}>
          {images.map(({ id, webformatURL, largeImageURL }, i) => {
            return (
              <ImageGalleryItem
                key={`${id}${i}`}
                src={webformatURL}
                onClick={() => this.handleClick(largeImageURL, i)}
              />
            );
          })}
        </ul>
        {largeImg && (
          <Modal largeImage={largeImg} onClickExit={this.handleClick} />
        )}
      </>
    );
  }
}

export default ImageGallery;
