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
import moment from 'moment';

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
  loader: {
    width: "16px !important",
    height: "16px !important",
    marginLeft: "10px"
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

export default function UpdateInventoryModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [loader, setLoader] = React.useState(false);

  const onSubmit = () => {    
    setLoader(true);
    const url = "//localhost:5000/api/updateUserRegister";
    const requestData = {
        fullName: state.fullName,
      username: state.username,
      password: state.password,
      flatNo: state.flatNo,
      emailId: state.emailId,
      mobile: state.mobile,
      type: state.type
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
    // this.props.history.push("/");
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
    });
  };

  console.log(props.rowData)
  const [state, setState] = React.useState({
    fullName: props.rowData ? props.rowData[0] : '',
    username: props.rowData ? props.rowData[1] : '',
    password: props.rowData ? props.rowData[7] : '',
    flatNo: props.rowData ? props.rowData[2] : '',
    emailId: props.rowData ? props.rowData[3] : '',
    mobile: props.rowData ? props.rowData[4] : '',
    type: props.rowData ? props.rowData[5] : ''
  });

  /*console.log("outageStartDate",props.rowData[21] )
  console.log("outageEndDate", props.rowData[22])
  console.log("duration",props.rowData[20])*/

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleChange = name => event => {
    let duration = null;
    let value = null;
    if(name === 'outageStartDate') {
      console.log("print start date ... ", event);
     
       const time = moment(new Date(event)).format("YYYY-MM-DD hh:mm:ss");
        console.log(" outageEndDate ", time);
        // console.log(" outageEndDate pst", moment(time, "YYYY-MM-DD hh:mm:ss").subtract(8, 'hours').format("YYYY-MM-DD hh:mm:ss"));
        //debugger;
        console.log("local outageEndDate ", new Date(event));
        

      duration = (moment(state.outageEndDate, 'YYYY-MM-DD hh:mm:ss').toDate()) - new Date(event);
      let outageEndDate = null;
      if(duration < 0) {
        outageEndDate = event;
        duration = 0;
       

        setState({
          ...state,
          outageEndDate: outageEndDate
        });
      }
      value = time;
      
    } 
    else if(name ==='outageEndDate') {
      const time = moment(new Date(event)).format("YYYY-MM-DD hh:mm:ss");
      duration = new Date(event) - (moment(state.outageStartDate, 'YYYY-MM-DD hh:mm:ss').toDate())
      value = time;
    }
    else if(value === null) {
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
               <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="fullName"
                  label="FULL NAME"
                  name="fullName"
                  autoComplete="fullName"
                  value={state.fullName}
                  onChange={handleChange("fullName")}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="username"
                  label="USER NAME"
                  name="username"
                  autoComplete="username"
                  value={state.username}
                  onChange={handleChange("username")}
                />
              </Grid>            
              <Grid item xs>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="password"
                  label="PASSWORD"
                  name="password"
                  autoComplete="password"
                  type="password"
                  value={state.password}
                  onChange={handleChange("password")}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="flatNo"
                  label="FLAT NO"
                  name="flatNo"
                  autoComplete="flatNo"
                  value={state.flatNo}
                  onChange={handleChange("flatNo")}
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
                  id="emailId"
                  label="EMAIL ID"
                  name="emailId"
                  autoComplete="emailId"
                  value={state.emailId}
                  onChange={handleChange("emailId")}
                />
              </Grid>
              <Grid item xs>
                 <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="mobile"
                  label="MOBILE"
                  name="mobile"
                  autoComplete="mobile"
                  value={state.mobile}
                  onChange={handleChange("mobile")}
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
                  <InputLabel ref={inputLabel} id="type">
                    TYPE
                  </InputLabel>

                  <Select
                    labelId="type"
                    id="type"
                    value={state.consoleInfo}
                    onChange={handleChange("type")}
                    labelWidth={130}
                    marginRight
                  >
                    <MenuItem value={"OWNER"}>OWNER</MenuItem>
                    <MenuItem value={"PRESIDENT"}>PRESIDENT</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs>
              </Grid>
              <Grid item xs>
              </Grid>            
              <Grid item xs>
                             
              </Grid>                
              <Grid item xs>     
              </Grid>  
            </Grid>
            <Grid container spacing={4}>           
              <Grid item xs>
                
              </Grid>
              <Grid item xs>
                
              </Grid>               
              <Grid item xs>
              </Grid>          
              <Grid item xs>
              </Grid>
            </Grid>

            <Grid container spacing={6}>
              <Grid item xs />
              <Grid item xs />
              <Grid item xs />
              <Grid item xs>
                {loader && <CircularProgress className={classes.loader} />}
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