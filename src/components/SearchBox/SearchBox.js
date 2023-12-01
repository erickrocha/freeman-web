import React from 'react';
import clsx from 'clsx';
import { Grid, Select, MenuItem, InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
    alignItems: 'center'
  },
  label: {
    paddingTop: theme.spacing(1)
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}));

const SearchBox = props => {
  let {
    className,
    values: { startDate, endDate, projects, project, phases, phase },
    handleChange,
    setFieldTouched
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
    if (name === 'project') {
      const id = e.target.value;
      const selected = projects.find(current => {
        return current.id === id;
      });
      project = id;
      phases = selected.phases;
    }
  };

  const classes = useStyles();

  let Projects = projects
    ? projects.map(project => {
        return (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        );
      })
    : null;

  let Phases = phases
    ? phases.map(phase => {
        return (
          <MenuItem key={phase} value={phase}>
            {phase}
          </MenuItem>
        );
      })
    : null;

  return (
    <form>
      <Grid className={clsx(classes.root, className)} container spacing={3}>
        <Grid item md={2} xs={12}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              autoOk="true"
              format="YYYY/MM/DD"
              margin="normal"
              id="startDate"
              label="Start date"
              value={startDate}
              onChange={change.bind(null, 'startDate')}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item md={2} xs={12}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              autoOk="true"
              format="YYYY/MM/DD"
              margin="normal"
              id="endDate"
              label="End date"
              value={endDate}
              onChange={change.bind(null, 'endDate')}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item md={2} xs={12}>
          <InputLabel className={classes.label} htmlFor="project-select">
            Project
          </InputLabel>
          <Select
            fullWidth
            inputProps={{
              name: 'project',
              id: 'project-select'
            }}
            value={project}
            onChange={change.bind(null, 'project')}>
            {Projects}
          </Select>
        </Grid>
        <Grid item md={2} xs={12}>
          <InputLabel className={classes.label} htmlFor="phase-select">
            Phase
          </InputLabel>
          <Select
            fullWidth
            inputProps={{
              name: 'phase',
              id: 'phase-select'
            }}
            value={phase}
            onChange={change.bind(null, 'phase')}>
            {Phases}
          </Select>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchBox;
