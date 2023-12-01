/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Body from './Body';
import { TableHeader, TableFooter } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from 'hoc/Wrapper/Wrapper';
import { UserSearch } from '..';
import * as service from 'store/events/user/index';

const UserTable = props => {
  const page = useSelector(state => state.user.page);
  const data = useSelector(state => state.user.data);

  const profiles = useSelector(state => state.app.profiles);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');

  const dispatcher = useDispatch();

  const paginate = (number, size) => {
    const queryParams = { name: name, email: email, profile: profile, page: number, size: size };
    dispatcher(service.query(queryParams));
  };

  const query = () => {
    const queryParams = {
      name: name,
      email: email,
      profile: profile,
      page: page.number,
      size: page.size
    };
    dispatcher(service.query(queryParams));
  };

  useEffect(() => {
    query();
  }, []);

  const columns = ['Name', 'Email/Username', 'Profile', 'Active'];
  return (
    <Wrapper>
      <UserSearch
        profiles={profiles}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        profile={profile}
        setProfile={setProfile}
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


export default UserTable;
