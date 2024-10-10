import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimePickerCustom = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}  // You can set the intervals in minutes (e.g., 15 mins)
        timeCaption="Time"
        dateFormat="h:mm aa"  // Customize to display hours and minutes
      />
    </div>
  );
};

export default TimePickerCustom;
