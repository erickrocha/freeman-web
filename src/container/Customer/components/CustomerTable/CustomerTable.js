/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TableHeader, TableFooter } from 'components';
import Wrapper from 'hoc/Wrapper/Wrapper';
import { CustomerSearch } from '..';
import { Body } from './components';
import { useSelector, useDispatch } from 'react-redux';
import * as service from 'store/events/customer/index';

const CustomerTable = () => {
  const page = useSelector(state => state.customer.page);
  const data = useSelector(state => state.customer.data);

  const [legalName, setLegalName] = useState('');
  const [legalNumber, setLegalNumber] = useState('');

  const dispatcher = useDispatch();

  const paginate = (number, size) => {
    const queryParams = { legalNumber: legalNumber, legalName: legalName, page: number, size: size };
    dispatcher(service.query(queryParams));
  };

  const query = () => {
    const queryParams = { legalNumber: legalNumber, legalName: legalName, page: page.number, size: page.size };
    dispatcher(service.query(queryParams));
  };

  useEffect(() => {
    query();
  }, []);

  const columns = ['Legal number', 'Legal name', 'Business name', 'Address', 'Phone', 'Email'];
  return (
    <Wrapper>
      <CustomerSearch
        setLegalName={setLegalName}
        setLegalNumber={setLegalNumber}
        legalName={legalName}
        legalNumber={legalNumber}
        onQuery={query}
      />
      <br />
      <div>
        <TableHeader columns={columns} hasButton={false} />
        <Body data={data} pageSize={page.size} />
        <TableFooter onPaginate={paginate} page={page} />
      </div>
    </Wrapper>
  );
};

export default CustomerTable;
