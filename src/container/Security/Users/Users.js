import React from 'react';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import { makeStyles } from '@material-ui/styles';
import { UserTable } from './components';
import { LinkButton } from 'components/UI';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Users = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BreadCrumb label="User" tree={[{ href: '/', label: 'Home' }]} />
      <LinkButton color="primary" variant="outlined" to="/security/users/new">
        New
      </LinkButton>
      <br />
      <br />
      <UserTable />
    </div>
  );
};

export default Users;
