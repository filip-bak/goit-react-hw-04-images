import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ onLoadMore }) => {
  const handleClick = () => {
    onLoadMore();
  };

  return (
    <button className={styles.btn} onClick={handleClick}>
      Load more
    </button>
  );
};

Button.propTypes = { onLoadMore: PropTypes.func };

export default Button;
