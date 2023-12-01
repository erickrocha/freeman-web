import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import * as dateService from 'shared/date-service';
import { BreadCrumb } from 'components';
import { TimeReportSearch, TimePage } from './components';

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const TimeReport = () => {
  const classes = useStyle();

  const [params, setParams] = useState({
    startDate: dateService.getFirstDayCurrentMonth(),
    endDate: dateService.getLastDayCurrentMonth()
  });

  return (
    <div className={classes.root}>
      <BreadCrumb label="Time report" tree={[{ href: '/', label: 'Home' }]} />
      <br />
      <br />
      <TimeReportSearch params={params} setParams={setParams} />
      <br />
      <TimePage />
    </div>
  );
};

export default TimeReport;
