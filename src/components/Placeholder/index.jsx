import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './Placeholder.module.css';

export class Placeholder extends Component {
  static propTypes = { title: PropTypes.string };

  render() {
    const { title } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          <p className={styles.text}>{title}</p>
        </div>
      </div>
    );
  }
}

export default Placeholder;
