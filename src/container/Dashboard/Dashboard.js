/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Slide, Dialog } from '@material-ui/core';
import { DashboardPaginator, DashboardBody, Appointment } from './components';
import { BreadCrumb } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import * as handler from 'store/events/dashboard/dashboard.handler';
import * as events from 'store/events/dashboard/dashboard.events';
import * as dateService from 'shared/date-service';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2)'
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Dashboard = props => {
  const classes = useStyles();

  const [startDate, setStartDate] = useState(dateService.getSundayDateCurrentWeek());
  const [endDate, setEndDate] = useState(dateService.getSaturdayDateCurrentWeek());

  const days = useSelector(state => state.dashboard.days);
  const open = useSelector(state => state.dashboard.open);
  const appointment = useSelector(state => state.dashboard.appointment);

  const dispatcher = useDispatch();

  const show = () => {
    dispatcher({ type: events.ADD_APPOINTMENT });
  };

  const close = () => {
    dispatcher({ type: events.CANCEL_APPOINTMENT });
  };

  const query = (startDate, endDate) => {
    dispatcher(handler.getDashboardByUserId({ startDate: startDate, endDate: endDate }));
  };


  const reload = useSelector(state => state.dashboard.reload);

  if (reload) {
    query(startDate, endDate);
  }

  useEffect(() => {
    query(startDate, endDate);
  }, []);

  return (
    <div className={classes.root}>
      <BreadCrumb label="Dashboard" tree={[{ href: '/', label: 'Home' }]} />
      <br />
      <DashboardPaginator
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onOpen={show}
        onQuery={query}
      />
      <DashboardBody days={days} />
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        TransitionComponent={Transition}
        keepMounted={false}
        onClose={() => close()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <Appointment appointment={appointment} onCancel={close} />
      </Dialog>
    </div>
  );
};

export default Dashboard;
