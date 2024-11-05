// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import Paper from '@/components/common/Paper';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const localizer = momentLocalizer(moment);

// const AttendanceCalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [date, setDate] = useState(new Date());
//   const [view, setView] = useState(Views.MONTH);
//   const [hoveredEvent, setHoveredEvent] = useState(null);
//   const employee = useSelector((state) => state.employer.user);

//   const handleGetUserAttendanceDetails = async () => {
//     try {
//       const response = await axios.get(`http://10.10.105.228:8000/attendance-details/?emp_code=${employee.empcode}`);
//       if (response.data) {
//         const transformedEvents = response.data.map(record => {
//           const startTime = moment(record.first_timestamp).format("DD-MM-YYYY HH:mm:ss");
//           const endTime = moment(record.last_timestamp).utc().toDate();

//           console.log("----------------start time --------", startTime);

//           return {
//             title: record.status.type === 'absent'
//               ? 'Absent'
//               : `
//               Check-In: ${moment(startTime).format('HH:mm')},Check-Out: ${moment(endTime).format('HH:mm')}`,
//             start: startTime,
//             end: endTime,
//             allDay: record.status.type === 'absent',
//             resource: {
//               status: record.status.type === 'absent' ? 'Absent' : getStatus(record.first_timestamp, record.last_timestamp),
//               date: moment(startTime).format('YYYY-MM-DD'),
//               duration: moment.duration(moment(endTime).diff(moment(startTime))).humanize(),
//               startTime: moment(startTime).format('HH:mm'),
//               endTime: moment(endTime).format('HH:mm'),
//             },
//           };
//         });

//         setEvents(transformedEvents);
//       }
//     } catch (error) {
//       console.error('Error fetching attendance details:', error);
//     }
//   };

//   useEffect(() => {
//     if (employee?.empcode) {
//       handleGetUserAttendanceDetails();
//     }
//   }, [employee]);

//   const getStatus = (shiftInTime, checkInTime) => {
//     const checkInMoment = moment(checkInTime);
//     const expectedCheckIn = moment(shiftInTime, 'HH:mm:ss');
//     return checkInMoment.isAfter(expectedCheckIn) ? 'Late' : 'On Time';
//   };

//   const eventPropGetter = (event) => {
//     let backgroundColor = '';
//     switch (event.resource.status) {
//       case 'Late':
//         backgroundColor = 'orange';
//         break;
//       case 'Absent':
//         backgroundColor = 'red';
//         break;
//       default:
//         backgroundColor = 'green';
//     }
//     return { style: { backgroundColor, height: '100%' } };
//   };

//   console.log("-----------------events -------", events);

//   const dateCellWrapper = ({ value }) => {
//     const day = moment(value).format('YYYY-MM-DD');
//     const event = events.find((e) => e.resource.date === day);

//     let backgroundColor = 'transparent';
//     let content = null;

//     if (event) {
//       switch (event.resource.status) {
//         case 'Late':
//           backgroundColor = 'orange';
//           content = 'Late';
//           break;
//         case 'Absent':
//           backgroundColor = 'red';
//           content = 'Absent';
//           break;
//         default:
//           backgroundColor = 'green';
//           content = 'Present';
//       }
//     }

//     return (
//       <div
//         style={{
//           position: 'relative',
//           height: '100%',
//           backgroundColor,
//           overflow: 'hidden',
//           cursor: 'pointer',
//         }}
//         onMouseEnter={() => setHoveredEvent(event)}
//         onMouseLeave={() => setHoveredEvent(null)}
//       >
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '50%',
//         }}>
//           <span>{moment(value).date()}</span>
//         </div>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'flex-end',
//           height: '50%',
//           padding: '5px',
//         }}>
//           <span>{content}</span>
//         </div>
//         {hoveredEvent && hoveredEvent.resource.date === day && (
//           <div style={{
//             position: 'absolute',
//             top: '0',
//             left: '0',
//             right: '0',
//             bottom: '0',
//             backgroundColor: 'rgba(255, 255, 255, 0.9)',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1,
//           }}>
//             <span>Check-In: {hoveredEvent.resource.startTime}</span>
//             <span>Check-Out: {hoveredEvent.resource.endTime}</span>
//             <span>Duration: {hoveredEvent.resource.duration}</span>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const handleNext = () => {
//     setDate(moment(date).add(1, 'month').toDate());
//   };

//   const handlePrev = () => {
//     setDate(moment(date).subtract(1, 'month').toDate());
//   };

//   const CustomToolbar = (toolbar) => {
//     const goToToday = () => {
//       toolbar.onNavigate('TODAY');
//     };

//     const changeView = (view) => {
//       setView(view);
//       toolbar.onView(view);
//     };

//     return (
//       <div className="rbc-toolbar">
//         <div className='d-flex'>
//           <button onClick={handlePrev}>Prev</button>
//           <button onClick={goToToday}>Today</button>
//           <button onClick={handleNext}>Next</button>
//         </div>
//         <span className="rbc-toolbar-label">{toolbar.label}</span>
//         <div className='d-flex'>
//           <button onClick={() => changeView(Views.MONTH)}>Month</button>
//           <button onClick={() => changeView(Views.WEEK)}>Week</button>
//           <button onClick={() => changeView(Views.DAY)}>Day</button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Paper>
//       <div style={{ height: '800px' }}>
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           date={date}
//           view={view}
//           onNavigate={(newDate) => setDate(newDate)}
//           onView={(newView) => setView(newView)}
//           eventPropGetter={eventPropGetter}
//           components={{
//             toolbar: CustomToolbar,
//             dateCellWrapper,
//           }}
//           style={{ height: '100%' }}
//         />
//       </div>
//     </Paper>
//   );
// };

// export default AttendanceCalendar;

"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { getReq } from "@/utils/apiHandlers";
import AttendanceUpdateModal from "@/components/common/AttendanceUpdateModal";

const localizer = momentLocalizer(moment);

const AttendanceCalendar = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const userDetails = useSelector((state) => state.employer.user);

  const getEmployeeAttendanceDetails = async () => {
    try {
      const response = await getReq(
        `/attendance-details/?emp_code=${userDetails.empcode}`
      );
      console.log("---------------resposne ", response);
      if (response.status) {
        const transformed = transformEvents(response.data);
        setEvents(transformed);
      }
    } catch (error) {
      console.error("Error fetching attendance details:", error);
    }
  };

  useEffect(() => {
    if (userDetails) {
      getEmployeeAttendanceDetails();
    }
  }, [userDetails]);

  // Transform data for calendar
  const transformEvents = (data) => {
    return data.map((event) => {
      const start = moment(event.date_of_attendance).utc().toDate();
      const end = moment(event.date_of_attendance).utc().toDate();
      let title = "";
      let backgroundColor = "";

      const shiftInTime = event.shift_in_time;
      const checkInTime = moment(event.first_timestamp);
      const checkOutTime = moment(event.last_timestamp);

      // Determine the event status
      if (
        event.first_timestamp == null &&
        (moment(start).format("ddd") == "Sun" ||
          moment(start).format("ddd") == "Sat")
      ) {
        title = (
          <div
            data-bs-target="#attendanceUpdateModal"
            data-bs-toggle="modal"
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100px" }}
          >
            <p className="text-white fs-5">Week Off</p>
          </div>
        );
        backgroundColor = "red";
      } else if (event.first_timestamp && event.last_timestamp) {
        // const isLate = moment(checkInTime).isAfter(moment.utc(`${event.date_of_attendance}T${shiftInTime}Z`));

        title = (
          <div className="text-white text-center" style={{ height: "100px" }}>
            <p className=" text-white fs-5">
              {event.late_status
                ? "Present"
                : event.late_status == "NOLATE"
                ? "Present"
                : event.late_status}
            </p>
            <p className="text-white">
              Check-in: {checkInTime.utc().format("hh:mm A")} <br />{" "}
              <span>
                Check-out:{" "}
                {event.last_timestamp
                  ? checkOutTime.utc().format("hh:mm A")
                  : "00:00"}
              </span>{" "}
              <br />
              (Duration {event.duration})
            </p>
          </div>
        );
        backgroundColor = event.late_status == "NOLATE" ? "green" : "gray";
      } else if (event.status_details.type === "Absent") {
        title = (
          <div className="text-white text-center" style={{ height: "100px" }}>
            <p className=" text-white fs-5">{event.status_details.type}</p>
            <p className="text-white">
              Check-in: {checkInTime.utc().format("hh:mm A")} <br />{" "}
              <span>
                Check-out:{" "}
                {event.last_timestamp
                  ? checkOutTime.utc().format("hh:mm A")
                  : "Missing"}
              </span>{" "}
              <br />
              (Duration {event.duration})
            </p>
          </div>
          // <div className="d-flex justify-content-center align-items-center text-center" style={{ height: "100px" }}>
          //   <p className="text-white fs-5">Absent</p>
          // </div>
        );
        backgroundColor = "red";
      } else {
        title = (
          <div
            className="text-white d-flex justify-content-center align-items-center"
            style={{ height: "100px" }}
          >
            <p className="fs-5 text-white">Holiday</p>
          </div>
        );
        backgroundColor = "blue";
      }

      return {
        id: event.id,
        title,
        start,
        end,
        allDay: true,
        style: { backgroundColor, color: "white" },
      };
    });
  };

  return (
    <div style={{ height: "500px" }}>
      <AttendanceUpdateModal />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "150%", textAlign: "center" }}
        onSelectEvent={(event) => alert(event.title)}
        onMouseOver={(event) => setHoveredEvent(event)}
        onMouseLeave={() => setHoveredEvent(null)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.style.backgroundColor,
            color: "white",
          },
        })}
      />
      {hoveredEvent && (
        <div
          className="hover-info"
          style={{
            position: "absolute",
            background: "black",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {hoveredEvent.title}
        </div>
      )}
    </div>
  );
};

export default AttendanceCalendar;
