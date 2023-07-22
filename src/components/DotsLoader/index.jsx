import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';

import styles from './DotsLoader.module.css';

class DotsLoader extends Component {
  static propTypes = { loading: PropTypes.bool };

  render() {
    const { loading } = this.props;
    return (
      <div className={styles.container}>
        <PulseLoader color="#3da7db" loading={loading} speedMultiplier={1.5} />
      </div>
    );
  }
}

export default DotsLoader;
