import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { EmptyRows } from 'components/UI';
import clsx from 'clsx';
import { body } from 'common/table.style';
import { useHistory } from 'react-router';
import { updateObject } from 'shared/utility';

const useStyles = makeStyles(
  updateObject(body, {
    row: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '0.7em',
      minHeight: 50,
      maxHeight: 50,
      '& div': {
        maxWidth: '16.66%',
        minWidth: '16.66%',
        padding: '0.5%',
        wordWrap: 'break-word'
      }
    }
  })
);
const Body = props => {
  const { data, pageSize } = props;
  const history = useHistory();

  const edit = id => {
    history.push(`/customer/edit/${id}`)
  }

  const classes = useStyles();

  const rows = data
    ? data.map(item => {
      return (
        <div key={item.id} className={clsx(classes.row, classes.active)} onClick={() => edit(item.id)}>
          <div >{item.legalNumber}</div>
          <div >{item.legalName}</div>
          <div >{item.businessName}</div>
          <div >{item.address.address}</div>
          <div >{item.phone}</div>
          <div >{item.email}</div>
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
