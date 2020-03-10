import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import IconDashboard from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import IconBarChart from "@material-ui/icons/BarChart";
import SettingsIcon from "@material-ui/icons/Settings";
import StorageIcon from "@material-ui/icons/Storage";
import AppMenuItem from "./AppMenuItem";

const appMenuItems = [
  /* {
    name: 'HOME',
    link: '/',
    Icon: IconDashboard,
  },
  {
    name: 'Orders',
    link: '/orders',
    Icon: IconShoppingCart,
  },
  {
    name: 'Customers',
    link: '/customers',
    Icon: IconPeople,
  },
  {
    name: 'Reports',
    link: '/reports',
    Icon: IconBarChart,
  },
  */

  {
    name: "Home",
    Icon: HomeIcon,
    items: [
      {
        name: "OWNERS",
        link: "/home"
      },
      {
        name: "PAYMENT INFORMATION",
        link: "/ownerPaymentInformation"
      }

    ]
  },
   {
    name: "ACCOUNT DASHBOARD",
    Icon: StorageIcon,
    items: [
      {
        name: "ACCOUNT INFORMATION",
        link: "/accountbankinformation"
      },
      {
        name: "BANK STATEMENT INFORMATION",
        link: "/accountinformation"
      }
    ]
  },
  {
    name: "APARTMENT EQUIPMENT",
    Icon: IconBarChart, 
    items: [
     {
        name: "APARTMENT EQUIPMENT",
        link: "/apartmentequipment"
      }]
  },
  {
    name: "PARKING INFO",
    Icon: SettingsIcon,
    items: [
      {
        name: "CAR PARKING ALLOTMENT",
        link: "/parkingslotinfo"
      },
      {
        name: "VEHICAL INFORMATION",
        link: "/parkingvehicalinfo"
      },
      {
        name: "CAR PARKING REQUEST",
        link: "/parkingrequestinfo"
      }]
  },
  /*{
    name: "GUEST INFO",
    Icon: SettingsIcon,
    items: [
      {
        name: "GUEST INFO",
        link: "/guest"
      }]
  },*/
 
  {
    name: "EMPLOYEE",
    Icon: SettingsIcon,
    items: [
      {
        name: "EMPLOYEE INFORMATION",
        link: "/employee"
      },
      {
        name: "PAYMENT INFORMATION",
        link: "/employeepayment"
      }
    ]
  },
  {
    name: "HOME SERVICE EXPERT",
    Icon: SettingsIcon,
    items: [
      {
        name: "HOME REFER EXPERT INFORMATION",
        link: "/HomeServiceExpert"
      },
      {
        name: "COMPANY REFER EXPERT INFORMATION",
        link: "/OutsideServiceExpert"
      }
    ]
  },
 /* {
    name: "EVENT DAHBOARD",
    Icon: StorageIcon,
    items: [
      {
        name: "EVENT INFORMATION",
        link: "/eventinformation"
      },
      {
        name: "PERSONAL PAYMENT",
        link: "/home/MAINTENCE"
      },
      {
        name: "Event Suggession",
        link: "/home/MAINTENCE"
      },
      {
        name: "Event Amount Information",
        link: "/home/MAINTENCE"
      }
    ]
  },*/
  /*{
    name: "BOOK SLOT",
    Icon: IconBarChart, 
    items: [{
        name: "BOOK SLOT",
        link: "/bookslot"
      }]
  },*/
  {
    name: "NOTIFICATION INFORMATION",
    Icon: IconBarChart, 
    items: [{
        name: "NOTIFICATION INFORMATION",
        link: "/notification"
      }]
  }
  /*,
   {
    name: "ELECTION INFORMATION",
    Icon: IconBarChart, 
    items: [{
        name: "ELECTION INFORMATION",
        link: "/electionInfo"
      }]
  }*/
  
];

const AppMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: "100%"
    },
    navList: {
      width: drawerWidth
    },
    menuItem: {
      width: drawerWidth
    },
    menuItemIcon: {
      color: "#3F51B5"
    }
  })
);

export default AppMenu;
