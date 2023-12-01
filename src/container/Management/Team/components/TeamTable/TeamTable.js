/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Wrapper from 'hoc/Wrapper/Wrapper';
import TeamSearch from '../TeamSearch';
import { TableHeader, TableFooter } from 'components';
import TeamBody from './TeamBody';
import { useSelector, useDispatch } from 'react-redux';
import * as service from 'store/events/management/team/index';

const TeamTable = () => {
  const page = useSelector(state => state.team.page);
  const data = useSelector(state => state.team.data);
  const managers = useSelector(state => state.app.managers);
  const techLeads = useSelector(state => state.app.techLeads);


  const [params, setParams] = useState({ name: '', manager: '', techLead: '', member: '' });

  const dispatcher = useDispatch();

  const paginate = (number, size) => {
    const queryParams = { ...params, page: number, size: size };
    dispatcher(service.query(queryParams));
  };

  const query = () => {
    const queryParams = { ...params, page: page.number, size: page.size };
    dispatcher(service.query(queryParams));
  };

  useEffect(() => {
    query();
  }, []);

  const columns = ['Name', 'Manager', 'Members'];

  return (
    <Wrapper>
      <TeamSearch managers={managers} params={params} techLeads={techLeads} setParams={setParams} onQuery={query} />
      <br />
      <div>
        <TableHeader columns={columns} hasButton={false} />
        <TeamBody data={data} pageSize={page.size} />
        <TableFooter onPaginate={paginate} page={page} />
      </div>
    </Wrapper>
  );
};

export default TeamTable;
