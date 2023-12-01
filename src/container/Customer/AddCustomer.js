import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { findOne } from 'shared/utility';
import { BreadCrumb } from 'components';
import { CustomerForm } from './components';
import { Redirect } from 'react-router';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    }
}))
const AddCustomer = props => {
    const { history, match } = props;

    const classes = useStyles();
    const customerId = match.params.id;

    const data = useSelector(state => state.customer.data);

    const customer = findOne(data, customerId) || {
        address: {
            province: {}
        },
        contract: {}
    };

    const cancel = () => {
        history.goBack();
    };

    const saved = useSelector(state => state.customer.saved);
    if (!saved) {
        return (
            <div className={classes.root}>
                <BreadCrumb
                    label="Add"
                    tree={[
                        { href: '/', label: 'Home' },
                        { href: '/customer', label: 'Customer' }
                    ]}
                />
                <CustomerForm customer={customer} onCancel={cancel} />
            </div>
        );
    } else {
        return <Redirect to="/customer" />;
    }
}

export default AddCustomer;