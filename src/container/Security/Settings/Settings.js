import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../../store/events/user/index';

import { Password } from './components';

const useStyles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

const Settings = props => {
  const { classes } = props;

  const submit = (event, data) => {
    event.preventDefault();
    props.onUpdatePassword(data.password, data.confirmPassword);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item md={4} xs={12}>
            <Password submit={submit} />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePassword: (password, confirmPassword) => dispatch(actions.updatePassword(password, confirmPassword))
  };
};

export default withStyles(useStyles)(connect(null, mapDispatchToProps)(Settings));
