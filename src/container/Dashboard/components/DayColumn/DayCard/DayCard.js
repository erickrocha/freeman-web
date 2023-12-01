import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  PauseCircleOutlineRounded,
  PlayCircleOutlineRounded,
  DeleteForeverRounded,
  EditRounded,
  SaveOutlined
} from '@material-ui/icons';
import clsx from 'clsx';
import { ProjectView, Amount, Notes } from './components';
import * as handler from 'store/events/dashboard/index';
import * as events from 'store/events/dashboard/dashboard.events';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: 'fit-content',
    border: '1px solid rgba(0, 0, 0, 0.103)',
    marginBottom: theme.spacing(1)
  },
  PlayPause: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease-out',
    '& div': {
      padding: theme.spacing(1),
      borderRadius: 10,
      margin: theme.spacing(1),
      '&:hover': {
        cursor: 'pointer',
        color: '#ffffff',
        backgroundColor: 'rgb(102, 45, 145)'
      }
    }
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  editable: {
    borderLeft: '5px solid rgb(102, 45, 145)',
    borderTop: '1px solid rgba(0, 0, 0, 0.103)',
    borderRight: '1px solid rgba(0, 0, 0, 0.103)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.103)',
    backgroundColor: 'rgb(201, 181, 216)'
  },
  readOnly: {
    borderLeft: '5px solid rgb(25, 45, 145)',
    borderTop: '1px solid rgba(0, 0, 0, 0.103)',
    borderRight: '1px solid rgba(0, 0, 0, 0.103)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.103)',
    backgroundColor: 'rgb(30, 181, 216)'
  }
}));

const DayCard = props => {
  const { appointment } = props;
  const classes = useStyles();

  const dispatcher = useDispatch();

  const startStopTimer = () => {
    dispatcher(handler.executeStartStopTimer(appointment));
  };

  const edit = () => {
    dispatcher({ type: events.EDIT_APPOINTMENT, appointment: appointment });
  };

  const remove = () => {
    dispatcher(handler.executeRemove(appointment));
  };

  const startStopDelete =
    appointment.status !== 'APPROVED' ? (
      <div className={classes.PlayPause}>
        {appointment.status === 'STARTED' ? (
          <div onClick={() => startStopTimer()}>
            <PauseCircleOutlineRounded />
          </div>
        ) : (
            <div onClick={() => startStopTimer()}>
              <PlayCircleOutlineRounded />
            </div>
          )}
        <div onClick={() => remove()}>
          <DeleteForeverRounded />
        </div>
      </div>
    ) : null;

  const editAndSave =
    appointment.status !== 'APPROVED' ? (
      <div className={classes.PlayPause}>
        <div onClick={() => edit()}>
          <EditRounded />
        </div>
        <div onClick={() => remove()}>
          <SaveOutlined />
        </div>
      </div>
    ) : null;

  return (
    <div className={clsx(classes.root, appointment.status !== 'APPROVED' ? classes.editable : classes.readOnly)}>
      {startStopDelete}
      <div className={classes.info}>
        <ProjectView appointment={appointment} />
        <Amount appointment={appointment} header={false} />
        <Notes appointment={appointment} />
      </div>
      {editAndSave}
    </div>
  );
};

export default DayCard;
