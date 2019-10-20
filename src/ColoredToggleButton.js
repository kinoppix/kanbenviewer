import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles({
  root: {
    '&$disabled': {
      background: "red",
      color: props => props.color
    },
},
});

export default function (props) {
  const classes = useStyles(props)
  console.log(classes.root)
  return;
  // return <ToggleButton classes={{props.classes, classes}} {...props}>{props.children}</ToggleButton>
}