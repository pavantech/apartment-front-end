import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import {  } from "@material-ui/styles";
import { Redirect } from "react-router-dom";
//import logo from "./.png";

const useStyles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    height: "120px",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

// const classes = useStyles();

class Forgotpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apartmentId: "",
      username: "",
      loginSuccess: false
    };
  }

  onSubmit = () => {
    const url = "//localhost:5000/api/adminRegister";
    const requestOption = {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    };

    /*fetch(url, requestOption)
    .then(res => res.json())
    .then(res => {
      console.log("rpint res", res);
      if (res.status !== "Failed") {
        this.setState({ loginSuccess: true });
      } else {
        alert("login failed");
      }
    })*/
    
    
    fetch(url, requestOption)
      .then(res => res.json())
      .then(res => {
        console.log("print res", res);
        if(res.status === 'Success') {
          if('localStorage' in window) {
            window.localStorage.setItem('username', this.state.username);
          }
          
          setTimeout(() => {
          this.props.history.push('/') 
          //this.setState({loginSuccess: true})
          }, 2000);

        }
        else {
          alert(res.status);
        }
      })
      .catch(err => console.log(err));
  };

  updateUserDetail = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  renderRedirect() {
    if (this.state.loginSuccess) {
      return <Redirect to="/" />;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="md">
        {this.renderRedirect()}
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs>
              <h1> LOGO</h1>
            </Grid>
            <Grid item xs>
              <Typography
                component="h1"
                variant="h4"
                style={{ textAlign: "left" }}
              >
                VNR TOWERS
              </Typography>
              <form className={classes.form} noValidate onSubmit="()=> false">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="apartmentId"
                  label="ApartmentId"
                  name="apartmentId"
                  autoComplete="apartmentId"
                  autoFocus
                  onChange={e => this.updateUserDetail(e)}
                  value={this.state.apartmentId}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={e => this.updateUserDetail(e)}
                  value={this.state.username}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.onSubmit}
                >
                  Forgot
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/" variant="body2">
                      Login </Link>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Forgotpassword);
