import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    height: '90%'
  }
}));

const Print = props => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
};

export default Print;
