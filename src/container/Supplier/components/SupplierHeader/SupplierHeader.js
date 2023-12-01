import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { LegalPersonCard, AddressCard, ContactCard } from 'components/UI';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.103)',
    borderRadius: '5px'
  },
  separator: {
    minHeight: '95%',
    borderRight: '1px solid rgba(0, 0, 0, 0.103)',
    marginRight: theme.spacing(1)
  }
}));

const SupplierHeader = props => {
  const { supplier } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LegalPersonCard legalPerson={supplier} />
      <AddressCard address={supplier.address} />
      <ContactCard contact={{ phone: supplier.phone, email: supplier.email, website: supplier.website }} />
    </div>
  );
};

export default SupplierHeader;
