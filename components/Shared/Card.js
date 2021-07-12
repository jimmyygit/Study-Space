import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';

const Card = ({ isClickable, children }) => {
  return (
    <Paper
      elevation={5}
      className={`rounded-xl overflow-hidden h-full ${
        isClickable &&
        'rounded-xl overflow-hidden cursor-pointer transform hover:scale-110 transition ease-out duration-200'
      }`}>
      {children}
    </Paper>
  );
};

Card.propTypes = {
  isClickable: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Card;
