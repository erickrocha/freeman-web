import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { defaultStyle } from 'common/form.style';
import { updateObject, findOne } from 'shared/utility';
import {
  AddCircleOutlineRounded,
  PlayCircleOutlineRounded,
  EditRounded,
  SaveOutlined,
  Close
} from '@material-ui/icons';
import { Grid, Select, MenuItem, FormHelperText, TextField, Button, Fab } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as dateService from 'shared/date-service';
import * as handler from 'store/events/dashboard/index';

const useStyles = makeStyles(theme => {
  const base = defaultStyle(theme);
  return updateObject(base, {
    full: {
      width: '100%'
    },
    button: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      '& button': {
        minWidth: '49%',
        height: 50,
        backgroundColor: '#455272',
        color: '#ffffff',
        border: '1px solid #ffffff',
        cursor: 'pointer'
      }
    }
  });
});

const Appointment = props => {
  const { appointment, onCancel } = props;
  const projects = useSelector(state => state.app.myProjects);
  const user = useSelector(state => state.app.user);
  const classes = useStyles();

  const [projectId, setProjectId] = useState('');
  const [phase, setPhase] = useState('');
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [date, setDate] = useState(dateService.getToday());
  const [notes, setNotes] = useState('');

  const dispatcher = useDispatch();

  const buildEntry = () => {
    const project = findOne(projects, projectId);
    const entry = updateObject(appointment, {
      date: date.format(dateService.ISO_DATE),
      hour: hour,
      minute: minute,
      notes: notes,
      userId: user.id,
      project: updateObject(project, {
        phases: [phase]
      })
    });
    return entry;
  };

  const startTimer = () => {
    const entry = buildEntry();
    dispatcher(handler.executeStartStopTimer(entry));
  };

  const updateTimer = () => {
    const entry = buildEntry();
    dispatcher(handler.executeUpdate(entry));
  };

  const addAppointment = () => {
    const entry = buildEntry();
    dispatcher(handler.executeAddAppointment(entry));
  };

  const project = findOne(projects, projectId);

  const phases = project ? project.phases : [];

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <AddCircleOutlineRounded fontSize="large" />
          <h2>Appointment</h2>
        </div>
        <Fab color="secondary" aria-label="close" size="small" onClick={() => onCancel()}>
          <Close />
        </Fab>
      </div>
      <div className={classes.body}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Select
              id="project-drop-down"
              label="Project"
              autoWidth={true}
              className={classes.full}
              onChange={e => setProjectId(e.target.value)}
              value={projectId}>
              {projects.map(project => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select your project</FormHelperText>
          </Grid>
          <Grid item md={6} sm={12}>
            <Select
              id="phase-drop-down"
              label="Phases"
              autoWidth={true}
              className={classes.full}
              onChange={e => setPhase(e.target.value)}
              value={phase}>
              {phases.map(phase => (
                <MenuItem key={phase} value={phase}>
                  {phase}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select your project</FormHelperText>
          </Grid>
          <Grid item md={3} sm={6}>
            <TextField
              label="Hour"
              placeholder="0"
              type="number"
              id="hour"
              inputProps={{
                min: 0
              }}
              name="hour"
              value={hour}
              onChange={e => setHour(e.target.value)}
            />
          </Grid>
          <Grid item md={3} sm={6}>
            <TextField
              label="Minute"
              placeholder="0"
              type="number"
              id="minute"
              inputProps={{
                min: 0
              }}
              name="minute"
              value={minute}
              onChange={e => setMinute(e.target.value)}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="YYYY/MM/DD"
                margin="none"
                autoOk="true"
                id="date"
                label="Date"
                className="date-picker"
                value={date}
                onChange={date => setDate(date)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={12} sm={12}>
            <TextField
              type="text"
              id="notes"
              name="notes"
              className={classes.full}
              label="Notes"
              multiline
              maxRows={4}
              onChange={e => setNotes(e.target.value)}
              value={notes}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.button}>
        {appointment.id ? (
          <Button startIcon={<PlayCircleOutlineRounded />} onClick={() => startTimer()}>
            Start Timer
          </Button>
        ) : (
          <Button startIcon={<EditRounded />} onClick={() => updateTimer()}>
            Update Timer
          </Button>
        )}
        <Button startIcon={<SaveOutlined />} onClick={() => addAppointment()}>
          Save Entry
        </Button>
      </div>
    </div>
  );
};

export default Appointment;
