import React from 'react';
import { Grid, TextField, Fab } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const UserSearch = props => {
  const { profiles, name, setName, email,setEmail,profile,setProfile, onQuery } = props;


  return (
    <Grid container spacing={3}>
      <Grid item md={4}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          margin="dense"
          name="name"
          variant="outlined"
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          fullWidth
          label="Email / Username"
          value={email}
          onChange={e => 
            setEmail(e.target.value)}
          margin="dense"
          name="email"
          variant="outlined"
        />
      </Grid>
      <Grid item md={3}>
        <TextField
          fullWidth
          label="Profile"
          margin="dense"
          name="profile"
          value={profile}
          select
          // eslint-disable-next-line react/jsx-sort-props
          SelectProps={{ native: true }}
          variant="outlined"
          onChange={e => setProfile(e.target.value)}>
          <option key="empty" value=""></option>
          {profiles.map(profile => (
            <option key={profile.value} value={profile.value}>
              {profile.label}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item md={1} xs={12} container direction="row" justify="flex-end" alignItems="center">
        <Fab color="primary" aria-label="add" onClick={() => onQuery()} size="medium">
          <SearchIcon />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default UserSearch;
