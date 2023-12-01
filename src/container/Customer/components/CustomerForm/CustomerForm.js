import React, { useState } from 'react';
import { updateObject } from 'shared/utility';
import { Grid, TextField, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { AddressEditor, FormFooter } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import * as handler from 'store/events/customer/index';

const CustomerForm = props => {
  const { customer, onCancel } = props;

  const [legalNumber, setLegalNumber] = useState(customer.legalNumber || '');
  const [legalName, setLegalName] = useState(customer.legalName || '');
  const [businessName, setBusinessName] = useState(customer.businessName || '');
  const [address, setAddress] = useState(customer.address || '');
  const [email, setEmail] = useState(customer.email || '');
  const [phone, setPhone] = useState(customer.phone || '');
  const [website, setWebsite] = useState(customer.website || '');

  const provinces = useSelector(state => state.app.provinces);

  const dispatcher = useDispatch();
  const submit = event => {
    event.preventDefault();
    const newCustomer = updateObject(customer, {
      legalNumber: legalNumber,
      legalName: legalName,
      businessName: businessName,
      address: address,
      email: email,
      phone: phone,
      website: website
    });
    dispatcher(handler.save(newCustomer));
  };

  return (
    <form onSubmit={e => submit(e)} autoComplete="off" noValidate>
      <Card>
        <CardHeader title="Customer"></CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={12} sm={12}>
              <TextField
                fullWidth
                label="Legal Name"
                margin="dense"
                name="legalName"
                required
                value={legalName}
                onChange={e => setLegalName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <TextField
                fullWidth
                label="Legal Number"
                margin="dense"
                name="legalNumber"
                required
                value={legalNumber}
                onChange={e => setLegalNumber(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={8} sm={12}>
              <TextField
                fullWidth
                label="Business Name"
                margin="dense"
                name="businessName"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <TextField
                fullWidth
                label="Phone"
                margin="dense"
                name="phone"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <TextField
                fullWidth
                label="Website"
                margin="dense"
                name="businessName"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <AddressEditor address={address} setAddress={setAddress} provinces={provinces} />
        </CardContent>
        <CardActions>
          <FormFooter onCancel={onCancel} />
        </CardActions>
      </Card>
    </form>
  )
};

export default CustomerForm;
