import React, { useState } from 'react';
import './Account.scss';
import * as service from 'store/events/application/index';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Grid, TextField, Button, Card, CardHeader, CardContent } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as DateService from '../../../shared/date-service';
import { ImageUpload, AddressEditor } from 'components';
import ErrorViewer from 'components/UI/ErrorViewer/ErrorViewer';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import Alert from '@material-ui/lab/Alert';
import { updateObject } from 'shared/utility';

const Account = () => {
  const provinces = useSelector(state => state.app.provinces);
  const person = useSelector(state => state.app.person);
  const success = useSelector(state => state.app.success);
  const error = useSelector(state => state.user.error);

  const [name, setName] = useState(person.name || '');
  const [socialSecurity, setSocialSecurity] = useState(person.socialSecurity || '');
  const [birthDate, setBirthDate] = useState(person.birthDate || DateService.subtractYears(DateService.getToday(), 18));
  const [avatarBase64, setAvatarBase64] = useState(person.avatarBase64);
  const [address, setAddress] = useState(person.address || '');
  const [phone, setPhone] = useState(person.phone || '');
  const [email, setEmail] = useState(person.email || '');


  const dispatcher = useDispatch();
  const onSubmit = event => {
    event.preventDefault();
    const newPerson = updateObject(person, {
      id: person.id,
      registerDate: person.registerDate,
      name: name,
      socialSecurity: socialSecurity,
      birthDate: birthDate,
      avatarBase64: avatarBase64,
      address: address,
      phone: phone,
      email: email
    })
    dispatcher(service.savePerson(person.id, newPerson))
  };

  const feedback = success ? (
    <Alert variant="filled" severity="success">
      Account updated successfully!
    </Alert>
  ) : null;

  return (
    <div className="Account">
      <BreadCrumb label="Account" tree={[{ href: '/', label: 'Home' }]} />
      <ErrorViewer error={error} />
      {feedback}
      <br />
      <form className="Account-Body" onSubmit={e => onSubmit(e)}>
        <div className="Account-box">
          <div className="Account-Profile">
            <Typography gutterBottom variant="h2">
              {person.name}
            </Typography>
            <ImageUpload
              mimeType={['png', 'jpg', 'jpeg']}
              maxSize={307200}
              base64Image={avatarBase64}
              setImage={setAvatarBase64}
            />
          </div>
          <Card>
            <CardHeader title="Personal data" />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12}>
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
                <Grid item md={4}>
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
                        const dateStr = DateService.getDate(date.format(DateService.ISO_DATE));
                        setBirthDate(dateStr);
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={8}>
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
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    margin="dense"
                    name="email"
                    disabled
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6}>
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
              </Grid>
            </CardContent>
          </Card>
          <AddressEditor address={address} provinces={provinces} setAddress={setAddress} />
        </div>
        <div className="Account-Actions">
          <Button color="primary" variant="contained" type="submit" size="large">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};



export default Account;
