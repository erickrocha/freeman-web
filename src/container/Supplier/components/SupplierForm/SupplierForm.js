import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Card, CardHeader, CardActions, CardContent } from '@material-ui/core';
import { AddressEditor, FormFooter } from 'components';
import { updateObject } from 'shared/utility';
import { useSelector, useDispatch } from 'react-redux';
import * as handler from 'store/events/supplier/index';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as dateService from 'shared/date-service';
import { LegalNumber, PhoneTextField } from 'components/UI';

const SupplierForm = props => {
  const { supplier, onCancel } = props;

  const [legalNumber, setLegalNumber] = useState(supplier.legalNumber || '');
  const [legalName, setLegalName] = useState(supplier.legalName || '');
  const [businessName, setBusinessName] = useState(supplier.businessName || '');
  const [address, setAddress] = useState(supplier.address || '');
  const [email, setEmail] = useState(supplier.email || '');
  const [phone, setPhone] = useState(supplier.phone || '');
  const [website, setWebsite] = useState(supplier.website || '');
  const [contract, setContract] = useState(supplier.contract || {});

  const provinces = useSelector(state => state.app.provinces);

  const dispatcher = useDispatch();

  const submit = event => {
    event.preventDefault();
    const newSupplier = updateObject(supplier, {
      legalNumber: legalNumber,
      legalName: legalName,
      businessName: businessName,
      address: address,
      email: email,
      phone: phone,
      website: website,
      contract: contract
    });
    dispatcher(handler.save(newSupplier));
  };

  const setContractField = (field, value) => {
    setContract(
      updateObject(contract, {
        [field]: value
      })
    );
  };

  const setDateField = (field, value) => {
    if (value) {
      const dateStr = dateService.getDate(value.format(dateService.ISO_DATE));
      setContractField(field, dateStr);
    }
  }

  return (
    <form onSubmit={e => submit(e)} autoComplete="false">
      <Card>
        <CardHeader title="Supplier"></CardHeader>
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
                InputProps={{
                  inputComponent: LegalNumber
                }}
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
                InputProps={{
                  inputComponent: PhoneTextField
                }}
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
          <Card>
            <CardHeader title="Contract information"></CardHeader>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      variant="inline"
                      inputVariant="outlined"
                      format="DD/MM/YYYY"
                      margin="dense"
                      autoOk={true}
                      id="startDate"
                      label="Contract start date"
                      className="date-picker"
                      value={contract.startDate}
                      onChange={date => setDateField('startDate', date)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={3}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      variant="inline"
                      inputVariant="outlined"
                      format="DD/MM/YYYY"
                      margin="dense"
                      autoOk={true}
                      id="endDate"
                      label="Contract end date"
                      className="date-picker"
                      value={contract.endDate}
                      onChange={date => setDateField('endDate', date)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={3}>
                  <TextField
                    fullWidth
                    label="Amount per hour"
                    margin="dense"
                    name="valuePerHourInCents"
                    required
                    value={contract.valuePerHourInCents}
                    onChange={e => setContractField('valuePerHourInCents', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    fullWidth
                    label="Contract number"
                    margin="dense"
                    name="number"
                    required
                    value={contract.number}
                    onChange={e => setContractField('number', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </CardContent>
        <CardActions>
          <FormFooter onCancel={onCancel} />
        </CardActions>
      </Card>
    </form>
  );
};

SupplierForm.prototype = {
  supplier: PropTypes.object
};

export default SupplierForm;
