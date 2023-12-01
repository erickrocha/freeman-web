/* eslint-disable react-hooks/exhaustive-deps */
import { TableFooter, TableHeader } from 'components';
import Wrapper from 'hoc/Wrapper/Wrapper';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as handler from 'store/events/supplier';

import { SupplierSearch } from '..';
import SupplierBody from './SupplierBody';

const SupplierTable = props => {
  const page = useSelector(state => state.supplier.page);
  const data = useSelector(state => state.supplier.data);

  const [legalName, setLegalName] = useState('');
  const [legalNumber, setLegalNumber] = useState('');

  const dispatcher = useDispatch();

  const paginate = (number, size) => {
    const queryParams = { legalNumber: legalNumber, legalName: legalName, page: number, size: size };
    dispatcher(handler.query(queryParams));
  };

  const query = () => {
    const queryParams = { legalNumber: legalNumber, legalName: legalName, page: page.number, size: page.size };
    dispatcher(handler.query(queryParams));
  };

  useEffect(() => {
    query();
  }, []);

  const columns = ['Legal number', 'Legal name', 'Business name', 'Address', 'Phone', 'Email'];
  return (
    <Wrapper>
      <SupplierSearch
        setLegalName={setLegalName}
        setLegalNumber={setLegalNumber}
        legalName={legalName}
        legalNumber={legalNumber}
        onQuery={query}
      />
      <br />
      <div>
        <TableHeader columns={columns} hasButton={true} hasCheck={false}/>
        <SupplierBody data={data} pageSize={page.size} />
        <TableFooter onPaginate={paginate} page={page} />
      </div>
    </Wrapper>
  );
};

export default SupplierTable;
