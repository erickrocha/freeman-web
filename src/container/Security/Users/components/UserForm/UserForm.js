import React, { useState } from 'react';
import { TextField, Card, CardHeader, CardContent, Grid, CardActions } from '@material-ui/core';
import { FormFooter } from 'components';
import { updateObject } from 'shared/utility';
import * as service from 'store/events/user/index';
import { useSelector, useDispatch } from 'react-redux';

const UserForm = props => {
  const { user, onCancel } = props;

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [profile, setProfile] = useState(user.profile || '');

  const profiles = useSelector(state => state.app.profiles);

  const dispatcher = useDispatch();

  const submit = e => {
    e.preventDefault();
    const newUser = updateObject(user, {
      name: name,
      profile: profile,
      email: email
    })
    dispatcher(service.save(newUser));
  };

  return (
    <form autoComplete="off" noValidate onSubmit={e => submit(e)}>
      <Card>
        <CardHeader title="User" />
        <CardContent>
          <Grid container spacing={2}>
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
            <Grid item md={12}>
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                label="Select the Profile"
                margin="dense"
                name="profile"
                required
                select
                value={profile}
                onChange={e => setProfile(e.target.value)}
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                variant="outlined">
                <option key="Empty" value="Empty">Select a profile</option>
                {profiles.map(profile => (
                  <option key={profile.value} value={profile.value}>
                    {profile.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <FormFooter onCancel={onCancel} />
        </CardActions>
      </Card>

    </form>
  );
};

export default UserForm;
