import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './Button.module.css';

export class Button extends Component {
  static propTypes = { onLoadMore: PropTypes.func };
  handleClick = () => {
    const { onLoadMore } = this.props;
    onLoadMore();
  };
  render() {
    return (
      <button className={styles.btn} onClick={this.handleClick}>
        Load more
      </button>
    );
  }
}

export default Button;
