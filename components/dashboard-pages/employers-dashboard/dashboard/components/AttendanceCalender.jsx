'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Paper from '@/components/common/Paper';
import { reactIcons } from '@/utils/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { Button, ButtonGroup } from '@mui/material';

const localizer = momentLocalizer(moment);

const AttendanceCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const employee = useSelector((state) => state.employer.user);

  // const handleGetUserAttendanceDetails = async() => {
  //       const response = await axios.get(`http://10.10.105.226:8000/attendance-details/?emp_code=${employee.empcode}`);
  //       console.log("---------------response ", response);
  //       if(response.status){
  //       }
  // }

  // useEffect(() => {
  //   if(employee?.empcode){
  //     handleGetUserAttendanceDetails(); 
  //   }
  // }, [employee])

  useEffect(() => {
    // Mock data, replace with your API call
    const data = [
      {
        id: 1,
        date: '2024-08-10',
        checkIn: '09:00',
        checkOut: '17:00',
      },
      {
        id: 2,
        date: '2024-08-11',
        checkIn: '09:15',
        checkOut: '17:00',
      },
      {
        id: 3,
        date: '2024-08-12',
        checkIn: '09:00',
        checkOut: '16:30',
      },
      {
        id: 4,
        date: '2024-08-13',
        checkIn: null, // Absent
        checkOut: null,
      },
    ];

    const transformedEvents = data.map((record) => {
      const startTime = record.checkIn
        ? moment(`${record.date} ${record.checkIn}`).toDate()
        : null;
      const endTime = record.checkOut
        ? moment(`${record.date} ${record.checkOut}`).toDate()
        : null;

      return {
        title: record.checkIn
          ? `Check-In: ${record.checkIn}, Check-Out: ${record.checkOut}`
          : 'Absent',
        start: startTime,
        end: endTime,
        allDay: !record.checkIn, // Mark as all-day event if absent
        resource: {
          status: getStatus(record.checkIn),
          date: record.date,
        },
      };
    });

    setEvents(transformedEvents);
  }, []);

  const getStatus = (checkIn) => {
    if (!checkIn) return 'Absent';
    const checkInTime = moment(checkIn, 'HH:mm');
    const expectedTime = moment('09:00', 'HH:mm');
    return checkInTime.isAfter(expectedTime) ? 'Late' : 'On Time';
  };

  const eventPropGetter = (event) => {
    let backgroundColor = '';
    switch (event.resource.status) {
      case 'Late':
        backgroundColor = 'orange';
        break;
      case 'Absent':
        backgroundColor = 'red';
        break;
      default:
        backgroundColor = 'green';
    }
    return { style: { backgroundColor } };
  };

  const dateCellWrapper = ({ value }) => {
    const day = moment(value).format('YYYY-MM-DD');
    const event = events.find((e) => e.resource.date === day);

    let backgroundColor = 'transparent';
    let content = null;

    if (event) {
      switch (event.resource.status) {
        case 'Late':
          backgroundColor = 'orange';
          content = 'Late';
          break;
        case 'Absent':
          backgroundColor = 'red';
          content = 'Absent';
          break;
        default:
          backgroundColor = 'green';
          content = 'Present';
      }
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundColor,
        }}
      >
        <span>{moment(value).date()}</span>
        <span>{content}</span>
      </div>
    );
  };

  const handleNext = () => {
    setDate(moment(date).add(1, 'month').toDate());
  };

  const handlePrev = () => {
    setDate(moment(date).subtract(1, 'month').toDate());
  };

  const CustomToolbar = (toolbar) => {
    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };

    const changeView = (view) => {
      setView(view);
      toolbar.onView(view);
    };

    return (
      <div className="rbc-toolbar">
        <div className='d-flex'>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={goToToday}>Today</button>
          <button onClick={handleNext}>Next</button>
        </div>
        <span className="rbc-toolbar-label">{toolbar.label}</span>
        <div className='d-flex' >
          <button onClick={() => changeView(Views.MONTH)}>Month</button>
          <button onClick={() => changeView(Views.WEEK)}>Week</button>
          <button onClick={() => changeView(Views.DAY)}>Day</button>
        </div>
      </div>
    );
  };

  return (
    <Paper>
      {/* <div className='d-flex justify-content-end mb-2'>
           <button className='theme-btn btn-style-four small'>
            Close
            </button>
      </div> */}
      <div style={{ height: '800px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={date}
          view={view}
          onNavigate={(newDate) => setDate(newDate)}
          onView={(newView) => setView(newView)}
          eventPropGetter={eventPropGetter}
          components={{
            toolbar: CustomToolbar,
            dateCellWrapper,
          }}
          style={{ height: '100%' }}
        />
      </div>
    </Paper>
  );
};

export default AttendanceCalendar;
