import { makeStyles } from '@material-ui/styles';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import React, { useState } from 'react';
import * as dateService from 'shared/date-service';
import { ProjectPage, ProjectReportSearch } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const ProjectReport = props => {
  const classes = useStyles();

  const [params, setParams] = useState({
    startDate: dateService.getFirstDayCurrentMonth(),
    endDate: dateService.getLastDayCurrentMonth()
  });

  return (
    <div className={classes.root}>
      <BreadCrumb label="Project report" tree={[{ href: '/', label: 'Home' }]} />
      <br />
      <br />
      <ProjectReportSearch params={params} setParams={setParams} />
      <br />
      <ProjectPage />
    </div>
  );
};

export default ProjectReport;
