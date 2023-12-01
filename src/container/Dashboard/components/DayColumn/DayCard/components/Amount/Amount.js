import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  circle: {
    borderRadius: '50%',
    width: 10,
    height: 10
  },
  active: {
    backgroundColor: green[500]
  },
  inactive: {
    border: '1px solid green',
    backgroundColor: 'rgb(201, 181, 216)'
  },
  value: {
    fontSize: '1.2em'
  },
  header: {
    fontSize: '1.0em'
  }
}));

const Amount = props => {
  const { appointment, header } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={clsx(classes.circle, appointment.status === 'STARTED' ? classes.active : classes.inactive)}></div>
      <span className={header ? classes.header : classes.value}>{`${parseInt(
        appointment.amountInMinutes / 60
      )}h ${appointment.amountInMinutes % 60}m`}</span>
    </div>
  );
};

export default Amount;
