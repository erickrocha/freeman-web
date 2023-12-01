import React from 'react';
import { EmptyRows, DropDown } from 'components/UI';
import { makeStyles } from '@material-ui/styles';
import { body } from 'common/table.style';
import clsx from 'clsx';
import { updateObject } from 'shared/utility';

const useStyles = makeStyles(
  updateObject(body, {
    row: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '0.7em',
      minHeight: 50,
      maxHeight: 50
    },
    column: {
      maxWidth: '15.83%',
      minWidth: '15.83%',
      padding: '0.5%'
    },
    buttonColumn: {
      maxWidth: '5%',
      minWidth: '5%',
      display: 'flex'
    }
  })
);

const SupplierBody = props => {
  const { data, pageSize } = props;

  const classes = useStyles();
  const rows = data
    ? data.map(item => {
        const style = item.active ? classes.active : classes.inactive;
        return (
          <div key={item.id} className={clsx(classes.row, style)}>
            <div className={classes.column}>{item.legalNumber}</div>
            <div className={classes.column}>{item.legalName}</div>
            <div className={classes.column}>{item.businessName}</div>
            <div className={classes.column}>{item.address.address}</div>
            <div className={classes.column}>{item.phone}</div>
            <div className={classes.column}>{item.email}</div>
            <div className={classes.buttonColumn}>
              <DropDown
                routes={[
                  { path: `/supplier/edit/${item.id}`, label: 'Edit' },
                  { path: `/supplier/manage/${item.id}`, label: 'Manage' }
                ]}
              />
            </div>
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

export default SupplierBody;
