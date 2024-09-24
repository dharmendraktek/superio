'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Paper from '@/components/common/Paper';
import axios from 'axios';
import { useSelector } from 'react-redux';

const localizer = momentLocalizer(moment);

let attandanceData = [
  {
      "id": 1435,
      "status": {
          "id": 8,
          "status_code": 101,
          "type": "absent"
      },
      "user_id": "1972",
      "username": "Dharmendra Patel",
      "shift_in_time": "13:00:00",
      "shift_out_time": "22:00:00",
      "late_status": "NOLATE",
      "first_timestamp": "2024-09-16T12:59:20Z",
      "last_timestamp": "2024-09-16T12:59:20Z",
      "duration": "9h 1m",
      "all_timestamps": "['2024-09-16 12:59:20', '2024-09-16 22:00:23']",
      "created_at": "2024-09-16T12:59:20Z",
      "updated_at": "2024-09-16T12:59:20Z"
  },
  {
      "id": 1552,
      "status": {
          "id": 8,
          "status_code": 101,
          "type": "absent"
      },
      "user_id": "1972",
      "username": "Dharmendra Patel",
      "shift_in_time": "13:00:00",
      "shift_out_time": "22:00:00",
      "late_status": "NOLATE",
      "first_timestamp": "2024-09-17T13:03:28Z",
      "last_timestamp": "2024-09-17T13:03:28Z",
      "duration": "9h 3m",
      "all_timestamps": "['2024-09-17 13:03:28', '2024-09-17 22:07:21']",
      "created_at": "2024-09-17T13:03:28Z",
      "updated_at": "2024-09-17T13:03:28Z"
  }
]

const AttendanceCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const employee = useSelector((state) => state.employer.user);

  const handleGetUserAttendanceDetails = async () => {
    try {
      // const response = await axios.get(`http://10.10.105.228:8000/attendance-details/?emp_code=${employee.empcode}`);
      // if (response.data) {
        const transformedEvents = attandanceData.map(record => {
          const startTime = moment(record.first_timestamp).toDate();
          const endTime = moment(record.last_timestamp).toDate();
          const duration = moment.utc(moment(endTime).diff(moment(startTime))).format("HH:mm");

          return {
            title: record.status.type === 'absent'
              ? 'Absent'
              : `Check-In: ${moment(startTime).format('HH:mm')}, Check-Out: ${moment(endTime).format('HH:mm')}`,
            start: startTime,
            end: endTime,
            allDay: record.status.type === 'absent',
            resource: {
              status: record.status.type === 'absent' ? 'Absent' : getStatus(record.shift_in_time, record.first_timestamp),
              date: moment(startTime).format('YYYY-MM-DD'),
              duration, // Add duration to resource
            },
          };
        });

        setEvents(transformedEvents);
      // }
    } catch (error) {
      console.error('Error fetching attendance details:', error);
    }
  };

  useEffect(() => {
    if (employee?.empcode) {
      handleGetUserAttendanceDetails();
    }
  }, [employee]);

  const getStatus = (shiftInTime, checkInTime) => {
    const checkInMoment = moment(checkInTime);
    const expectedCheckIn = moment(shiftInTime, 'HH:mm:ss');
    return checkInMoment.isAfter(expectedCheckIn) ? 'Late' : 'On Time';
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
        <div className='d-flex'>
          <button onClick={() => changeView(Views.MONTH)}>Month</button>
          <button onClick={() => changeView(Views.WEEK)}>Week</button>
          <button onClick={() => changeView(Views.DAY)}>Day</button>
        </div>
      </div>
    );
  };

  return (
    <Paper>
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
          tooltipAccessor={(event) => `Duration: ${event.resource.duration}`} // Tooltip for duration
        />
      </div>
    </Paper>
  );
};

export default AttendanceCalendar;
