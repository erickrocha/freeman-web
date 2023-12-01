import MomentUtils from '@date-io/moment';
import { Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles, withStyles } from '@material-ui/styles';
import { AddressEditor } from 'components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as dateService from 'shared/date-service';
import { updateObject } from 'shared/utility';
import * as handler from 'store/events/supplier';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  header: {
    padding: theme.spacing(1)
  },
  body: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1)
  },
  personData: {
    maxWidth: '50%',
    minWidth: '50%'
  },
  address: {
    maxWidth: '50%',
    minWidth: '50%'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1)
  },
  warning: {
    backgroundColor: '#ffd617'
  }
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const EmployeeForm = props => {
  const { supplier, employee, onCancel } = props;
  const classes = useStyles();

  const provinces = useSelector(state => state.app.provinces);
  const dispatcher = useDispatch();

  const [name, setName] = useState(employee.name || '');
  const [socialSecurity, setSocialSecurity] = useState(employee.socialSecurity || '');
  const [birthDate, setBirthDate] = useState(dateService.getAdultAge());
  const [responsible, setResponsible] = useState(employee.responsible);
  const [email, setEmail] = useState(employee.email || '');
  const [phone, setPhone] = useState(employee.phone || '');
  const [address, setAddress] = useState(employee.address || { province: {} });

  const save = event => {
    event.preventDefault();
    const newEmployee = updateObject(employee, {
      name: name,
      socialSecurity: socialSecurity,
      birthDate: birthDate,
      responsible: responsible,
      email: email,
      phone: phone,
      address: address
    });
    dispatcher(handler.addEmployee(supplier.id, newEmployee));
    oncancel(null, 0);
  };

  const cancel = () => {
    onCancel(null, 0);
  };

  return (
    <form className={classes.root} onSubmit={e => save(e)}>
      <Grid container spacing={1}>
        <Grid container item md={6}>
          <Card>
            <CardHeader title="Personal data"></CardHeader>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    margin="dense"
                    name="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <TextField
                    fullWidth
                    label="Social Security"
                    margin="dense"
                    name="socialSecurity"
                    required
                    value={socialSecurity}
                    onChange={e => setSocialSecurity(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={3} sm={6}></Grid>
                <Grid item md={3} sm={6}>
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        checked={responsible}
                        onChange={e => setResponsible(e.target.checked)}
                        name="responsible"
                      />
                    }
                    label="Responsible"
                  />
                </Grid>
                <Grid item md={3} sm={12}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      disableFuture={true}
                      variant="inline"
                      inputVariant="outlined"
                      format="DD/MM/YYYY"
                      margin="dense"
                      autoOk={true}
                      id="birthDate"
                      label="Birth date"
                      className="date-picker"
                      value={birthDate}
                      onChange={date => {
                        const dateStr = dateService.getDate(date.format(dateService.ISO_DATE));
                        setBirthDate(dateStr);
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={3} sm={12}>
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
                <Grid item md={6} sm={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    margin="dense"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container item md={6}>
          <AddressEditor address={address} setAddress={setAddress} provinces={provinces} />
        </Grid>
        <Grid container item md={12} alignItems="center" justify="space-between">
          <Button variant="contained" className={classes.warning} onClick={() => cancel()}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;
