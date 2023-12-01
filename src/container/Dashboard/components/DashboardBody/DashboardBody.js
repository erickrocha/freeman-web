import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DayColumn from '../DayColumn';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    height: '90%'
  }
}));

const DashboardBody = props => {
  const { days } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {days.map(day => (
        <DayColumn key={day.date} day={day} />
      ))}
    </div>
  );
};

export default DashboardBody;
