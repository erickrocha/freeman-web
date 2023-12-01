import React from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  Divider,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { blue, green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    paddingRight: theme.spacing(1),
    marginTop: 5,
    minWidth: '20%',
    maxWidth: '20%'
  },
  avatar: {
    backgroundColor: blue[500]
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
})(props => <Checkbox color="default" {...props} />)

const Payment = props => {
  const { payment, selected, onSelect } = props;

  const classes = useStyles();

  const isChecked = selected.find(current => current === payment.id) ? true : false;


  return (
    <div className={classes.root}>
      <Card key={payment.id}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {payment.personName.substring(0, 1)}
            </Avatar>
          }
          action={
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={isChecked}
                  onChange={() => onSelect(payment.id)}
                  name="responsible"
                />
              }
            />
          }
          title={payment.personName}
          subheader={payment.personSocialSecurity}
        />
        <Divider />
        <CardContent>
          {payment.projects.map(projectAmount => {
            return (
              <Grid key={projectAmount.projectId} container>
                <Grid item md={6}>
                  <Typography variant="caption">{projectAmount.projectName}</Typography>
                </Grid>
                <Grid item md={3} container direction="row" alignItems="baseline">
                  <Typography variant="caption">Pending:</Typography>&nbsp;&nbsp;
                  <Typography variant="body2" color="error">{`${projectAmount.amountPendingInHour}h ${projectAmount.amountPendingInMinutes}`}</Typography>
                </Grid>
                <Grid item md={3} container direction="row" alignItems="baseline">
                  <Typography variant="caption">Approved:</Typography>&nbsp;&nbsp;
                  <Typography variant="body2" color="secondary">{`${projectAmount.amountApprovedInHour}h ${projectAmount.amountApprovedInMinutes}`}</Typography>
                </Grid>
              </Grid>
            );
          })}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Invoice
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Payment;
