import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import { DashboardSearch } from './components';
import { useSelector } from 'react-redux';
import ProjectCard from './components/ProjectCard/ProjectCard';
import * as dateService from 'shared/date-service';

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Dashboard = props => {
  const classes = useStyle();

  const [params, setParams] = useState({
    startDate: dateService.getFirstDayCurrentMonth(),
    endDate: dateService.getLastDayCurrentMonth()
  });

  const projects = useSelector(state => state.management.projects);

  return (
    <div className={classes.root}>
      <BreadCrumb label="Project manager dashboard" tree={[{ href: '/', label: 'Home' }]} />
      <br />
      <br />
      <DashboardSearch params={params} setParams={setParams} />
      <div>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} startDate={params.startDate} endDate={params.endDate} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
