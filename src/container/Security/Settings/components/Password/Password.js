import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, CardActions, Divider, Button, TextField } from '@material-ui/core';

const Password = props => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Card>
      <form onSubmit={e => props.submit(e, { password: password, confirmPassword: confirmPassword })}>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            id="password"
            name="password"
            label="Password"
            fullWidth
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            fullWidth
            type="password"
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{ marginTop: '1rem' }}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="outlined" disabled={password === '' || confirmPassword === '' || password !== confirmPassword} type="submit">
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string,
  submit: PropTypes.func
};

export default Password;
