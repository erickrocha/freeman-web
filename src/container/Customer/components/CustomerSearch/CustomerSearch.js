import React, { useState } from 'react';
import { Grid, TextField, Fab } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import PropTypes from 'prop-types';

const CustomerSearch = props => {
  const { page, size } = props;

  const [legalNumber, setLegalNumber] = useState('');
  const [legalName, setLegalName] = useState('');

  const onQuery = () => {
    props.handler({
      legalName: legalName,
      legalNumber: legalNumber,
      page: page,
      size: size
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={4} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Legal Number"
          value={legalNumber}
          onChange={e => setLegalNumber(e.target.value)}
          margin="dense"
          name="name"
          variant="outlined"
        />
      </Grid>
      <Grid item md={7} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Legal Name/Business Name"
          value={legalName}
          onChange={e => setLegalName(e.target.value)}
          margin="dense"
          name="name"
          variant="outlined"
        />
      </Grid>
      <Grid item md={1} xs={12} container direction="row" justify="flex-end" alignItems="center">
        <Fab color="primary" aria-label="add" onClick={() => onQuery()} size="medium">
          <Search />
        </Fab>
      </Grid>
    </Grid>
  );
};

CustomerSearch.prototype = {
  handler: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
};

export default CustomerSearch;
