import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Wrapper from 'hoc/Wrapper/Wrapper';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import * as events from 'store/events/management/entry/entry.events';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: theme.spacing(1),
    cursor: 'pointer',
    minHeight: '100%',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 15, 0.1)',
      boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2)'
    }
  },
  project: {
    fontSize: '0.8em',
    padding: theme.spacing(1)
  },
  phase: {
    fontSize: '0.8em',
    padding: theme.spacing(1),
    color: 'grey'
  },
  time: {
    fontSize: '1em',
    padding: theme.spacing(1),
    fontWeight: 700
  },
  notes: {
    fontSize: '0.8em',
    padding: theme.spacing(1)
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2)'
  },
  approved: {
    borderLeft: '5px solid rgb(25, 45, 145)',
    borderTop: '1px solid rgba(0, 0, 0, 0.103)',
    borderRight: '1px solid rgba(0, 0, 0, 0.103)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.103)',
    backgroundColor: 'rgb(30, 181, 216)'
  }
}));

const EntryCell = props => {
  const { entries, userId, date } = props;

  const dispatch = useDispatch();

  const selectOne = (userId, date, entryId) => {
    dispatch({ type: events.CHECK_BY_ID, userId: userId, date: date, entryId: entryId });
  };
  const classes = useStyle();
  return (
    <Wrapper>
      {entries.map(entry => {
        return (
          <div
            key={`entry-${entry.id}`}
            className={clsx(
              classes.root,
              entry.status === 'APPROVED' ? classes.approved : null,
              entry.selected ? classes.selected : null
            )}
            onClick={() => selectOne(userId, date, entry.id)}>
            <div className={classes.project}>{`${entry.project.name}`}</div>
            <div className={classes.phase}>{`${entry.project.phases.join('|')}`}</div>
            <div className={classes.time}>{`${entry.hour}h - ${entry.minute}m`}</div>
            <div className={classes.notes}>{`${entry.notes}`}</div>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default EntryCell;
