import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { gridView } from 'common/gridview.style';
import { updateObject } from 'shared/utility';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return updateObject(gridView, {
    row: {
      display: 'flex',
      flexDirection: 'row'
    },
    time: {
      display: 'flex',
      justifyContent: 'center'
    },
    title: {
      display: 'flex',
      justifyContent: 'center'
    }
  });
});

const TimeChip = props => {
  const { name, totalPendingInMinutes, totalApprovedInMinutes } = props;

  const classes = useStyles();
  return (
    <div className={classes.row}>
      <div className={classes.col_6}>{name}</div>
      <div className={clsx(classes.col_1, classes.title)}>
        <Typography variant="caption">Pending</Typography>
      </div>
      <div className={clsx(classes.col_1, classes.time)}>
        <span>{`${parseInt(totalPendingInMinutes / 60)}h ${totalPendingInMinutes % 60}m`}</span>
      </div>
      <div className={clsx(classes.col_1, classes.title)}>
        <Typography variant="caption">Approved</Typography>
      </div>
      <div className={clsx(classes.col_1, classes.time)}>
        <span>{`${parseInt(totalApprovedInMinutes / 60)}h ${totalApprovedInMinutes % 60}m`}</span>
      </div>
      <div className={clsx(classes.col_1, classes.title)}>
      <Typography variant="caption">Total</Typography>
      </div>
      <div className={clsx(classes.col_1, classes.time)}>
        <span>
          {`${parseInt((totalPendingInMinutes + totalApprovedInMinutes) / 60)}h ${(totalPendingInMinutes +
            totalApprovedInMinutes) %
            60}m`}
        </span>
      </div>
    </div>
  );
};

export default TimeChip;
