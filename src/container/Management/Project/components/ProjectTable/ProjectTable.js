/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { TableHeader, TableFooter } from 'components';
import Wrapper from 'hoc/Wrapper/Wrapper';
import { ProjectSearch } from '..';
import Body from './Body';
import { useSelector, useDispatch } from 'react-redux';
import * as service from 'store/events/project/index';

const ProjectTable = props => {
  const page = useSelector(state => state.project.page);
  const data = useSelector(state => state.project.data);

  const managers = useSelector(state => state.app.managers);

  const [params, setParams] = useState({ name: '', client: '', responsible: '', phase: '' });

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
  },[]);

  const columns = ['Name', 'Code', 'Manager', 'Owner', 'Active'];
  return (
    <Wrapper>
      <ProjectSearch managers={managers} params={params} setParams={setParams} onQuery={query} />
      <br />
      <div>
        <TableHeader columns={columns} hasButton={false} />
        <Body data={data} pageSize={page.size} />
        <TableFooter onPaginate={paginate} page={page} />
      </div>
    </Wrapper>
  );
};

export default ProjectTable;
