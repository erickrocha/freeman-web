import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { body } from 'common/table.style';
import clsx from 'clsx';
import { EmptyRows } from 'components/UI';
import { updateObject } from 'shared/utility';
import MemberCell from '../MemberCell';
import { useHistory } from 'react-router';

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
        maxWidth: '33.33%',
        minWidth: '33.33%',
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

const TeamBody = props => {
  const { data, pageSize } = props;
  const history = useHistory();

  const edit = id => {
    history.push(`/management/team/edit/${id}`);
  }

  const classes = useStyles();
  const rows = data
    ? data.map(item => {
      return (
        <div key={item.id} className={clsx(classes.row, classes.active)} onClick={() => edit(item.id)}>
          <div>{item.name}</div>
          <div>{item.manager.name}</div>
          <div>
            <MemberCell members={item.members} />
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

export default TeamBody;
