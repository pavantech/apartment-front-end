import React from "react";
import * as moment from 'moment';
import DayJSUtils from "@date-io/dayjs";
import { DateTimePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
class DatePicker extends React.Component {
  render() {
    return (
      <div>
        <MuiPickersUtilsProvider utils={DayJSUtils}>
          <DateTimePicker
            {...this.props}
            format="YYYY-MM-DD hh:mm:ss"
            //format="DD/MM/YYYY hh:mm "
            // format="YYYY-MM-DDTHH:MM:SS.SSSZ"
            //format={moment("YYYY-MM-DDTHH:MM:SS.SSSZ").format('DD/MM/YYYY hh:mm')}
            var json = {JSON.stringify(DatePicker)}
            autoOk
            ampm={false}
        
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default DatePicker;
