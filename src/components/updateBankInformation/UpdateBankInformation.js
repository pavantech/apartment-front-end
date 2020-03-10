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

export default function UpdateBankInformation(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [loader, setLoader] = React.useState(false);

  const onSubmit = () => {    
    setLoader(true);
    const url = "//localhost:5000/api/bankInformation";
    const requestData = {
       accountNumber: state.accountNumber,
      ifscCode: state.ifscCode,
      bankName: state.bankName,
      bankAddress: state.bankAddress,
      branchName: state.branchName,
      pincode: state.pincode,
      city: state.city,
      state1: state.state1,
      country: state.country
    };

    console.log("requestta", requestData);
    const requestOption = {
      method: "POST",
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
    bankName: props.rowData ? props.rowData[0] : '',
    accountNumber: props.rowData ? props.rowData[1] : '',
    ifscCode: props.rowData ? props.rowData[2] : '',
    bankAddress: props.rowData ? props.rowData[3] : '',
    branchName: props.rowData ? props.rowData[4] : '',
    pincode: props.rowData ? props.rowData[5] : '',
    city: props.rowData ? props.rowData[6] : '',
    state1: props.rowData ? props.rowData[7] : '',
    country: props.rowData ? props.rowData[8] : ''
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
            <Grid container spacing={2}>
              <Grid item xs>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="accountNumber"
                  label="ACCOUNT NUMBER"
                  name="accountNumber"
                  autoComplete="accountNumber"
                  value={state.accountNumber}
                  onChange={handleChange("accountNumber")}
                />
              </Grid>
              <Grid item xs>
                 <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="ifscCode"
                  label="IFSC CODE"
                  name="ifscCode"
                  autoComplete="ifscCode"
                  value={state.ifscCode}
                  onChange={handleChange("ifscCode")}
                />
              </Grid>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="bankName"
                  label="BANK NAME"
                  name="bankName"
                  autoComplete="bankName"
                  value={state.bankName}
                  onChange={handleChange("bankName")}
                />
              </Grid>
              <Grid item xs>
               <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="bankAddress"
                  label="BANK ADDRESS"
                  name="bankAddress"
                  autoComplete="bankAddress"
                  value={state.bankAddress}
                  onChange={handleChange("bankAddress")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs>
                 <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="branchName"
                  label="BRANCH NAME"
                  name="branchName"
                  autoComplete="branchName"
                  value={state.branchName}
                  onChange={handleChange("branchName")}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="pincode"
                  label="PINCODE"
                  name="pincode"
                  autoComplete="pincode"
                  value={state.pincode}
                  onChange={handleChange("pincode")}
                />
              </Grid>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="city"
                  label="CITY"
                  name="city"
                  autoComplete="city"
                  value={state.city}
                  onChange={handleChange("city")}
                />
              </Grid>
               <Grid item xs>
              <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="state1"
                  label="STATE"
                  name="state1"
                  autoComplete="state1"
                  value={state.state1}
                  onChange={handleChange("state1")}
                />
                </Grid>
            </Grid>
            <Grid container spacing={2}>             
              <Grid item xs>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="country"
                  label="CONUNTRY"
                  name="country"
                  autoComplete="country"
                  value={state.country}
                  onChange={handleChange("country")}
                />
              </Grid>
             <Grid item xs>
           </Grid>

              <Grid item xs></Grid>                                         
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
              <Grid item xs></Grid>
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
                  margin="dense"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmit}
                >
                  Submit
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