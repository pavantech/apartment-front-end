import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {}
};

class CustomToolbar extends React.Component {
  handleClick = () => {
    this.props.displayAddMembers();
  };
  fetchData = () => {
  fetch("......./suggestions/random", {
    method: "GET",
    dataType: "JSON",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  })
  .then((resp) => {
    return resp.json()
  }) 
  .then((data) => {
    this.setState({ suggestion: data.suggestion })                    
  })
  .catch((error) => {
    console.log(error, "catch the hoop")
  })
}

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {/*<Tooltip title={"Add"}>
          <IconButton
            className={classes.iconButton}
            onClick={this.props.displayAddMembers}
          >
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        {/*<Tooltip title={"Edit"}>
          <IconButton
            onClick={this.props.displayUpdateInventoryModal}
            className={classes.iconButton}
          >
            <EditIcon className={classes.editIcon} />
          </IconButton>
        </Tooltip>*/}
     <Tooltip title={"Import"}>
          <IconButton
            className={classes.iconButton}
            onClick={this.props.displayImportInventoryModal}
          >
            <SaveIcon className={classes.saveIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "NotificationCustomToolbar" })(
  CustomToolbar
);
