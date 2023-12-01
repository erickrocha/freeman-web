import React from 'react';
import { makeStyles } from '@material-ui/styles';
import * as dateService from 'shared/date-service';
import DayCard from './DayCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minWidth: '14%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    border: '1px solid rgba(0, 0, 0, 0.103)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 255, 0.1)'
    }
  },
  body: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    border: '1px solid rgba(0, 0, 0, 0.103)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%'
  }
}));

const DayColumn = props => {
  const { day } = props;
  const classes = useStyles();

  let amountHours = 0;
  let amountMinutes = 0;

  let active = 0;
  day.appointments.forEach(el => {
    amountMinutes = amountMinutes + dateService.getMinutes(el.begin, el.end);
    if (el.status === 'STARTED') {
      active = ++active;
    }
  });

  if (amountMinutes >= 60) {
    amountHours = amountHours + Math.floor(amountMinutes / 60);
    amountMinutes = Math.round(amountMinutes % 60);
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span>{`${day.dayOfWeek} - ${day.dayOfMonth}`}</span>
        <span>{`${amountHours}h - ${amountMinutes}m`}</span>
      </div>
      <div className={classes.body}>
        {day.appointments.map(appointment => (
          <DayCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

export default DayColumn;
