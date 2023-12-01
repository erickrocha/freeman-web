import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    width: '100%'
  },
  warning: {
    backgroundColor: '#ffd617'
  }
}));

const FormFooter = props => {
  const { onCancel } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button className={classes.warning} variant="contained" size="large" onClick={() => onCancel()}>
        Cancel
      </Button>
      <Button color="primary" variant="contained" size="large" type="submit">
        Save
      </Button>
    </div>
  );
};

FormFooter.prototype = {
  onCancel: PropTypes.func.isRequired
};

export default FormFooter;
