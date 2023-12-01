import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import { EmptyRows } from 'components/UI';
import { makeStyles } from '@material-ui/styles';
import { body } from 'common/table.style';
import { updateObject } from 'shared/utility';
import clsx from 'clsx';
import { useHistory } from 'react-router';

const useStyles = makeStyles(
  updateObject(body, {
    row: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '0.8em',
      minHeight: 50,
      maxHeight: 50,
      '& div': {
        maxWidth: '25.00%',
        minWidth: '25.00%',
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

  const classes = useStyles();
  const history = useHistory();

  const edit = id => {
    history.push(`/security/users/edit/${id}`);
  }

  const rows = data
    ? data.map(item => {
      const status = item.enabled ? <OfflinePinIcon /> : <HighlightOffIcon color="secondary" />;
      return (
        <div key={item.id} className={clsx(classes.row, classes.active)} onClick={() => edit(item.id)}>
          <div>{item.name}</div>
          <div>{item.username}</div>
          <div>{item.profile}</div>
          <div>{status}</div>
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
