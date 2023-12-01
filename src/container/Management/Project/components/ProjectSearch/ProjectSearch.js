import React from 'react';
import { Grid, TextField, Fab } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';

const ProjectSearch = props => {
  const { managers, params, setParams, onQuery } = props;

  return (
    <Grid container spacing={2}>
      <Grid item md={4} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Name"
          value={params.name}
          onChange={e => setParams(state => ({ ...state, name: e.target.value }))}
          margin="dense"
          name="name"
          variant="outlined"
        />
      </Grid>
      <Grid item md={3} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Company Client"
          value={params.client}
          onChange={e => setParams(state => ({ ...state, client: e.target.value }))}
          margin="dense"
          name="client"
          variant="outlined"
        />
      </Grid>
      <Grid item md={2} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Project Manager"
          margin="dense"
          name="responsible"
          value={params.responsible}
          select
          // eslint-disable-next-line react/jsx-sort-props
          SelectProps={{ native: true }}
          variant="outlined"
          onChange={e => setParams(state => ({ ...state, responsible: e.target.value }))}>
          <option key="empty" value=""></option>
          {managers.map(manager => (
            <option key={manager.id} value={manager.id}>
              {manager.name}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item md={2} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Phase"
          value={params.phase}
          onChange={e => setParams(state => ({ ...state, params: e.target.value }))}
          margin="dense"
          name="phase"
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

ProjectSearch.prototype = {
  handler: PropTypes.func,
  page: PropTypes.number,
  size: PropTypes.number
};

export default ProjectSearch;
