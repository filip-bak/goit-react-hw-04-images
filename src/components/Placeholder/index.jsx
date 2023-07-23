import PropTypes from 'prop-types';

import styles from './Placeholder.module.css';

const Placeholder = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.placeholder}>
        <p className={styles.text}>{title}</p>
      </div>
    </div>
  );
};

Placeholder.propTypes = { title: PropTypes.string };

export default Placeholder;
