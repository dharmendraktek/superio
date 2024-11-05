import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegClock } from "react-icons/fa"; // Importing a clock icon from react-icons

const TimePickerCustom = ({ handleTime, value }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Custom input component for the DatePicker
  const CustomInput = ({ value, onClick }) => (
    <div className="custom-input" onClick={onClick}>
      <input
        type="text"
        value={value}
        readOnly
        placeholder="Select Time"
        className="input-with-icon"
      />
      <FaRegClock className="icon" /> {/* Clock icon */}
    </div>
  );

  return (
    <div>
      <DatePicker
        selected={value}  // Pass Date object here
        onChange={handleTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={1} // Allow selection of each minute
        timeCaption="Time"
        dateFormat="h:mm:ss aa" // Display hours, minutes, and seconds
        customInput={<CustomInput />}
      />
      <style jsx>{`
        .custom-input {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ccc; /* Bottom border */
          padding: 5px;
          cursor: pointer; /* Make the entire input clickable */
        }

        .input-with-icon {
          border: none;
          outline: none;
          flex: 1;
          font-size: 16px;
          background: none;
          cursor: pointer;
        }

        .icon {
          margin-left: 8px;
          color: #888;
          font-size: 18px;
        }

        .custom-input:hover {
          border-color: #333; /* Change border color on hover */
        }
      `}</style>
    </div>
  );
};

export default TimePickerCustom;
