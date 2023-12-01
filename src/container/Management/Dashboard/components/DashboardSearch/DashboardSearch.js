/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Grid, Typography, Fab } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as handler from 'store/events/management/index';
import { SearchRounded } from '@material-ui/icons';
import { updateObject } from 'shared/utility';
import { useDispatch } from 'react-redux';
import * as dateService from 'shared/date-service';

const DashboardSearch = props => {
  const { params, setParams } = props;

  const dispatch = useDispatch();

  const onGet = () => {
    dispatch(handler.query(params));
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

  return (
    <Grid container spacing={2}>
      <Grid item md={7} container direction="row" justify="flex-start" alignItems="center">
        <Typography variant="h1">Period</Typography>
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
            label="End Date"
            className="date-picker"
            value={params.endDate}
            onChange={date => setEndDate(date)}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item md={1} container direction="row" justify="flex-end" alignItems="center">
        <Fab variant="extended" size="medium" color="primary" aria-label="search" onClick={() => onGet()}>
          <SearchRounded />
          Search
        </Fab>
      </Grid>
    </Grid>
  );
};

export default DashboardSearch;
