import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { findOneByField, updateObject } from 'shared/utility';

const AddressEditor = props => {
  const { address, provinces, setAddress } = props;

  const onAddressChange = (field, value) => {
    setAddress(
      updateObject(address, {
        [field]: value
      })
    );
  };

  const setProvince = value => {
    const province = findOneByField(provinces, 'acronym', value);
    setAddress(
      updateObject(address, {
        province: province
      })
    );
  };

  return (
    <Card>
      <CardHeader title="Address" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={8}>
            <TextField
              fullWidth
              label="Street"
              margin="dense"
              name="street"
              required
              value={address.street}
              onChange={e => onAddressChange('street', e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              fullWidth
              label="Address number"
              margin="dense"
              name="number"
              value={address.number}
              onChange={e => onAddressChange('number', e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item md={8}>
            <TextField
              fullWidth
              label="Complement"
              margin="dense"
              name="complement"
              value={address.complement  || ''}
              onChange={e => onAddressChange('complement', e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              fullWidth
              label="Zip Code"
              margin="dense"
              name="zipCode"
              required
              value={address.zipCode}
              onChange={e => onAddressChange('zipCode', e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item md={5}>
            <TextField
              fullWidth
              label="Neighborhood"
              margin="dense"
              name="neighborhood"
              value={address.neighborhood}
              onChange={e => onAddressChange('neighborhood', e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item md={5}>
            <TextField
              fullWidth
              label="City"
              margin="dense"
              name="city"
              required
              value={address.city}
              onChange={e => onAddressChange('city', e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              label="Province"
              margin="dense"
              name="province"
              value={address.province && address.province.acronym ? address.province.acronym : ''}
              select
              // eslint-disable-next-line react/jsx-sort-props
              SelectProps={{ native: true }}
              variant="outlined"
              onChange={e => setProvince(e.target.value)}>
              <option key="empty" value="Select your province"></option>
              {provinces.map(province => (
                <option key={province.acronym} value={province.acronym}>
                  {province.name}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AddressEditor.prototypes = {
  address: PropTypes.object,
  setAddress: PropTypes.func,
  provinces: PropTypes.arrayOf(PropTypes.object)
};

export default AddressEditor;
