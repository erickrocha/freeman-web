import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { red, green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    maxWidth: '15%',
    margin: '0.5%'
  },
  time: {
    fontSize: '1.2em',
    fontWeight: 'bolder'
  },
  approved: {
    color: green[500]
  },
  pending: {
    color: red[500]
  }
}));

const PhaseCard = props => {
  const { phase } = props;

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={12} container alignItems="center">
          <Typography variant="h4" color="textSecondary">
            {phase.phase}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="caption">Pending</Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="caption">Approved</Typography>
        </Grid>
        <Grid item md={6}>
          <div className={clsx(classes.time, classes.pending)}>{`${parseInt(
            phase.amountPendingInMinutes / 60
          )}h ${phase.amountPendingInMinutes % 60}m`}</div>
        </Grid>
        <Grid item md={6}>
          <div className={clsx(classes.time, classes.approved)}>{`${parseInt(
            phase.amountApprovedInMinutes / 60
          )}h ${phase.amountApprovedInMinutes % 60}m`}</div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PhaseCard;
