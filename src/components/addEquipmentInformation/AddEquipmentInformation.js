import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import MenuItem from "@material-ui/core/MenuItem";
import { DateTimePicker } from "@material-ui/pickers";
import DatePicker from "../datePicker/DatePicker";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
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

export default function AddEquipmentInformation(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [loader, setLoader] = React.useState(false);
  const onSubmit = () => {
    setLoader(true);
    const url = "//localhost:5000/api/equipmentInfomation";
    const requestData = {
      equipmentId: state.equipmentId,
      equipmentName: state.equipmentName,
      equipmentPrice: state.equipmentPrice,
      equipmentType: state.equipmentType,
     
      //markedForDecom: state.markedForDecom
    };
    console.log(props.rowData)
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
      .then(res => res.json())
      .then(res => {
        if(res.errorCode === 401){
          alert(res.message)
        }
        else {
          console.log("rpint res", res.message);
          alert(res.message);
        }
        setLoader(false);
        props.handleClose();
      })
      .catch(err => {
        alert("failed to Add : Record Already Exists")
        console.log(err)
      });
  };

  const [state, setState] = React.useState({
    equipmentId: "",
    equipmentName: "",
    equipmentPrice: "",
    equipmentType: ""
   
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
   const handleChange = name => event => {
    //let duration = null;
    let value = null;
    if(value === null) {
      value = event.target.value;
    }
    setState({
      ...state,
      [name]: value
     // duration: duration !== null ? `${Math.floor(duration/3600000)}hr ${(duration%3600000)/60000}mins` : state.duration
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
          <h2 id="simple-modal-title">ADD EQUIPMENT </h2>


          <form className={classes.form} noValidate onSubmit="()=> false">
            <Grid container spacing={2}>
              <Grid item xs>
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="equipmentId"
                  label="EQUIPMENT ID"
                  name="equipmentId"
                  autoComplete="equipmentId"
                  value={state.equipmentId}
                  onChange={handleChange("equipmentId")}
                />
              </Grid>
              <Grid item xs>
                 <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="equipmentName"
                  label="EQUIPMENT NAME"
                  name="equipmentName"
                  autoComplete="equipmentName"
                  value={state.equipmentName}
                  onChange={handleChange("equipmentName")}
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
                  id="equipmentPrice"
                  label="EQUIPMENT PRICE"
                  name="equipmentPrice"
                  autoComplete="equipmentPrice"
                  value={state.equipmentPrice}
                  onChange={handleChange("equipmentPrice")}
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
                  <InputLabel ref={inputLabel} id="equipmentType">
                    EQUIPMENT TYPE
                  </InputLabel>

                  <Select
                    labelId="equipmentType"
                    id="equipmentType"
                    value={state.consoleInfo}
                    onChange={handleChange("equipmentType")}
                    labelWidth={130}
                    marginRight
                  >
                    <MenuItem value={"PERMANENT"}>PERMANENT</MenuItem>
                    <MenuItem value={"DAYEQUIPMENT"}>DAYEQUIPMENT</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>  
            <Grid container spacing={2}>             
             <Grid item xs>
              </Grid>
             <Grid item xs></Grid>
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
