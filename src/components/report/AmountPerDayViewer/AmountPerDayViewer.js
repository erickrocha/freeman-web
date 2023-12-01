import React from "react";
import "./AmountPerDayViewer.scss";
import * as dateService from '../../../shared/date-service';

const amountPerDayViewer = props => {
  let values = props.data.map(amount => {
    return (
      <div className="Card-Day" key={amount.date}>
        <div className="Card-Day-Header">{dateService.getDate(amount.date).format("MMM - D - ddd")}</div>
        <div className="Card-Day-Body"><b>{`${amount.hour}h - ${amount.minute}m`}</b></div>
      </div>
    );
  });

  return <div className="AmountPerDayViewer">{values}</div>;
};

export default amountPerDayViewer;
