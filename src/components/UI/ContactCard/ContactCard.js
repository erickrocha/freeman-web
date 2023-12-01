import { Avatar, Typography } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { Contacts } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

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
    height: theme.spacing(8)
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const ContactCard = props => {
  const { contact } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Avatar variant="rounded" className={classes.blueGrey}>
          <Contacts />
        </Avatar>
      <div className={classes.label}>
        <Typography>{contact.phone}</Typography>
        <Typography>{contact.email}</Typography>
        <Typography>{contact.website}</Typography>
      </div>
    </div>
  );
};

export default ContactCard;
