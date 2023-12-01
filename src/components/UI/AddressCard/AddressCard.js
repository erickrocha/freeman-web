import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    minWidth:'33,33%'
  },
  blueGrey: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
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

const AddressCard = props => {
  const { address } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar variant="rounded" className={classes.blueGrey}>
        <LocationOn  />
      </Avatar>
      <div className={classes.label}>
        <Typography>{`${address.street} - ${address.number}`}</Typography>
        <Typography>{`${address.complement || ''} ${address.zipCode || ''}`}</Typography>
        <Typography>{`${address.neighborhood || ''} - ${address.city || ''} - ${
          address.province ? address.province.acronym : ''
        }`}</Typography>
      </div>
    </div>
  );
};

export default AddressCard;
