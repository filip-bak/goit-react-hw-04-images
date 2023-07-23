import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(searchQuery);
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    setSearchQuery(value);
  };

  return (
    <header className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
