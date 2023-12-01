import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { NavigateBeforeRounded, NavigateNextRounded } from '@material-ui/icons';
import clsx from 'clsx';
import * as dateService from 'shared/date-service';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: 30,
    minWidth: 150,
    cursor: 'pointer',
    border: '1px groove rgba(0, 0, 233, 0.13)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 15, 0.1)',
      boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2)'
    }
  },
  left: {
    justifyContent: 'flex-start'
  },
  right: {
    justifyContent: 'flex-end'
  }
}));

const EntryPaginator = props => {
  const { startDate, setStartDate, endDate, setEndDate, onQuery } = props;

  const onNext = () => {
    const nextStartDate = dateService.addDays(startDate, 7);
    const nextEndDate = dateService.addDays(endDate, 7);
    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
    onQuery(nextStartDate, nextEndDate);
  };

  const onPrevious = () => {
    const previousStartDate = dateService.subtractDays(startDate, 7);
    const previousEndDate = dateService.subtractDays(endDate, 7);
    setStartDate(previousStartDate);
    setEndDate(previousEndDate);
    onQuery(previousStartDate, previousEndDate);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={clsx(classes.button, classes.left)} onClick={() => onPrevious()}>
        <NavigateBeforeRounded />
        Previous week
      </div>
      <div className={clsx(classes.button, classes.right)} onClick={() => onNext()}>
        Next week
        <NavigateNextRounded />
      </div>
    </div>
  );
};

export default EntryPaginator;
