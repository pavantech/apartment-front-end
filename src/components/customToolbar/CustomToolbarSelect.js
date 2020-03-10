import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterIcon from "@material-ui/icons/FilterList";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
const defaultToolbarSelectStyles = {
  iconButton: {
    marginRight: "24px",
    top: "50%",
    display: "inline-block",
    position: "relative",
    transform: "translateY(-50%)"
  },
  deleteIcon: {
    color: "#000"
  }
};

class CustomToolbarSelect extends React.Component {
  handleClick = () => {
    console.log("click! current selected rows", this.props.selectedRows);

  };

  render() {
    const { classes } = this.props;

    return (
      <div className={"custom-toolbar-select"}>
       {/* <Tooltip title={"Edit"}>
          <IconButton
            onClick={this.props.displayBulkUpdateInventoryModal}
            className={classes.iconButton}
          >
            <EditIcon className={classes.editIcon} />
          </IconButton>
        </Tooltip>*/}
        <Tooltip title={"Delete"}>
          <IconButton className={classes.iconButton} onClick={this.props.onRowsDelete}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelect);
