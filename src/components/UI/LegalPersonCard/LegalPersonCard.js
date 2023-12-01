import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Business } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    minWidth:'33,33%'
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const LegalPersonCard = props => {
  const { legalPerson } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar variant="rounded" className={classes.orange}>
        <Business />
      </Avatar>
      <div className={classes.label}>
        <Typography>{legalPerson.legalName}</Typography>
        <Typography>{legalPerson.legalNumber}</Typography>
        <Typography>{legalPerson.businessName}</Typography>
      </div>
    </div>
  );
};

export default LegalPersonCard;
