import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
    fontSize: '0.9em'
  }
}));

const Notes = props => {
  const { appointment } = props;

  const classes = useStyles();
  return <div className={classes.root}>{appointment.notes ? appointment.notes : ' '}</div>;
};

export default Notes;
