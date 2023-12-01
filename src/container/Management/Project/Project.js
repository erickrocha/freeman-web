import React from 'react';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import { makeStyles } from '@material-ui/styles';
import { ProjectTable } from './components';
import { LinkButton } from 'components/UI';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Projects = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BreadCrumb label="Project" tree={[{ href: '/', label: 'Home' }]} />
      <LinkButton color="primary" variant="outlined" to="/management/project/new">
        New
      </LinkButton>
      <br />
      <br />
      <ProjectTable />
    </div>
  );
};


export default Projects;
