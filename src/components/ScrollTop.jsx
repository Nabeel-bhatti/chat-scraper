import PropTypes from 'prop-types';
import { useEffect } from 'react';

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

export default function ScrollTop({ children }) {
  useEffect(() => {
    window.scrollTo({
      bottom: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return children || null;
}

ScrollTop.propTypes = { children: PropTypes.oneOfType([PropTypes.node, PropTypes.any]) };
