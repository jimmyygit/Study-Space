import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Paper } from '@mui/material';

const Card = ({ isClickable, roundedFull, onClick, children }) => {
  return (
    <Paper
      elevation={5}
      onClick={onClick}
      className={classNames('rounded-none rounded-tr-xl rounded-bl-xl overflow-hidden h-full', {
        'rounded-xl': roundedFull,
        'cursor-pointer transform hover:-translate-y-1 transition ease-out duration-200': isClickable,
      })}
    >
      {children}
    </Paper>
  );
};

Card.propTypes = {
  isClickable: PropTypes.bool,
  roundedFull: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  isClickable: false,
  onClick: () => null,
  roundedFull: false,
};

export default Card;
