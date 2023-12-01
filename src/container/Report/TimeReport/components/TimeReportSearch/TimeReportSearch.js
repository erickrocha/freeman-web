/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Grid, Typography, Fab, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { SearchRounded } from '@material-ui/icons';
import MomentUtils from '@date-io/moment';
import { useSelector, useDispatch } from 'react-redux';
import { updateObject, findOne } from 'shared/utility';
import * as dateService from 'shared/date-service';
import * as handler from 'store/events/report/time-report/index';

const TimeReportSearch = props => {
  const { params, setParams } = props;

  const myProjects = useSelector(state => state.app.myProjects);
  const project = findOne(myProjects, params.projectId);
  
  const phases = project ? project.phases :[];

  const dispatcher = useDispatch();

  const onGet = () => {
    dispatcher(handler.query(params));
  };

  useEffect(() => {
    onGet();
  }, []);

  const setStartDate = date => {
    setParams(updateObject(params, { startDate: date.format(dateService.ISO_DATE) }));
  };

  const setEndDate = date => {
    setParams(updateObject(params, { endDate: date.format(dateService.ISO_DATE) }));
  };

  const setProject = projectId => {
    setParams(updateObject(params, { projectId: projectId }));
  };

  const setPhase = phase => {
    setParams(updateObject(params, { phase: phase }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={2} container direction="row" justify="flex-start" alignItems="center">
        <Typography variant="h1">Filters</Typography>
      </Grid>
      <Grid item md={2}>
        <TextField
          fullWidth
          label="Project"
          margin="dense"
          name="project"
          value={params.project}
          select
          // eslint-disable-next-line react/jsx-sort-props
          SelectProps={{ native: true }}
          variant="outlined"
          onChange={e => setProject(e.target.value)}>
          <option key="empty" value=""></option>
          <option key="all" value="">
              All Projects
            </option>
          {myProjects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item md={2}>
        <TextField
          fullWidth
          label="Phase"
          margin="dense"
          name="phase"
          value={params.phase}
          select
          // eslint-disable-next-line react/jsx-sort-props
          SelectProps={{ native: true }}
          variant="outlined"
          onChange={e => setPhase(e.target.value)}>
          <option key="empty" value=""></option>
          {phases.map(phase => (
            <option key={phase} value={phase}>
              {phase}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item md={2}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            fullWidth
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            format="DD/MM/YYYY"
            margin="dense"
            autoOk={true}
            id="startDate"
            label="Start date"
            className="date-picker"
            value={params.startDate}
            onChange={date => setStartDate(date)}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item md={2}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            fullWidth
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            format="DD/MM/YYYY"
            margin="dense"
            autoOk={true}
            id="endDate"
            label="End date"
            className="date-picker"
            value={params.endDate}
            onChange={date => setEndDate(date)}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item md={2} container direction="row" justify="flex-end" alignItems="center">
        <Fab variant="extended" size="medium" color="primary" aria-label="search" onClick={() => onGet()}>
          <SearchRounded />
          Search
        </Fab>
      </Grid>
    </Grid>
  );
};

export default TimeReportSearch;
