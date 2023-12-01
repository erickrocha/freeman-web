import React from 'react';
import { EmptyRows } from 'components/UI';
import { makeStyles } from '@material-ui/styles';
import { body } from 'common/table.style';
import clsx from 'clsx';
import { updateObject } from 'shared/utility';
import { Checkbox, Fab } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';

const useStyles = makeStyles(
  updateObject(body, {
    row: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '0.8em',
      minHeight: 50,
      maxHeight: 50,
      '& div': {
        maxWidth: '15.00%',
        minWidth: '15.00%',
        padding: '0.5%'
      },
      '& span': {
        maxWidth: '5%',
        minWidth: '5%',
        paddingLeft: 10
      }
    },
    saved: {
      borderLeft: '5px solid rgb(25, 45, 145)',
      borderTop: '1px solid rgba(0, 0, 0, 0.103)',
      borderRight: '1px solid rgba(0, 0, 0, 0.103)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.103)',
      backgroundColor: 'rgb(201, 181, 216)'
    },
    approved: {
      borderLeft: '5px solid rgb(25, 45, 145)',
      borderTop: '1px solid rgba(0, 0, 0, 0.103)',
      borderRight: '1px solid rgba(0, 0, 0, 0.103)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.103)',
      backgroundColor: 'rgb(30, 181, 216)'
    }
  })
);

const EntryBody = props => {
  const { data, pageSize, onCheck } = props;

  const classes = useStyles();
  const rows = data
    ? data.map(item => {
        const style = item.status === 'SAVED' ? classes.saved : classes.approved;
        const project = item.project;
        return (
          <div key={item.id} className={clsx(classes.row, style)}>
            <span>
              <Checkbox checked={item.selected} onChange={() => onCheck(item.id)} color="primary" />
            </span>
            <div>{item.userName}</div>
            <div>{item.date}</div>
            <div>{project.name}</div>
            <div>{project.phases.join('|')}</div>
            <div>{item.time}</div>
            <div>{item.notes}</div>
            <span className="Button-column">
              <Fab size="small" color="primary" disabled={!item.selected}>
                <ThumbUp />
              </Fab>
            </span>
          </div>
        );
      })
    : null;

  return (
    <div className={classes.root}>
      {rows}
      <EmptyRows pageSize={pageSize} totalItems={data.length} />
    </div>
  );
};

export default EntryBody;
