import React from 'react';
import AdviceRow from './AdviceRow'
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: "100%",
  },
}));

function Advice(props) {
  const classes = useStyles();
  return (
    <div>{
      Object.keys(props.src).map((key) => {
        const checkpoint = (key === '__default__') ? '' : key
        const diseases = props.src[key]
        return Object.keys(diseases).map(disease_key => {
          return (
            <div key={disease_key} style={disease_key === '__default__' ? {} : { backgroundColor: "#ffaaaa" }}>
              {disease_key !== '__default__' && <h2>{disease_key}</h2>}
              <List className={classes.root}>
                {diseases[disease_key].map(advice => (
                  <AdviceRow
                    checkpoint={checkpoint}
                    advice={advice}
                    key={advice[0]}
                  />
                ))}
              </List>
            </div>
          )
        })
      })
    }
    </div>
  )
}
export default Advice