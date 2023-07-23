import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';

import styles from './DotsLoader.module.css';

const DotsLoader = ({ loading }) => {
  return (
    <div className={styles.container}>
      <PulseLoader color="#3da7db" loading={loading} speedMultiplier={1.5} />
    </div>
  );
};

DotsLoader.propTypes = { loading: PropTypes.bool };

export default DotsLoader;
