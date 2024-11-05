"use client";
import AttendanceUpdateModal from "@/components/common/AttendanceUpdateModal";
import { getReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AttendanceCalendar from "../../dashboard/components/AttendanceCalender";
import SelectWithSearch from "@/components/common/SelectWithSearch";
import DatePickerCustom from "@/components/common/DatePickerCustom";

// const usersAttendanceData = {
//   1002: [
//     {
//       id: 8002,
//       status: {
//         id: 9,
//         status_code: 102,
//         type: "Present",
//       },
//       user_id: "1002",
//       username: "Raj Gupta",
//       shift_in_time: "18:00:00",
//       shift_out_time: "03:00:00",
//       late_status: "NOLATE",
//       first_timestamp: "2024-08-01T17:34:38Z",
//       last_timestamp: "2024-08-02T05:17:57Z",
//       duration: "11h 43m",
//       all_timestamps:
//         "['2024-08-01 04:56:29', '2024-08-01 17:34:38', '2024-08-02 05:17:57', '2024-08-02 17:54:14']",
//       date_of_attendance: "2024-08-01T00:00:00Z",
//       created_at: "2024-08-01T00:00:00Z",
//       updated_at: "2024-08-01T00:00:00Z",
//     },
//     {
//       id: 8119,
//       status: {
//         id: 9,
//         status_code: 102,
//         type: "Present",
//       },
//       user_id: "1002",
//       username: "Raj Gupta",
//       shift_in_time: "18:00:00",
//       shift_out_time: "03:00:00",
//       late_status: "NOLATE",
//       first_timestamp: "2024-08-02T17:54:14Z",
//       last_timestamp: "2024-08-03T04:09:36Z",
//       duration: "10h 15m",
//       all_timestamps:
//         "['2024-08-02 05:17:57', '2024-08-02 17:54:14', '2024-08-03 04:09:36']",
//       date_of_attendance: "2024-08-02T00:00:00Z",
//       created_at: "2024-08-02T00:00:00Z",
//       updated_at: "2024-08-02T00:00:00Z",
//     },
//     {
//       id: 8223,
//       status: {
//         id: 8,
//         status_code: 101,
//         type: "Absent",
//       },
//       user_id: "1002",
//       username: "Raj Gupta",
//       shift_in_time: "18:00:00",
//       shift_out_time: "03:00:00",
//       late_status: "",
//       first_timestamp: null,
//       last_timestamp: null,
//       duration: null,
//       all_timestamps: "['2024-08-03 04:09:36']",
//       date_of_attendance: "2024-08-03T00:00:00Z",
//       created_at: "2024-08-03T00:00:00Z",
//       updated_at: "2024-08-03T00:00:00Z",
//     },
//     {
//       id: 8290,
//       status: {
//         id: 8,
//         status_code: 101,
//         type: "Absent",
//       },
//       user_id: "1002",
//       username: "Raj Gupta",
//       shift_in_time: "18:00:00",
//       shift_out_time: "03:00:00",
//       late_status: "",
//       first_timestamp: null,
//       last_timestamp: null,
//       duration: null,
//       all_timestamps: "['2024-08-05 17:49:11']",
//       date_of_attendance: "2024-08-04T00:00:00Z",
//       created_at: "2024-08-04T00:00:00Z",
//       updated_at: "2024-08-04T00:00:00Z",
//     },
//   ],
//   1003: [
//     {
//       id: 7946,
//       status: {
//         id: 9,
//         status_code: 102,
//         type: "Present",
//       },
//       user_id: "1003",
//       username: "Girish Soni",
//       shift_in_time: "18:00:00",
//       shift_out_time: "03:00:00",
//       late_status: "NOLATE",
//       first_timestamp: "2024-08-01T17:56:16Z",
//       last_timestamp: "2024-08-02T03:07:31Z",
//       duration: "9h 11m",
//       all_timestamps:
//         "['2024-08-01 03:15:28', '2024-08-01 17:56:16', '2024-08-02 03:07:31', '2024-08-02 18:00:12']",
//       date_of_attendance: "2024-08-01T00:00:00Z",
//       created_at: "2024-08-01T00:00:00Z",
//       updated_at: "2024-08-01T00:00:00Z",
//     },
//     {
//       id: 8052,
//       status: {
//         id: 9,
//         status_code: 102,
//         type: "Present",
//       },
//       user_id: "1003",
//       username: "Girish Soni",
//       shift_in_time: "18:00:00",
//       shift_out_time: "03:00:00",
//       late_status: "NOLATE",
//       first_timestamp: "2024-08-02T18:00:12Z",
//       last_timestamp: "2024-08-03T03:05:27Z",
//       duration: "9h 5m",
//       all_timestamps:
//         "['2024-08-02 03:07:31', '2024-08-02 18:00:12', '2024-08-03 03:05:27']",
//       date_of_attendance: "2024-08-02T00:00:00Z",
//       created_at: "2024-08-02T00:00:00Z",
//       updated_at: "2024-08-02T00:00:00Z",
//     },
//     {
//       id: 8173,
//       status: {
//         id: 8,
//         status_code: 101,
//         type: "Absent",
//       },
//       user_id: "1003",
//       username: "Girish Soni",
//       shift_in_time: "18:00:00",
//       shift_out_time: "03:00:00",
//       late_status: "",
//       first_timestamp: null,
//       last_timestamp: null,
//       duration: null,
//       all_timestamps: "['2024-08-03 03:05:27']",
//       date_of_attendance: "2024-08-03T00:00:00Z",
//       created_at: "2024-08-03T00:00:00Z",
//       updated_at: "2024-08-03T00:00:00Z",
//     },
//     {
//       id: 8325,
//       status: {
//         id: 8,
//         status_code: 101,
//         type: "Absent",
//       },
//       user_id: "1003",
//       username: "Girish Soni",
//       shift_in_time: "18:00:00",
//       shift_out_time: "03:00:00",
//       late_status: "",
//       first_timestamp: null,
//       last_timestamp: null,
//       duration: null,
//       all_timestamps: "['2024-08-05 18:06:10']",
//       date_of_attendance: "2024-08-04T00:00:00Z",
//       created_at: "2024-08-04T00:00:00Z",
//       updated_at: "2024-08-04T00:00:00Z",
//     },
//   ],
//   1028: [
//     {
//       id: 7984,
//       status: {
//         id: 9,
//         status_code: 102,
//         type: "Present",
//       },
//       user_id: "1028",
//       username: "Anil Dave",
//       shift_in_time: "19:00:00",
//       shift_out_time: "04:00:00",
//       late_status: "NOLATE",
//       first_timestamp: "2024-08-01T18:48:04Z",
//       last_timestamp: "2024-08-02T03:55:44Z",
//       duration: "9h 7m",
//       all_timestamps:
//         "['2024-08-01 04:01:26', '2024-08-01 18:48:04', '2024-08-02 03:55:44', '2024-08-02 18:58:04']",
//       date_of_attendance: "2024-08-01T00:00:00Z",
//       created_at: "2024-08-01T00:00:00Z",
//       updated_at: "2024-08-01T00:00:00Z",
//     },
//     {
//       id: 8096,
//       status: {
//         id: 9,
//         status_code: 102,
//         type: "Present",
//       },
//       user_id: "1028",
//       username: "Anil Dave",
//       shift_in_time: "19:00:00",
//       shift_out_time: "04:00:00",
//       late_status: "NOLATE",
//       first_timestamp: "2024-08-02T18:58:04Z",
//       last_timestamp: "2024-08-03T03:58:58Z",
//       duration: "9h 0m",
//       all_timestamps:
//         "['2024-08-02 03:55:44', '2024-08-02 18:58:04', '2024-08-03 03:58:58']",
//       date_of_attendance: "2024-08-02T00:00:00Z",
//       created_at: "2024-08-02T00:00:00Z",
//       updated_at: "2024-08-02T00:00:00Z",
//     },
//     {
//       id: 8216,
//       status: {
//         id: 8,
//         status_code: 101,
//         type: "Absent",
//       },
//       user_id: "1028",
//       username: "Anil Dave",
//       shift_in_time: "19:00:00",
//       shift_out_time: "04:00:00",
//       late_status: "",
//       first_timestamp: null,
//       last_timestamp: null,
//       duration: null,
//       all_timestamps: "['2024-08-03 03:58:58']",
//       date_of_attendance: "2024-08-03T00:00:00Z",
//       created_at: "2024-08-03T00:00:00Z",
//       updated_at: "2024-08-03T00:00:00Z",
//     },
//     {
//       id: 8363,
//       status: {
//         id: 8,
//         status_code: 101,
//         type: "Absent",
//       },
//       user_id: "1028",
//       username: "Anil Dave",
//       shift_in_time: "19:00:00",
//       shift_out_time: "04:00:00",
//       late_status: "",
//       first_timestamp: null,
//       last_timestamp: null,
//       duration: null,
//       all_timestamps: "['2024-08-05 19:09:38', '2024-08-05 19:09:46']",
//       date_of_attendance: "2024-08-04T00:00:00Z",
//       created_at: "2024-08-04T00:00:00Z",
//       updated_at: "2024-08-04T00:00:00Z",
//     },
//   ],
// };

const viewType = [
  { name: "Table", icon: reactIcons.table },
  { name: "List", icon: reactIcons.list },
];

const AttendanceData = () => {
  const [select, setSelect] = useState("Table");
  const [selectDateData, setSelectDateData] = useState(null);
  const [usersAttendanceData, setUsersAttendanceData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [form, setForm] = useState({
    user:''
  })
  const [allParam, setAllParam] = useState('');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [userName, setUserName] = useState('');
  const [usersList, setUsersList] = useState([]);

  const getAllUsersAttendance = async (param) => {
    const response = await getReq(`/attendance-details/admin_panel/${param}`);
    if (response.status) {
      setUsersAttendanceData(response.data.results || response.data);
    }
  };

  useEffect(() => {
    getAllUsersAttendance();
  }, []);

  useEffect(() => {
    handleGetUsersList()
}, [search])

const handleGetUsersList = async () => {
  const response = await getReq(
    `/users/${search ? `?search=${search}` : ""}`
  );
  if (response.status) {
    console.log("-----------responer of ", response.data);
    setUsersList(response.data);
  }
};


  useEffect(() => {
    let today = new Date();
    let month = moment(today).format("yyyy-MM");
    let param = ''

    // Include date parameters if both startDate and endDate are present
    if (startDate && endDate) {
      param += `?start_date=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&end_date=${moment(endDate).format("YYYY-MM-DD")}`;
    }else{
      param = `?year_month=${month}`;
    }
    console.log("-------------form . user ", form.user);

    if(form.user){
      param += `&emp_id=${form.user}`
    }
  
    if (param !== allParam) {
      setAllParam(param);
      // setPage(0); // Set page to 0 if it's falsy
      getAllUsersAttendance(param);
    } 
    // else if (page) {
    //   getJobDelegationReports(param);
    // } else {
    //   getJobDelegationReports(param);
    // }
  }, [startDate, endDate, form.user]);

  const calculateAttendanceCounts = (data) => {
    let presentCount = 0;
    let absentCount = 0;

    data.forEach((record) => {
      if (record.status.type === "Present") {
        presentCount++;
      } else {
        absentCount++;
      }
    });

    return { presentCount, absentCount };
  };

  console.log("-----------form ----", form);
  

  return (
    <div>
      <AttendanceUpdateModal selectDateData={selectDateData} />
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
        <div className="d-flex align-items-center gap-3">
          <div className="w-20">
          <div className="position-relative">
    <div
      className="client-form-input d-flex justify-content-between cursor-pointer"
      onClick={() => setOpen(!open)}
      // onMouseLeave={() => setOpen(false)}
    >
      {userName ?
      <span> {userName.first_name + ' ' + userName.last_name+ ' '}</span>
      :
      <span></span>
      }
      <span className=" float-end">{reactIcons.downarrow}</span>
    </div>
    {open && (
      <div
        className="position-absolute bg-white border border-1 w-100 px-2 table_div_custom custom-scroll-sm"
        style={{ top: "33px", zIndex: 10000, height:'350px' }}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="my-2">
          <input className="border px-2 border-primary rounded-1 w-100 " placeholder="Search here..." type='text' onChange={(e) => setSearch(e.target.value)}/>
        </div>
        {usersList.map((item, index) => {
          return (
            <div key={index} className="hover-bg-change">
              <span className="mx-2" onClick={() =>{ 
                setUserName(item);
                setForm((prev) => ({...prev, "user":1972}))
                setOpen(false);
                setSearch('')
                }}>{item.first_name} {item.last_name}</span>
            </div>
          );
        })}
      </div>
    )}
  </div>
          </div>
        <div>
        <div className="d-flex gap-2 mt-1">
              <div className="" style={{ width: "200px" }}>
                <DatePickerCustom
                  date={startDate}
                  handleDate={(date) => setStartDate(date)}
                  placeholder="From Date"
                />
              </div>
              <div className="" style={{ width: "200px" }}>
                <DatePickerCustom
                  date={endDate}
                  handleDate={(date) => setEndDate(date)}
                  placeholder="To Date"
                />
              </div>
          </div>
        </div>
        </div>
        </div>

        <div className="d-flex mb-2">
          {viewType.map((item) => {
            return (
              <div
                onClick={() => setSelect(item.name)}
                className={`${
                  item.name == select
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } d-flex gap-2 align-items-center fw-700 border cursor-pointer border-primary px-3`}
              >
                <span className="fs-6">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      {select == "Table" ? (
        <div className="table_div custom-scroll-sm">
          <table className="default-table">
            <thead>
              <tr>
                <th style={{ width: "150px" }}>Name</th>
                <th style={{ width: "150px" }}>Employee Code</th>
                <th style={{ width: "130px" }}>Leave Balance</th>
                <th style={{ width: "130px" }}>Compoff</th>
                <th style={{ width: "160px" }}>Company Name</th>
                <th style={{ width: "200px" }}>Shift Time</th>
                {/* <th style={{width:"130px"}}>Date</th>
                    <th style={{width:"130px"}}>Check In</th>
                     <th style={{width:"130px"}}>Check out</th>
                    <th style={{width:"130px"}}>Duration</th> */}
                {usersAttendanceData[ Object.keys(usersAttendanceData)[0]]?.map((header, index) => {
                  return (
                    <>
                      <th key={index} style={{ width: "130px" }}>
                        {moment(header.date_of_attendance).format("DD MMM/ddd")}
                      </th>
                      <th key={index} style={{ width: "130px" }}>
                        {"Check In"}
                      </th>
                      <th key={index} style={{ width: "130px" }}>
                        {"Check Out"}
                      </th>
                      <th key={index} style={{ width: "130px" }}>
                        {"Duration"}
                      </th>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {Object.entries(usersAttendanceData).map(([empCode, records]) => {
                const { presentCount, absentCount } =
                  calculateAttendanceCounts(records);
                const userRecord = records[0]; // Get the first record for common info

                return (
                  <tr key={empCode}>
                    <td style={{ width: "150px" }}>{userRecord.username}</td>
                    <td style={{ width: "150px" }}>{empCode}</td>
                    <td style={{ width: "130px" }}>0</td>
                    <td style={{ width: "130px" }}>0</td>
                    <td style={{ width: "160px" }}>Company XYZ</td>
                    <td
                      style={{ width: "200px" }}
                    >{`${userRecord.shift_in_time} - ${userRecord.shift_out_time}`}</td>

                    {records.map((record) => (
                      <React.Fragment key={record.id}>
                        <td style={{ width: "130px" }}>
                          {/* {record.date_of_attendance 
                                            ? new Date(record.date_of_attendance).toLocaleDateString() 
                                            : ''} */}
                          <div
                            onClick={() => setSelectDateData(record)}
                            data-bs-target="#attendanceUpdateModal"
                            data-bs-toggle="modal"
                            className={`${
                              record?.status_details?.type == "Present"
                                ? "bg-green"
                                : record?.status_details?.type == "Absent"
                                ? "bg-red"
                                : "bg-red"
                            } text-center rounded-1 cursor-pointer text-white fw-700`}
                          >
                            {moment(record.date_of_attendance).format("ddd") ==
                              "Sat" ||
                            (moment(record.date_of_attendance).format("ddd") ==
                              "Sun" &&
                              !record.first_timestamp)
                              ? "Week Off"
                              : record.status_details.type}
                          </div>
                        </td>
                        <td style={{ width: "130px" }}>
                          {record.first_timestamp
                            ? moment(record.first_timestamp)
                                .utc()
                                .format("HH:mm:ss")
                            : "00:00:00"}
                        </td>
                        <td style={{ width: "130px" }}>
                          {record.last_timestamp
                            ? moment(record.last_timestamp)
                                .utc()
                                .format("HH:mm:ss")
                            : "00:00:00"}
                        </td>
                        <td style={{ width: "130px" }}>
                          {record.duration || "00:00"}
                        </td>
                        {/* <td >{record.status.type}</td> */}
                      </React.Fragment>
                    ))}
                  </tr>
                );
              })}
              {/* <tr>
                    <td colSpan={11}>
                        Present: {presentCount}, Absent: {absentCount}
                    </td>
                </tr> */}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div className="accordion" id="accordionExample">
            {Object.values(usersAttendanceData).map((item, index) => {
              // Determine if the current item should be open or closed
              const isOpen = openIndex === index;

              return (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={isOpen ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)} // Toggle open/close state
                    >
                     {item[0].username}  {(item[0].user_id)}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${
                      isOpen ? "show" : ""
                    }`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="w-100 p-2" style={{ height: "800px" }}>
                        <AttendanceCalendar />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceData;
