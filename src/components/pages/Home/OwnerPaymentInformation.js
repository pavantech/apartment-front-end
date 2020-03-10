import React, { useState, useEffect } from "react";
/// import DatePicker from "../datePicker/DatePicker";
import * as moment from 'moment';
import { ScaleLoader } from 'react-spinners';

import MUIDataTable from "mui-datatables";
import clsx from "clsx";
import {
  makeStyles,
  withTheme,
  useTheme,
  withStyles
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from "@material-ui/core/Button";
import AddMembers from "../../addMembers/AddMembers";
import ImportInventoryModal from "../../importInventoryModal/ImportInventoryModal";
import UpdateInventoryModal from "../../updateInventoryModal/UpdateInventoryModal";
import AppMenu from "../../sidebar/AppMenu";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import CustomToolbar from "../../customToolbar/CustomToolbar";
import CustomToolbarSelect from "../../customToolbar/CustomToolbarSelect";
import BulkUpdateInventoryModal from "../../bulkUpdateInventoryModal/BulkUpdateInventoryModal";
import { TableCell } from "@material-ui/core";

const style = {
  position: "sticky",
  left: 0,
  background: "white",
  zIndex: 101,
  width: "200px"
};

const style2 = {
  position: "sticky",
  left: "350px",
  background: "white",
  zIndex: 999
};

const drawerWidth = 240;

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiToolbar: {
        regular: {
          minHeight: "48px !important"
        }
      },
      MuiPaper: {
        root: {
          width: "97vw",
          overflow: "auto"
        }
      },
      MuiCheckbox: {
        root: {
          padding: "5px !important"
        }
      },
      MuiIconButton: {
        root: {
          padding: "5px !important"
        }
      },
      MuiTableCell: {
        head: {
          background: "#3f51b5 !important",
          color: "#fff",
          padding: "5px !important",
        
          
        },
        body: {
          padding: "5px !important",
          margin: 0,
          width: "auto !important",
          whiteSpace: "nowrap"

        }
      },
      MuiMenu: {
        paper: {
          width: "auto"
        }
      },

      MUIDataTableHeadCell: {
        root: {
          fontSize: "12px",
          padding: "8px",
          background: "red"
        }
      },
      MUIDataTableBodyCell: {
        root: {
          fontSize: "12px",
          padding: "8px"
        }
      }
    }
  });

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    
    background: "#3f51b5",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    minHeight: "48px !important",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  overlay: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    zIndex:  '99999',
    top: 0,
    left: 0,
    background: 'rgba(0,0,0,.5)'
  },
  loader: {
    position: 'fixed',
    zIndex: '999999',
    top: "50vh",
    left: '50vw',
    transform: 'translate(-50%, -50%)'
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

}));

/*function App() {
  return (
   <div className="App">
      <header className="App-header">
        <h1 id='title'>React Dynamic Table</h1>
            <table id='students'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
      </header>
    </div>
  );
}
*/

export default function OwnerPaymentInformation(props) {
 

  let selectedRowIndx = null;
  const [loader, setLoader] = useState(true);
  const [state, setState] = useState({
  
    addMembers: false,
    importInventoryModal: false,
    updateInventoryModal: false,
    bulkUpdateInventoryModal:false,
    open: false,
    selectedRowIndx: null,
    todos: [],
    rows: [],
    tableData: {
      columns: [
        {
          name: "",
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => displayUpdateInventoryModal(tableMeta.rowIndex)}
                  edge="start"
                  className={clsx(
                    classes.menuButton,
                    state.open && classes.hide
                  )}
                >
                  <EditIcon />
                </IconButton>
              );
            }
          }
        },
        {
          name: "DEPOSIT AMOUNT",
          options: {
            filter: false,
            customHeadRender: (a, b) => (
              <TableCell
                style={{
                  ...style,
                  top: 0,
                  left: "1px",
                  zIndex: 999,
                  width: "200px"
                }}
              >
                DEPOSIT AMOUNT
              </TableCell>
            ),
            setCellProps: () => ({ style })
          }
        },
        {
          name: "CURRENT AMOUNT",
          options: {
            filter: false
          },
        }, 
        "TOTAL AMOUNT",
        "STATEMENT DATE",
        "DEPOSIT OWNER FLAT NO",
        "OWNER NAME",
        "APARTMENT ID"
      ]
    }
  });

  useEffect(() => {
    if (state.rows.length === 0) fetchData();
  });

  const onRowsDelete = param => {
    console.log(param)
    if (!window.confirm("do you want to delete ?")) {
      return false;
    }

    deleteRows(param);
  };
  
  const deleteRows = async (rowsDelete, data) => {
    try {
      for (let { index } of rowsDelete.data) {
        console.log("print ....... ", index, state.rows[index]);

        const requestData = {
          hostName: state.rows[index][0]
        };

        const requestOption = {
          method: "DELETE",
          mode: "cors",
          body: JSON.stringify(requestData),
          headers: {
            "Content-Type": "application/json"
          }
        };
        // this.props.history.push("/");
        await fetch(
          "//localhost:8081/api/api/delete/" + state.rows[index][0],
          requestOption
        );
      }

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const options = {
    filter: true,
    filterList: [['username']],
    filterType: "dropdown",
    fixedHeader: true,
    responsive: "scroll",
    onRowsDelete: onRowsDelete,
    customToolbar: () => {
      return (
        <CustomToolbar
          displayAddMembers={displayAddMembers}
          displayImportInventoryModal={displayImportInventoryModal}
        />
      );
  },
  customToolbarSelect: selectedRows => (
    <CustomToolbarSelect
      selectedRows={selectedRows}
      onRowsDelete={() => onRowsDelete(selectedRows)}
      displayBulkUpdateInventoryModal={() =>
        displayBulkUpdateInventoryModal(selectedRows)
      }
    />
  )
};

//   flushRowsSelected={this.flushRowsSelected}
// setSome={this.setSome}
  const logout = () => {
    fetch("http://localhost:8081/api/api/logout")
      .then(res => res.json())
      .then(data => {
        // .table(data);
      if(data && data.status &&  data.status.indexOf('sucess') > -1) {
         props.history.push('/')
      }
    });
  }

  const fetchData = () => {
    
    const data = [];
    state.rows = [];
    fetch("http://localhost:5000/api/ownerPaymentInformationList")
      .then(res => res.json())
      .then(data => {
        // .table(data); 
      if(data && data.status &&  data.status.indexOf('Redirect to login page') > -1) {
         props.history.push('/')
      }
      else if(data.length === 0) {
        setLoader(false);
        return null;
      }
    console.log(data)
    for (let {
      depositAmount,
      currentAmount,
      totalAmount,
      statementName,
      statementDate,
      depositOwner,
      ownerName,
      apartmentId
    } of data) {
      state.rows.push([
      depositAmount|| "",
      currentAmount || "",
      totalAmount || "",
      statementName|| "",
      statementDate || "",
      depositOwner || "",
      ownerName || "",
      apartmentId || ""
      ]);
    }
          setState({
          todos: data,
          rows: [...state.rows],
          tableData: { ...state.tableData },
        });
        setLoader(false);
        console.log(JSON.stringify(state.rows));
      })
      .catch(e => console.log(e));
      
      /*

    setState({
      rows: [...statsse.rows],
      tableData: { ...state.tableData }
    });*/
  };

  const handleDrawerOpen = () => {
    setState({ ...state, open: true });
  };

  const handleDrawerClose = () => {
    setState({ ...state, open: false });
  };

  const displayAddMembers = () => {
    setState({ ...state, addMembers: true });
  };

  const displayImportInventoryModal = () => {
    setState({ ...state, importInventoryModal: true });
  };

  const displayUpdateInventoryModal = rowIndex => {
    setState({
      ...state,
      updateInventoryModal: true,
      selectedRowIndx: rowIndex
    
    });
  };
  const displayBulkUpdateInventoryModal = selectedRows => {
    console.log("print selectedRows ", selectedRows);
    setState({
      ...state,
      bulkUpdateInventoryModal: true,
      selectedRows
    });
  };


  const hideAddMembers = () => {
    setState({ ...state, addMembers: false });
    fetchData();
  };

  const hideImportInventoryModal = () => {
    setState({ ...state, importInventoryModal: false });
    fetchData();
  };

  const hideUpdateInventoryModal = () => {
    setState({ ...state, updateInventoryModal: false });
    fetchData();
  };

  const hideBulkUpdateInventoryModal = () => {
    setState({ ...state, bulkUpdateInventoryModal: false });
    fetchData();
  };

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: state.open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, state.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Inventory Dashboard
          </Typography>
          <span>{ window.localStorage && window.localStorage.getItem('username')} </span>
          <Button
            color="inherit"
            style={{ float: "right" }}
            onClick={logout}
            
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={state.open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <AppMenu />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: state.open
        })}
      >
        <AddMembers
          handleClose={hideAddMembers}
          show={state.addMembers}
        />
        <ImportInventoryModal
          handleClose={hideImportInventoryModal}
          show={state.importInventoryModal}
        />
        {state.updateInventoryModal && 
          <UpdateInventoryModal
            handleClose={hideUpdateInventoryModal}
            show={state.updateInventoryModal}
            rowData={state.rows[state.selectedRowIndx]}
          />
        }
        {state.bulkUpdateInventoryModal && 
          <BulkUpdateInventoryModal
            handleClose={hideBulkUpdateInventoryModal}
            show={state.bulkUpdateInventoryModal}
            selectedRows={state.selectedRows.data.map(el => state.rows[el.dataIndex][0])}
          />
        }
        <div style={{ marginTop: "50px" }}>
          {loader && <div className={classes.overlay}>
            <div className={classes.loader}>

              <ScaleLoader
                size={150} // or 150px
                color={'#123abc'}
                loading={loader}
              />
            </div>
          </div>}
          
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"OWNER PAYMENT INFORMATTION"}
              data={state.rows}
              columns={state.tableData.columns}
              options={options}
            />
          </MuiThemeProvider>
        </div>
      </main>
    </div>
  );
}
// export default withTheme(withStyles(useStyles)(Home));
