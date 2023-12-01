import React from 'react';
import { SupplierTable } from './components';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import { makeStyles } from '@material-ui/styles';
import { LinkButton } from 'components/UI';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Suppliers = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BreadCrumb label="Supplier" tree={[{ href: '/', label: 'Home' }]} />
      <LinkButton color="primary" variant="outlined" to="/supplier/new">
        New
      </LinkButton>
      <br />
      <br />
      <SupplierTable />
    </div>
  );
};

export default Suppliers;
