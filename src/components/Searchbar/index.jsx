import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { searchQuery } = this.state;

    onSubmit(searchQuery);
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.btn}>
            <span className={styles['btn-label']}></span>
          </button>

          <input
            className={styles.input}
            type="text"
            name="searchQuery"
            value={searchQuery}
            autoComplete="off"
            autoFocus
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
