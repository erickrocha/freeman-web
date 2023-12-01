/* eslint-disable react-hooks/exhaustive-deps */
import { Tab, Tabs } from '@material-ui/core';
import { PlusOne, TableChart } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { BreadCrumb } from 'components';
import Wrapper from 'hoc/Wrapper/Wrapper';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as handler from 'store/events/supplier';

import { AddEmployee, EmployeeTable, SupplierHeader } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  add: {
    padding: theme.spacing(1)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}>
      {value === index && <Wrapper p={3}>{children}</Wrapper>}
    </div>
  );
}

const ManageSupplier = props => {
  const { match } = props;
  const classes = useStyles();
  const supplierId = match.params.id;

  const dispatcher = useDispatch();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const get = () => {
    dispatcher(handler.get(supplierId));
  };

  useEffect(() => {
    get();
  }, []);

  const supplier = useSelector(state => state.supplier.supplier);

  return (
    <div className={classes.root}>
      <BreadCrumb
        label="Manage Supplier"
        tree={[
          { href: '/', label: 'Home' },
          { href: '/supplier', label: 'Supplier' }
        ]}
      />
      <SupplierHeader supplier={supplier} />
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example">
        <Tab label="Employees" icon={<TableChart />}></Tab>
        <Tab label="Add Employee" icon={<PlusOne />}></Tab>
      </Tabs>
      <TabPanel value={value} index={0}>
        <EmployeeTable supplier={supplier} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddEmployee supplier={supplier} employee={{ address: { province: {} } }} onCancel={handleChange} />
      </TabPanel>
    </div>
  );
};

export default ManageSupplier;
