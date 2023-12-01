import React from 'react';
import { HighlightOff, OfflinePin } from '@material-ui/icons';
import EmptyRows from 'components/UI/EmptyRows';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { body } from 'common/table.style';
import clsx from 'clsx';
import { updateObject } from 'shared/utility';

const useStyles = makeStyles(
  updateObject(body, {
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: '0.8em',
      minHeight: 50,
      maxHeight: 50,
      '& div': {
        maxWidth: '20.00%',
        minWidth: '20.00%',
        padding: '0.5%'
      },
      '& span': {
        maxWidth: '5%',
        minWidth: '5%',
        paddingLeft: 10
      }
    }
  })
);

const Body = props => {
  const { data, pageSize } = props;
  const history = useHistory();

  const edit = id => {
    history.push(`/management/project/edit/${id}`)
  }

  const classes = useStyles();

  const rows = data
    ? data.map(item => {
      const status = item.active ? <OfflinePin /> : <HighlightOff color="secondary" />;
      return (
        <div key={item.id} className={clsx(classes.row, classes.active)}  onClick={() => edit(item.id)}>
          <div className="Column">{item.name}</div>
          <div className="Column">{item.code}</div>
          <div className="Column">{item.manager.name}</div>
          <div className="Column">{item.owner.name}</div>
          <div className="Column">{status}</div>
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

export default Body;
