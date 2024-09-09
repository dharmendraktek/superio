"use client";

import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { reactIcons } from "@/utils/icons";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerCustom = ({
  error,
  className,
  date,
  handleDate,
  dateFormat = "MMMM d, yyyy",
  showTime = false, // Default is false, if not passed
}) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="text-black w-100 text-start"
      onClick={onClick}
      ref={ref}
    >
      {value || (showTime ? 'Select Time' : 'Select Date')}
    </button>
  ));

  return (
    <div className="">
      <div
        className={`d-flex justify-items-center px-2 border-bottom border-black position-relative rounded-md h-[45px] date-sm w-48 ${
          error ? "border-red" : "border-c"
        } ${className}`}
        style={{ height: "36px", borderBottom: "1px solid rgb(8, 8, 8)" }}
      >
        <ReactDatePicker
          onChange={(date) => {
            handleDate(date);
          }}
          selected={date}
          dateFormat={showTime ? "h:mm aa" : dateFormat} // Show only time when `showTime` is true
          showPopperArrow={false}
          showYearDropdown={!showTime} // Disable year dropdown when `showTime` is true
          showMonthDropdown={!showTime} // Disable month dropdown when `showTime` is true
          showTimeSelect={showTime} // Enable time picker only when `showTime` is true
          showTimeSelectOnly={showTime} // Show only the time picker if `showTime` is true
          timeIntervals={15} // Set time intervals for the time picker
          timeCaption="Time"
          timeFormat="h:mm aa" // 12-hour format, you can change it to `HH:mm` for 24-hour format
          customInput={<CustomInput />}
          popperModifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 5],
              },
            },
            {
              name: "preventOverflow",
              options: {
                rootBoundary: "viewport",
                tether: false,
                altAxis: true,
              },
            },
          ]}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
            changeYear,
            changeMonth,
          }) => (
            !showTime && ( // Only show this header if not in time picker mode
              <div className="d-flex justify-content-between justify-items-center gap-6 px-2 py-1">
                <button
                  className="flex-center w-9 h-9 bg-primary-100 rounded-full fs-5 text-black"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {reactIcons.arrowleft}
                </button>
                <div className="d-flex gap-2 align-items-center">
                  <select
                    value={moment(date).year()}
                    onChange={({ target: { value } }) => changeYear(value)}
                    className="form-select"
                  >
                    {Array.from(
                      { length: 100 },
                      (_, i) => moment().year() - i
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={moment(date).month()}
                    onChange={({ target: { value } }) => changeMonth(value)}
                    className="form-select"
                  >
                    {moment.months().map((month, index) => (
                      <option key={month} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="flex-center w-9 h-9 bg-primary-100 rounded-full fs-5 text-black"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {reactIcons.arrowright}
                </button>
              </div>
            )
          )}
        />
        <span
          className="ay-center z-[3] pointer-events-none text-gray-500 text-18 position-absolute"
          style={{ right: "8px" }}
        >
          {showTime ? reactIcons.time : reactIcons.calendar}
        </span>
      </div>
      {error && (
        <div className="text-12 text-red-500 font-medium">{error}</div>
      )}
    </div>
  );
};

export default DatePickerCustom;
