// export function PetPreview({pet}) {
//     return (
//         <section>
//             <img src={pet.imgUrls} alt="" />
//             <p>{pet.name}</p>
//             <p>{pet.title}</p>
//         </section>
//     )
// }   

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export function PetPreview({pet}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
    </div>
  );
}
