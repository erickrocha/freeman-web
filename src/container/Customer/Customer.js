import React from 'react';
import { makeStyles } from '@material-ui/styles';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import { CustomerTable } from './components';
import { LinkButton } from 'components/UI';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Customer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BreadCrumb label="Customer" tree={[{ href: '/', label: 'Home' }]} />
      <LinkButton color="primary" variant="outlined" to="/customer/new">
        New
      </LinkButton>
      <br />
      <br />
      <CustomerTable />
    </div>
  );
};

export default Customer;
