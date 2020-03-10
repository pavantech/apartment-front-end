import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';
import { DateTimePicker } from "@material-ui/pickers";
import DatePicker from "../datePicker/DatePicker";
import CircularProgress from '@material-ui/core/CircularProgress';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "80%",
    overflowY: "scroll"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: "0px !important"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  selectBox: {
    width: "100%"
  },
  datepicker: {
    width: "100% !important"
  },
  MuiFormControl: {
    root: {
      width: "100% !important"
    },
    marginDense: {
      width: "100% !important", 
    }
  }
}));



export default function BulkUpdateInventoryModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [loader, setLoader] = React.useState(false);

  const updateRows = async (rows, requestData) => {
    try {
      for (let hostName of rows) {
        // console.log("print ....... ", index, state.rows[index]);

       

        
        // this.props.history.push("/");
        await fetch(
          "//localhost:8081/api/api/bulkUpdate/" + hostName,
          requestData
        );
      }
        setLoader(false);
       
       props.handleClose();
       setTimeout(() => alert("Record Updated Successfully"), 100);
      //fetchData();
    } catch (err) {
      console.log(err);
    }
    
  };


  const onSubmit = () => {   
    console.log("print selected ", props.selectedRows);
    setLoader(true);
    // const url = "//localhost:8081/api/api/bulkUpdate";
    const requestData = {
        
        
        "active" : state.active,
        "status" : state.status,
        "dayOfMonth" :state.dayOfMonth,
        "dayOfWeek" : state.dayOfWeek,
        "hourStart" : state.hourStart,
        "minStart" : state.minStart,
        "outageStartDate": state.outageStartDate,
        "outageEndDate": state.outageEndDate,
        "duration" : state.duration,
        "validation" : state.validation,
        "rebootRequired" : state.rebootRequired
    };

    console.log("requestta", requestData);
    const requestOption = {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json"
      }
    };

    updateRows(props.selectedRows, requestOption);
    // this.props.history.push("/");
    /*
     fetch(url, requestOption)
      .then((res)=> {
       console.log("rpint res", res);       
       setLoader(false);
       
       props.handleClose();
       setTimeout(() => alert("Record Updated Successfully"), 100);
       
     })
     .catch(err => {
        alert("failed to update the record")
        console.log(err)
    });*/
  };



  const [state, setState] = React.useState({
    hostName: null,
    active: null,
    status: null,
    dayOfMonth: null,
    dayOfWeek: null,
    hourStart: null,
    minStart: null,
    outageStartTime: null,
    outageEndTime: null,
    duration: '',
    validation: null,
    rebootRequired: null
  });


  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleChange = name => event => {
    let duration = null;
    let value = null;
    if(name === 'outageStartDate'){
      duration = (new Date(state.outageEndDate)) - new Date(event);
      let outageEndDate = null;
      if(duration < 0) {
        outageEndDate = event;
        duration = 0;
        console.log(" outageEndDate ", outageEndDate);
        setState({
          ...state,
          outageEndDate: outageEndDate
        });
      }
      value = event;
      
    } 
    else if(name ==='outageEndDate'){
      duration = new Date(event) - (new Date(state.outageStartDate))
      value = event;
    }
    else if(value === null){
      value = event.target.value;
    }
    setState({
      ...state,
      [name]: value,
      duration: duration !== null ? `${Math.floor(duration/3600000)}hr ${(duration%3600000)/60000}mins` : state.duration
    });
  };
  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.show}
        onClose={props.handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Update Inventory</h2>
          <p id="simple-modal-description">Update Inventory Details</p>

          <form className={classes.form} noValidate onSubmit="()=> false">
            <Grid container spacing={4}>
              <Grid item xs>
                <FormControl
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    className={classes.formControl}
                  >
                    <InputLabel ref={inputLabel} id="active">
                      ACTIVE
                    </InputLabel>
                    <Select
                      labelId="active"
                      id="active"
                      value={state.active}
                      onChange={handleChange("active")}
                      labelWidth={65}
                    >
                      <MenuItem value={"true"}>true</MenuItem>
                      <MenuItem value={"false"}>false</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    className={classes.formControl}
                  >
                    <InputLabel ref={inputLabel} id="status">
                      STATUS
                    </InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      value={state.status}
                      onChange={handleChange("status")}
                      labelWidth={65}
                    >
                      <MenuItem value={"ready"}>ready</MenuItem>
                      <MenuItem value={"complete"}>complete</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>            
              <Grid item xs>
                <DatePicker
                  variant="outlined"
                  margin="dense"
                  label="Outage Start Date"
                  value={state.outageStartDate}
                  onChange={handleChange("outageStartDate")}
                  className={classes.datepicker}
                />              
              </Grid> 
  
              <Grid item xs>     
                <DatePicker
                  className={classes.datepicker}
                  variant="outlined"
                  margin="dense"
                  label="Outage End Date"
                  minDate={state.outageStartDate}
                  value={state.outageEndDate}
                  onChange={handleChange("outageEndDate")} 
                /> 
              </Grid>            
            </Grid> 
            <Grid container spacing={4}>
              <Grid item xs>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="duration"
                  label="DURATION"
                  name="duration"
                  autoComplete="duration"
                  autoFocus
                  value={state.duration}
                  onChange={handleChange('duration')}
                />
              </Grid>
              <Grid item xs>
                <FormControl
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    className={classes.formControl}
                  >
                    <InputLabel ref={inputLabel} id="validation">
                      VALIDATION
                    </InputLabel>
                    <Select
                      labelId="validation"
                      id="validation"
                      value={state.validation}
                      onChange={handleChange("validation")}
                      labelWidth={130}
                    >
                      <MenuItem value={"true"}>true</MenuItem>
                      <MenuItem value={"false"}>false</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    className={classes.formControl}
                  >
                    <InputLabel ref={inputLabel} id="rebootRequired">
                      REBOOT REQUIRED
                    </InputLabel>
                    <Select
                      labelId="rebootRequired"
                      id="rebootRequired"
                      value={state.rebootRequired}
                      onChange={handleChange("rebootRequired")}
                      labelWidth={130}
                    >
                      <MenuItem value={"true"}>true</MenuItem>
                      <MenuItem value={"false"}>false</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs />              
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs />
              <Grid item xs />
              <Grid item xs />
              <Grid item xs>
                {loader && <CircularProgress />}
              </Grid>
              <Grid item xs>
                <Button          
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmit}
                >
                  submit
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  fullWidth
                  margin="dense"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid> 
          </form>
        </div>
      </Modal>
    </div>
  );
}