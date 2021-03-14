import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    flexGrow: 1,
  },
  container: {
    marginBottom: 30,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    position: 'relative',
    height: 300,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageButton': {
        opacity: 1,
      },
      '& $imageBackdrop': {
        opacity: 0.8,
      },
      '& $imageMarked': {
        opacity: 1,
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    opacity: 0,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

function AutoGrid(props) {
  const classes = useStyles();
  props.projects.sort(function(a, b) {
    if (a.priority == undefined) { return 1; }
    if (b.priority == undefined) { return -1; }
    return 0;
  })
  console.log(props.projects);
  const rows = [...Array( Math.ceil(props.projects.length / 3) )];
  const projectRows = rows.map( (_, idx) => 
                        props.projects.slice(idx * 3, idx * 3 + 3) 
                      );
                      
  const content = projectRows.map((row, idx) => (
    <Grid container spacing={8} key={idx} className={classes.container}>
      { row.map((proj, _) => (
        <Grid item xs={12} md={6} lg={4} key={proj.id}>
          <Paper className={classes.paper}>
            <ButtonBase focusRipple key={proj.title} 
              className={classes.image} 
              focusVisibleClassName={classes.focusVisible} 
              style={{ width: "100%" }}
              onClick={() => window.location = proj.url} > 
              <span className={classes.imageSrc} style={{ backgroundImage: `url(${proj.preview})`, }} />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography component="span" variant="h5" color="inherit" className={classes.imageTitle}>
                  {proj.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Paper> 
        </Grid>
      ))}
    </Grid>
  ));

  return (
    <div className={classes.root}>
      {content}
    </div>
  )
}

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [projLoaded, setProjectLoaded] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyC5jwetIzUZzGAVakVDkRJeW9_ILi87TYk",
      authDomain: "portfolio-83c23.firebaseapp.com",
      databaseURL: "https://portfolio-83c23.firebaseio.com",
      projectId: "portfolio-83c23",
      storageBucket: "portfolio-83c23.appspot.com",
      messagingSenderId: "690375541387",
      appId: "1:690375541387:web:04de46cda5787170e68a8e",
      measurementId: "G-BMYRLBEYNW"
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    var dbRef = firebase.database().ref();
    
    dbRef.on('value', snapshot => {
      setProjects(snapshot.val());
      setProjectLoaded(true);
    });

  }, []);

  return (
    <React.Fragment>
      <div className="filters">
        <Button variant={filter === 'all' ? "focus" : "link"} onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'visualization' ? "focus" : "link"} onClick={() => setFilter('visualization')}>Visualization</Button>
        <Button variant={filter === 'ds' ? "focus" : "link"} onClick={() => setFilter('ds')}>Data Analytics</Button>
        <Button variant={filter === 'dataEng' ? "focus" : "link"} onClick={() => setFilter('dataEng')}>Data Engineering</Button>
        <Button variant={filter === 'web' ? "focus" : "link"} onClick={() => setFilter('web')}>Web</Button>
        <Button variant={filter === 'mobileGame' ? "focus" : "link"} onClick={() => setFilter('mobileGame')}>Mobile & Game</Button>
      </div>

      {projLoaded &&
         filter === 'all' ? <AutoGrid projects={projects} /> : 
         filter === 'visualization' ? <AutoGrid projects={projects.filter(proj => proj.tag === 'visualization')} /> : 
         filter === 'ds' ? <AutoGrid projects={projects.filter(proj => proj.tag === 'ds')} /> : 
         filter === 'dataEng' ? <AutoGrid projects={projects.filter(proj => proj.tag === 'dataEng')} /> : 
         filter === 'mobileGame' ? <AutoGrid projects={projects.filter(proj => proj.tag === 'mobileGame')} /> : 
         filter === 'web' ? <AutoGrid projects={projects.filter(proj => proj.tag === 'web')} /> : <AutoGrid projects={projects} />}

    </React.Fragment>
  );
}

export default Portfolio;