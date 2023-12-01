import { makeStyles } from '@material-ui/styles';
import React from 'react';
import EmployeeForm from '../EmployeeForm';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const useStyles = makeStyles(() => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.103)',
    borderRadius: '5px'
  },
  title: {
    backgroundColor: 'rgba(0, 0, 0, 0.103)'
  }
}));

const AddEmployee = props => {
  const { supplier, onCancel } = props;
  const classes = useStyles();

  const saved = useSelector(state => state.supplier.saved);
  if (!saved) {
    return (
      <Card className={classes.root}>
        <CardHeader className={classes.title} title="Employee"></CardHeader>
        <CardContent>
          <EmployeeForm supplier={supplier} employee={{ address: { province: {} } }} onCancel={onCancel} />
        </CardContent>
      </Card>
    );
  } else {
    return <Redirect to={`/supplier/manage/${supplier.id}`} />;
  }
};

export default AddEmployee;
