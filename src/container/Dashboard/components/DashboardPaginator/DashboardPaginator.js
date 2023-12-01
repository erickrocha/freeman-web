import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { NavigateBeforeRounded, NavigateNextRounded, Add } from '@material-ui/icons';
import clsx from 'clsx';
import { Fab, Typography } from '@material-ui/core';
import * as dateService from 'shared/date-service';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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

const DashboardPaginator = props => {
  const { startDate, endDate, setStartDate, setEndDate, onOpen, onQuery } = props;
  const classes = useStyles();

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

  const getMonthAndYear = dateStr => {
    const date = dateService.getDate(dateStr);
    return `${date.format('MMMM')} - ${date.year()}`;
  };

  return (
    <div className={classes.root}>
      <div className={clsx(classes.button, classes.left)} onClick={() => onPrevious()}>
        <NavigateBeforeRounded />
        Previous week
      </div>
      <Typography variant="h1">{getMonthAndYear(startDate)}</Typography>

      <Fab color="primary" aria-label="add" onClick={() => onOpen()}>
        <Add />
      </Fab>
      <Typography variant="h1">{getMonthAndYear(endDate)}</Typography>
      <div className={clsx(classes.button, classes.right)} onClick={() => onNext()}>
        Next week
        <NavigateNextRounded />
      </div>
    </div>
  );
};

export default DashboardPaginator;
