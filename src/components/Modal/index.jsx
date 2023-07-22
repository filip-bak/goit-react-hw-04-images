import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './Modal.module.css';
import { PuffLoader } from 'react-spinners';

export class Modal extends Component {
  static propTypes = {
    largeImage: PropTypes.string,
    onClickExit: PropTypes.func,
  };
  state = {
    loading: true,
  };

  handleLoad = () => {
    this.setState({ loading: false });
  };

  removeModal = () => {
    const { onClickExit } = this.props;
    document.documentElement.classList.remove('active-modal');
    document.body.style.paddingRight = '';
    onClickExit('', -1);
  };

  handleOverlayClick = e => {
    const { nodeName } = e.target;
    if (nodeName === 'DIV') {
      this.removeModal();
    }
  };

  handleEscapeKeyDown = e => {
    if (e.key === 'Escape') {
      this.removeModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscapeKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKeyDown);
  }

  render() {
    const { loading } = this.state;
    const { largeImage } = this.props;

    return (
      <div className={styles.overlay} onClick={this.handleOverlayClick}>
        <div className={styles.modal}>
          {loading && <PuffLoader color="#3da7db" loading={loading} />}{' '}
          <img
            onKeyDown={this.handleEscapeKey}
            className={styles.img}
            src={largeImage}
            style={loading ? { display: 'none' } : {}}
            alt=""
            onLoad={this.handleLoad}
          />
        </div>
      </div>
    );
  }
}
export default Modal;
