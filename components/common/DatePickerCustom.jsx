

"use client"

import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import { reactIcons } from '@/utils/icons';
import "react-datepicker/dist/react-datepicker.css";


const DatePickerCustom = ({
  error,
  className,
  date,
  handleDate,
  dateFormat = 'MMMM d, yyyy',
}) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="d-flex justify-content-between text-black   pe-8"
      onClick={onClick}
      ref={ref}
      style={{width: "100%"}}
    >
      {value}
    </button>
  ));
  
  return (
    <div className="">
      <div
        className={`d-flex justify-items-center px-2 border border-black  rounded-1 position-relative rounded-md h-[45px] date-sm w-48 ${
          error ? ' border-red ' : 'border-c'
        } ${className}`}
        style={{height:'36px', border:'1px solid rgb(8, 8, 8)'}}
      >
        <ReactDatePicker
          onChange={(date) => {
            handleDate(date);
          }}
          selected={date || new Date()}
          dateFormat={dateFormat}
          showPopperArrow={false}
          popperModifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 5],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                rootBoundary: 'viewport',
                tether: false,
                altAxis: true,
              },
            },
          ]}
          customInput={<CustomInput />}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="d-flex justify-content-between justify-items-center gap-6 px-2 py-1">
              <button
                className="flex-center w-9 h-9 bg-primary-100 rounded-full fs-5 text-black"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {reactIcons.arrowleft}
              </button>
              <div>
                <h6 className="fs-4 font-semibold leading-[1]">
                  {moment(date).format('MMMM')}
                </h6>
              </div>

              <button
                className="flex-center w-9 h-9 bg-primary-100 rounded-full fs-5 text-black"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {reactIcons.arrowright}
              </button>
            </div>
          )}
        />
        <span className="ay-center z-[3]  pointer-events-none text-gray-500 text-18 position-absolute" style={{right:"8px"}}>
          {reactIcons.calendar}
        </span>
      </div>
      {error && <div className="text-12 text-red-500 font-medium">{error}</div>}
    </div>
  );
};

export default DatePickerCustom;