/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Wrapper from 'hoc/Wrapper/Wrapper';
import * as dateService from '../../../../../shared/date-service';
import { TableHeader, TableFooter } from 'components';
import { EntrySearch } from '..';
import EntryBody from './Body/EntryBody';

const EntryTable = props => {
  const { data, page, onQuery, onCheck, allChecked, onCheckAll } = props;

  const [startDate, setStartDate] = useState(dateService.getFirstDayCurrentMonth());
  const [endDate, setEndDate] = useState(dateService.getLastDayCurrentMonth());

  const paginate = (number, size) => {
    const queryParams = { startDate: startDate, endDate: endDate, page: number, size: size };
    onQuery(queryParams);
  };

  const query = () => {
    const queryParams = { startDate: startDate, endDate: endDate, page: page.number, size: page.size };
    onQuery(queryParams);
  };

  useEffect(() => {
    query();
  }, []);

  const columns = ['User', 'Date', 'Project', 'Phase', 'Time', 'Notes'];
  return (
    <Wrapper>
      <EntrySearch startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      <br />
      <div>
        <TableHeader columns={columns} hasButton={true} hasCheck={true} allChecked={allChecked} onCheckAll={onCheckAll} />
        <EntryBody data={data} pageSize={page.size} onCheck={onCheck} />
        <TableFooter onPaginate={paginate} page={page} />
      </div>
    </Wrapper>
  );
};

export default EntryTable;
