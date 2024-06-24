

"use client"

import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import { reactIcons } from '@utils/icons';
const DatePickerCustom = ({
  error,
  className,
  date,
  handleDate,
  dateFormat = 'MMMM d, yyyy',
}) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="flex justify-between text-black  w-full pr-8"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));
  
  return (
    <div className="">
      <div
        className={`flex items-center px-4 border-c relative rounded-md h-[45px] date-sm w-48 ${
          error ? ' border-red-500 ' : 'border-c'
        } ${className}`}
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
            <div className="flex justify-between items-center gap-6 px-2 py-1">
              <button
                className="flex-center w-9 h-9 bg-primary-100 rounded-full text-16 text-white"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {reactIcons.arrowleft}
              </button>
              <div>
                <h6 className="text-16 font-semibold leading-[1]">
                  {moment(date).format('MMMM')}
                </h6>
              </div>

              <button
                className="flex-center w-9 h-9 bg-primary-100 rounded-full text-16 text-white"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {reactIcons.arrowright}
              </button>
            </div>
          )}
        />
        <span className="ay-center z-[3] pointer-events-none text-gray-500 text-18 right-2">
          {reactIcons.arrowdown}
        </span>
      </div>
      {error && <div className="text-12 text-red-500 font-medium">{error}</div>}
    </div>
  );
};

export default DatePickerCustom;