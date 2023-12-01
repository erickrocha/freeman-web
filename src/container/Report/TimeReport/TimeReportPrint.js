import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { TimePage } from './components';

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const TimeReportPrint = () => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <TimePage />
    </div>
  );
};

export default TimeReportPrint;
