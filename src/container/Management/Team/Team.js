import React from 'react';
import { makeStyles } from '@material-ui/styles';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import { TeamTable } from './components';
import { LinkButton } from 'components/UI';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Team = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BreadCrumb label="Team" tree={[{ href: '/', label: 'Home' }]} />
      <LinkButton color="primary" variant="outlined" to="/management/team/new">
        New
      </LinkButton>
      <br />
      <br />
      <TeamTable  />
    </div>
  );
};

export default Team;
