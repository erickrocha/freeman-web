import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { SelectAll, CheckCircleOutline } from '@material-ui/icons';
import EntryCell from './EntryCell';
import * as events from 'store/events/management/entry/entry.events';
import * as handler from 'store/events/management/entry/entry.handler';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  userEntry: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minWidth: '14.28%',
    maxWidth: '14.28%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2)
  }
}));

const EntryBody = props => {
  const { userEntry, startDate, endDate } = props;
  const classes = useStyles();

  const dispatch = useDispatch();

  const hasSelected = useSelector(state => state.entry.hasSelected);

  const selectByDate = (userId, date) => {
    dispatch({ type: events.CHECK_BY_DATE, userId: userId, date: date });
  };

  const approve = (startDate, endDate, userEntry) => {
    dispatch(handler.approve(startDate, endDate, userEntry));
  };

  return (
    <div className={classes.root}>
      <div className={classes.actions}>
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          startIcon={<SelectAll />}
          onClick={() => dispatch({ type: events.CHECK_BY_USER, userId: userEntry.userId })}>
          Select all
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          disabled={!hasSelected}
          size="medium"
          startIcon={<CheckCircleOutline />}
          onClick={() => approve(startDate, endDate, userEntry)}>
          Approve
        </Button>
      </div>
      <div className={classes.userEntry}>
        {userEntry.days.map(day => (
          <div key={`day-card-${day.date}`} className={classes.card}>
            <Button
              variant="outlined"
              key={day.date}
              size="small"
              onClick={() => selectByDate(userEntry.userId, day.date)}>{`Select ${day.date}`}</Button>
            <div className={classes.header}>{`${day.dayOfWeek} - ${day.dayOfMonth}`}</div>
            <EntryCell entries={day.entries} userId={userEntry.userId} date={day.date} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryBody;
