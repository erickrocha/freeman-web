/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import * as dateService from 'shared/date-service';
import * as handler from 'store/events/management/entry/index';
import { useDispatch, useSelector } from 'react-redux';
import { EntryTable, EntryPaginator } from './components';

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Entries = () => {
  
  const entries = useSelector(state => state.entry.entries);

  const [startDate, setStartDate] = useState(dateService.getSundayDateCurrentWeek());
  const [endDate, setEndDate] = useState(dateService.getSaturdayDateCurrentWeek());

  const dispatcher = useDispatch();

  const query = (startDate, endDate) => {
    dispatcher(handler.query({ startDate: startDate, endDate: endDate }));
  };


  useEffect(() => {
    query();
  }, []);

  const classes = useStyle();
  return (
    <div className={classes.root}>
      <BreadCrumb label="Entries" tree={[{ href: '/', label: 'Home' }]} />
      <br />
      <br />
      <EntryPaginator
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onQuery={query}
      />
      <br />
      <EntryTable entries={entries} startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default Entries;
