import React from 'react';
import PropTypes from 'prop-types';
import './LogoProfile.css';

const LogoProfile = ({ logoSrc, profileSrc, logoClass, profileClass }) => {
  return (
    <div>
      <img src={profileSrc} alt="Profilo" className={profileClass} />
      <img src={logoSrc} alt="Logo" className={logoClass} />
    </div>
  );
};

LogoProfile.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  profileSrc: PropTypes.string.isRequired,
  logoClass: PropTypes.string.isRequired,
  profileClass: PropTypes.string.isRequired,
};

export default LogoProfile;
