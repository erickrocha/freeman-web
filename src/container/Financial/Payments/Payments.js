import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import * as handler from 'store/events/financial/payment/index';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import PaymentSearch from './components/PaymentSearch';
import { Payment } from './components';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: 5
  },
  actions: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between'
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
}));

const Payments = () => {

  const dispatcher = useDispatch();
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const onSelect = id => {
    if (selected.includes(id)) {
      setSelected(selected.filter(current => current !== id))
    } else {
      setSelected(selected.concat(id));
    }
  }

  const onSelectAll = payments => {
    const allIds = payments.map(pay => pay.id);
    if (allIds.length === selected.length) {
      setSelected([])
    } else {
      setSelected(allIds);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    dispatcher(handler.invoices(selected));
  }

  const onGet = (params) => {
    dispatcher(handler.query(params));
  }

  const classes = useStyles();
  const payments = useSelector(state => state.payment.payments);

  return (
    <div className={classes.root}>
      <BreadCrumb label="Payments" tree={[{ href: '/', label: 'Home' }]} />
      <PaymentSearch onGet={onGet} />
      <br />
      <br />
      <div className={classes.actions}>
        <Button variant="outlined" color="primary" onClick={() => onSelectAll(payments)} >
          Select all
        </Button>
        <Button variant="outlined" color="primary" disabled={selected.length < 1} onClick={() => handleClickOpen()} >
          Request to submit invoice
        </Button>
      </div>
      <div className={classes.body}>
        {payments.map(payment => {
          return <Payment key={payment.id} payment={payment} selected={selected} onSelect={onSelect} />;
        })}
      </div>
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Approve to request invoices?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Clicking in Agree all users will be noticed to send the invoice!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Payments;
