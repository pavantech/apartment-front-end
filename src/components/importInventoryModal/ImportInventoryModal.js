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
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from "@material-ui/core/NativeSelect";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "50%",
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
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  input: {
    display: "none"
  },
  loader: {
    width: "16px !important",
    height: "16px !important",
    marginLeft: "10px"
  }
}));

export default function ImportInventoryModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [loader, setLoader] = React.useState(false);

  const onSubmit = () => {
    setLoader(true);
    const url = "//localhost:5000/api/upload";
    const requestData = new FormData();
    requestData.append("file", state.selectedFile); 
    requestData.append("depositAmount", total.depositAmount);
    requestData.append("depositOwnerFlatNo", owner.depositOwnerFlatNo);
    requestData.append("amountType", type.amountType);
    console.log("requestta", requestData);
    const requestOption = {
      method: "POST",
      mode: "cors",
      body: requestData
    };
    
    // this.props.history.push("/");
    fetch(url, requestOption)
      .then(res => {
        console.log("print res", res);
        setLoader(false);
        setDepositAmount({depositAmount: null});
        setDepositOwnerFlatNo({depositOwnerFlatNo: null});
        setAmountType({amountType: null});
        setState({selectedFile: null});
        props.handleClose();
      })
      .catch(err => console.log(err));
  };
  
  const [state, setState] = React.useState({
    selectedFile: null
    
  });
  const [total, setDepositAmount] = React.useState({depositAmount: ""});
  const [owner, setDepositOwnerFlatNo] = React.useState({depositOwnerFlatNo: ""});
  const [type, setAmountType] = React.useState({amountType: ""});

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleChange = name => event => {
    setDepositAmount({ depositAmount: event.target.value});

  };
  const handleChange2 = name => event => {
    setDepositOwnerFlatNo({ depositOwnerFlatNo: event.target.value});
  

  };
  const handleChange3 = name => event => {
    setAmountType({ amountType: event.target.value});
  

  };
  const handleChange1 = name => event => {
    setState({ selectedFile: event.target.files[0] });
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
          <h2 id="simple-modal-title">ADD BANK BALANCE INFORMATION</h2>
          <form className={classes.form} noValidate onSubmit={() => false}>
              <Grid container spacing={4}>
              <Grid item xs>
                  <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="depositAmount"
                  label="Deposit Amount"
                  name="depositAmount"
                  autoComplete="depositAmount"
                  value={state.depositAmount}
                  onChange={handleChange("depositAmount")}
                />
              </Grid>
              <Grid item xs>
                  <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="depositOwnerFlatNo"
                  label="Deposit Owner FLAT NO"
                  name="depositOwnerFlatNo"
                  autoComplete="depositOwnerFlatNo"
                  value={state.depositOwnerFlatNo}
                  onChange={handleChange2("depositOwnerFlatNo")}
                />
              </Grid>
              </Grid>
               <Grid container spacing={4}>
              <Grid item xs>
                <FormControl
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  className={classes.formControl}
                >
                  <InputLabel ref={inputLabel} id="amountType">
                    AMOUNT TYPE
                  </InputLabel>

                  <Select
                    labelId="amountType"
                    id="amountType"
                    value={state.consoleInfo}
                    onChange={handleChange3("amountType")}
                    labelWidth={130}
                    marginRight
                  >
                    <MenuItem value={"MAINTENANCE"}>MAINTENANCE</MenuItem>
                    <MenuItem value={"EVENT"}>EVENT</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

            </Grid>
            <Grid container spacing={4}>
              <Grid item xs>
                <input
                  accept="*/*"
                  className={classes.input}
                  id="outlined-button-file"
                  type="file"
                  name="selectedFile"
                  onChange={handleChange1("selectedFile")}
                  
                />
                <label htmlFor="outlined-button-file">
                  <Button
                    variant="contained"
                    margin="dense"
                    color="primary"
                    component="span"
                    className={classes.button}
                  >
                    Choose file
                  </Button>
                </label>
              </Grid>
              <Grid item xs>
                {total.depositAmount && total.depositAmount.value}
                {owner.depositOwnerFlatNo && owner.depositOwnerFlatNo.value}
                {type.amountType && type.amountType.value}
                {state.selectedFile && state.selectedFile.name}
                {loader && <CircularProgress className={classes.loader} />}
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  margin="dense"
                  color="primary"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  onClick={onSubmit}
                >
                  Upload
                </Button>
              </Grid>

              <Grid item xs>
                <Button
                  variant="contained"
                  margin="dense"
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

/*

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./modal.css";
import "./App.scss";

class ImportInventory extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form class="modal-content animate" onSubmit={this.handleSubmit}>
        <div class="container">
          <label for="uname">
            <b>UPLOAD IVENTORY</b>
          </label>
          <input
            type="file"
            placeholder="Enter Username"
            name="uname"
            required
          />

          <button type="submit">SUBMIT</button>
        </div>
      </form>
    );
  }
}
export default ImportInventory;
*/
