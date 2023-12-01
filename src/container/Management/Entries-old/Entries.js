import React from 'react';
import { connect } from 'react-redux';
import * as events from '../../../store/events/entry/entry.events';
import * as handler from '../../../store/events/entry/index';
import { makeStyles } from '@material-ui/styles';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import { EntryTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Entries = props => {
  const { data, page, startDate, endDate, onCheck, allChecked,onCheckAll, onQuery } = props;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BreadCrumb path="Entries" />
      <br />
      <br />
      <EntryTable data={data} page={page} startDate={startDate} endDate={endDate} onCheck={onCheck} allChecked={allChecked} onCheckAll={onCheckAll} onQuery={onQuery} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.entry.data,
    loading: state.entry.loading,
    error: state.entry.error,
    page: state.entry.page,
    allChecked: state.entry.allChecked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheck: id => dispatch({ type: events.CHECK_ENTRY, entryId: id }),
    onCheckAll: value => dispatch({ type: events.CHECK_ALL_ENTRIES, allChecked: value }),
    onQuery: params => dispatch(handler.query(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entries);
