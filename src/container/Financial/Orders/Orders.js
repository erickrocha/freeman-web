import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Order from './components/Order';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import { OrderSearch } from './components';
import { useSelector, useDispatch } from 'react-redux';
import * as handler from 'store/events/financial/order/index';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
}));

const Orders = props => {
  const classes = useStyles();

  const orders = useSelector(state => state.order.orders);

  const dispatch = useDispatch();

  const onGet = params => {
    dispatch(handler.query(params));
  };

  return (
    <div className={classes.root}>
      <BreadCrumb label="Orders" tree={[{ href: '/', label: 'Home' }]}/>
      <OrderSearch onGet={onGet} />
      <br />
      <br />
      <div className={classes.body}>
        {orders.map(order => {
          return <Order key={order.id} order={order} />;
        })}
      </div>
    </div>
  );
};

export default Orders;
