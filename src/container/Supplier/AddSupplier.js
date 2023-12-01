import { makeStyles } from '@material-ui/styles';
import { BreadCrumb } from 'components';
import React from 'react';
import { SupplierForm } from './components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { findOne } from 'shared/utility';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const AddSupplier = props => {
  const { history, match } = props;
  const classes = useStyles();

  const supplierId = match.params.id;
  const data = useSelector(state => state.supplier.data);

  const supplier = findOne(data, supplierId) || {
    address: {
      province: {}
    },
    contract: {}
  };

  const cancel = () => {
    history.goBack();
  };

  const saved = useSelector(state => state.supplier.saved);
  if (!saved) {
    return (
      <div className={classes.root}>
        <BreadCrumb
          label="Add"
          tree={[
            { href: '/', label: 'Home' },
            { href: '/supplier', label: 'Supplier' }
          ]}
        />
        <SupplierForm supplier={supplier} onCancel={cancel} />
      </div>
    );
  } else {
    return <Redirect to="/supplier" />;
  }
};

export default AddSupplier;
