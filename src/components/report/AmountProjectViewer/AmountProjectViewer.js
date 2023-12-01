import React from "react";
import "./AmountProjectViewer.scss";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

const classes = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const amountProjectViewer = props => {
    
  let values = props.data.map(amount => {
    return (
      <Card key={amount.project.id} className={classes.Card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              P
            </Avatar>
          }
          title={amount.project.name}
          subheader={amount.project.code}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${amount.hour}h - ${amount.minute}m`}
          </Typography>
        </CardContent>
      </Card>
    );
  });
  return <div className="AmountProjectViewer">{values}</div>;
};

export default amountProjectViewer;
