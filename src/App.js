import React from "react";
// import logo from './logo.svg';
// import './App.scss';
// import Button from "react-bootstrap/Button";
// import NavbarPage from "./NavbarPage";
// import SingleInventory from "./components/pages/SingleInventory";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import Home from "./components/pages/Home";
//import FAQs from "./components/pages/Home/FAQs";
//import PatchingProcess from "./components/pages/Home/PatchingProcess";
//import PatchingCycles from "./components/pages/Home/PatchingCycles";
//import TechTools from "./components/pages/Home/TechTools";
//import ToolView from "./components/pages/Home/ToolView";
import Error from "./components/pages/Error";

// import ImportInventory from "./components/pages/ImportInventory";
// import UserSettings from "./components/pages/UserSettings";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Forgotpassword from "./components/pages/Forgotpassword"
//import Maintenace from "./components/pages/Home/Maintenace"
import AccountInformation from "./components/pages/Home/AccountInformation"
import AccountBankInformation from "./components/pages/Home/AccountBankInformation"
import OwnerPaymentInformation from "./components/pages/Home/OwnerPaymentInformation"
import ApartmentEquipment from "./components/pages/Home/ApartmentEquipment"
import EventInformation from "./components/pages/Home/EventInformation"
import BookSlot from "./components/pages/Home/BookSlot"
import EmployeeInformation from "./components/pages/Home/EmployeeInformation"
import EmployeePaymentInformation from "./components/pages/Home/EmployeePaymentInformation"
import GuestInformation from "./components/pages/Home/GuestInformation"
import NotificationInformation from "./components/pages/Home/NotificationInformation"
import ParkingVehicalInfo from "./components/pages/Home/ParkingVehicalInfo"
import ParkingSlotInfo from "./components/pages/Home/ParkingSlotInfo"
import ParkingRequestInfo from "./components/pages/Home/ParkingRequestInfo"

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

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route exact path="/register" name="home Page" component={Register} />
           <Route exact path="/home" name="home Page" component={Home} />
           <Route exact path="/forgot" name="forgot" component={Forgotpassword} />
            <Route exact path="/ownerPaymentInformation" name="owner payment information" component={OwnerPaymentInformation} />
             <Route exact path="/accountinformation" name="forgot" component={AccountInformation} />
              <Route exact path="/apartmentequipment" name="forgot" component={ApartmentEquipment} />
              <Route exact path="/eventinformation" name="forgot" component={EventInformation} />
              <Route exact path="/bookslot" name="forgot" component={BookSlot} />
              <Route exact path="/employee" name="forgot" component={EmployeeInformation} />
              <Route exact path="/accountbankinformation" name="forgot" component={AccountBankInformation} />
              <Route exact path="/notification" name="forgot" component={NotificationInformation} />
              <Route exact path="/employeepayment" name="forgot" component={EmployeePaymentInformation} />
              <Route exact path="/guest" name="forgot" component={GuestInformation} />
              <Route exact path="/parkingslotinfo" name="forgot" component={ParkingSlotInfo} />
              <Route exact path="/parkingvehicalinfo" name="forgot" component={ParkingVehicalInfo} />
              <Route exact path="/parkingrequestinfo" name="forgot" component={ParkingRequestInfo} />

            {/* <Route path="/single" component={SingleInventory} />
            <Route path="/import" component={ImportInventory} />
    <Route path="/user" component={UserSettings} /> */}
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
