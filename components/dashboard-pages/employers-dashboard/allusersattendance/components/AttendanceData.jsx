"use client";
import AttendanceUpdateModal from "@/components/common/AttendanceUpdateModal";
import { getReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";

const attendanceData = {
  1002: [
    {
      id: 8002,
      status: {
        id: 9,
        status_code: 102,
        type: "Present",
      },
      user_id: "1002",
      username: "Raj Gupta",
      shift_in_time: "18:00:00",
      shift_out_time: "03:00:00",
      late_status: "NOLATE",
      first_timestamp: "2024-08-01T17:34:38Z",
      last_timestamp: "2024-08-02T05:17:57Z",
      duration: "11h 43m",
      all_timestamps:
        "['2024-08-01 04:56:29', '2024-08-01 17:34:38', '2024-08-02 05:17:57', '2024-08-02 17:54:14']",
      date_of_attendance: "2024-08-01T00:00:00Z",
      created_at: "2024-08-01T00:00:00Z",
      updated_at: "2024-08-01T00:00:00Z",
    },
    {
      id: 8119,
      status: {
        id: 9,
        status_code: 102,
        type: "Present",
      },
      user_id: "1002",
      username: "Raj Gupta",
      shift_in_time: "18:00:00",
      shift_out_time: "03:00:00",
      late_status: "NOLATE",
      first_timestamp: "2024-08-02T17:54:14Z",
      last_timestamp: "2024-08-03T04:09:36Z",
      duration: "10h 15m",
      all_timestamps:
        "['2024-08-02 05:17:57', '2024-08-02 17:54:14', '2024-08-03 04:09:36']",
      date_of_attendance: "2024-08-02T00:00:00Z",
      created_at: "2024-08-02T00:00:00Z",
      updated_at: "2024-08-02T00:00:00Z",
    },
    {
      id: 8223,
      status: {
        id: 8,
        status_code: 101,
        type: "Absent",
      },
      user_id: "1002",
      username: "Raj Gupta",
      shift_in_time: "18:00:00",
      shift_out_time: "03:00:00",
      late_status: "",
      first_timestamp: null,
      last_timestamp: null,
      duration: null,
      all_timestamps: "['2024-08-03 04:09:36']",
      date_of_attendance: "2024-08-03T00:00:00Z",
      created_at: "2024-08-03T00:00:00Z",
      updated_at: "2024-08-03T00:00:00Z",
    },
    {
      id: 8290,
      status: {
        id: 8,
        status_code: 101,
        type: "Absent",
      },
      user_id: "1002",
      username: "Raj Gupta",
      shift_in_time: "18:00:00",
      shift_out_time: "03:00:00",
      late_status: "",
      first_timestamp: null,
      last_timestamp: null,
      duration: null,
      all_timestamps: "['2024-08-05 17:49:11']",
      date_of_attendance: "2024-08-04T00:00:00Z",
      created_at: "2024-08-04T00:00:00Z",
      updated_at: "2024-08-04T00:00:00Z",
    },
  ],
  1003: [
    {
      id: 7946,
      status: {
        id: 9,
        status_code: 102,
        type: "Present",
      },
      user_id: "1003",
      username: "Girish Soni",
      shift_in_time: "18:00:00",
      shift_out_time: "03:00:00",
      late_status: "NOLATE",
      first_timestamp: "2024-08-01T17:56:16Z",
      last_timestamp: "2024-08-02T03:07:31Z",
      duration: "9h 11m",
      all_timestamps:
        "['2024-08-01 03:15:28', '2024-08-01 17:56:16', '2024-08-02 03:07:31', '2024-08-02 18:00:12']",
      date_of_attendance: "2024-08-01T00:00:00Z",
      created_at: "2024-08-01T00:00:00Z",
      updated_at: "2024-08-01T00:00:00Z",
    },
    {
      id: 8052,
      status: {
        id: 9,
        status_code: 102,
        type: "Present",
      },
      user_id: "1003",
      username: "Girish Soni",
      shift_in_time: "18:00:00",
      shift_out_time: "03:00:00",
      late_status: "NOLATE",
      first_timestamp: "2024-08-02T18:00:12Z",
      last_timestamp: "2024-08-03T03:05:27Z",
      duration: "9h 5m",
      all_timestamps:
        "['2024-08-02 03:07:31', '2024-08-02 18:00:12', '2024-08-03 03:05:27']",
      date_of_attendance: "2024-08-02T00:00:00Z",
      created_at: "2024-08-02T00:00:00Z",
      updated_at: "2024-08-02T00:00:00Z",
    },
    {
      id: 8173,
      status: {
        id: 8,
        status_code: 101,
        type: "Absent",
      },
      user_id: "1003",
      username: "Girish Soni",
      shift_in_time: "18:00:00",
      shift_out_time: "03:00:00",
      late_status: "",
      first_timestamp: null,
      last_timestamp: null,
      duration: null,
      all_timestamps: "['2024-08-03 03:05:27']",
      date_of_attendance: "2024-08-03T00:00:00Z",
      created_at: "2024-08-03T00:00:00Z",
      updated_at: "2024-08-03T00:00:00Z",
    },
    {
      id: 8325,
      status: {
        id: 8,
        status_code: 101,
        type: "Absent",
      },
      user_id: "1003",
      username: "Girish Soni",
      shift_in_time: "18:00:00",
      shift_out_time: "03:00:00",
      late_status: "",
      first_timestamp: null,
      last_timestamp: null,
      duration: null,
      all_timestamps: "['2024-08-05 18:06:10']",
      date_of_attendance: "2024-08-04T00:00:00Z",
      created_at: "2024-08-04T00:00:00Z",
      updated_at: "2024-08-04T00:00:00Z",
    },
  ],
  1028: [
    {
      id: 7984,
      status: {
        id: 9,
        status_code: 102,
        type: "Present",
      },
      user_id: "1028",
      username: "Anil Dave",
      shift_in_time: "19:00:00",
      shift_out_time: "04:00:00",
      late_status: "NOLATE",
      first_timestamp: "2024-08-01T18:48:04Z",
      last_timestamp: "2024-08-02T03:55:44Z",
      duration: "9h 7m",
      all_timestamps:
        "['2024-08-01 04:01:26', '2024-08-01 18:48:04', '2024-08-02 03:55:44', '2024-08-02 18:58:04']",
      date_of_attendance: "2024-08-01T00:00:00Z",
      created_at: "2024-08-01T00:00:00Z",
      updated_at: "2024-08-01T00:00:00Z",
    },
    {
      id: 8096,
      status: {
        id: 9,
        status_code: 102,
        type: "Present",
      },
      user_id: "1028",
      username: "Anil Dave",
      shift_in_time: "19:00:00",
      shift_out_time: "04:00:00",
      late_status: "NOLATE",
      first_timestamp: "2024-08-02T18:58:04Z",
      last_timestamp: "2024-08-03T03:58:58Z",
      duration: "9h 0m",
      all_timestamps:
        "['2024-08-02 03:55:44', '2024-08-02 18:58:04', '2024-08-03 03:58:58']",
      date_of_attendance: "2024-08-02T00:00:00Z",
      created_at: "2024-08-02T00:00:00Z",
      updated_at: "2024-08-02T00:00:00Z",
    },
    {
      id: 8216,
      status: {
        id: 8,
        status_code: 101,
        type: "Absent",
      },
      user_id: "1028",
      username: "Anil Dave",
      shift_in_time: "19:00:00",
      shift_out_time: "04:00:00",
      late_status: "",
      first_timestamp: null,
      last_timestamp: null,
      duration: null,
      all_timestamps: "['2024-08-03 03:58:58']",
      date_of_attendance: "2024-08-03T00:00:00Z",
      created_at: "2024-08-03T00:00:00Z",
      updated_at: "2024-08-03T00:00:00Z",
    },
    {
      id: 8363,
      status: {
        id: 8,
        status_code: 101,
        type: "Absent",
      },
      user_id: "1028",
      username: "Anil Dave",
      shift_in_time: "19:00:00",
      shift_out_time: "04:00:00",
      late_status: "",
      first_timestamp: null,
      last_timestamp: null,
      duration: null,
      all_timestamps: "['2024-08-05 19:09:38', '2024-08-05 19:09:46']",
      date_of_attendance: "2024-08-04T00:00:00Z",
      created_at: "2024-08-04T00:00:00Z",
      updated_at: "2024-08-04T00:00:00Z",
    },
  ],
};

const viewType = [
  { name: "Table", icon: reactIcons.table },
  { name: "List", icon: reactIcons.list },
];

const AttendanceData = () => {
  const [select, setSelect] = useState("Table");
  const [selectDateData, setSelectDateData] = useState(null);


  const getAllUsersAttendance = async() => {
    const response = await getReq('/attendance-details/admin_panel/')
    if(response.status){
      console.log("------------------response data ", response);
    }
  }

  useEffect(() => {
       getAllUsersAttendance();
  }, [])


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

  return (
    <div>
      <AttendanceUpdateModal selectDateData={selectDateData} />
      <div className="d-flex justify-content-between">
        <div>
          <h4>Users Attendance</h4>
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
                {attendanceData["1002"].map((header, index) => {
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
              {Object.entries(attendanceData).map(([empCode, records]) => {
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
                              record?.status?.type == "Present"
                                ? "bg-green"
                                : record?.status?.type == "Absent"
                                ? "bg-red"
                                : "bg-yellow"
                            } text-center rounded-1 cursor-pointer text-white fw-700`}
                          >
                            {moment(record.date_of_attendance).format("ddd") ==
                              "Sat" ||
                            (moment(record.date_of_attendance).format("ddd") ==
                              "Sun" &&
                              !record.first_timestamp)
                              ? "Week Off"
                              : record.status.type}
                          </div>
                        </td>
                        <td style={{ width: "130px" }}>
                          {record.first_timestamp
                            ? moment(record.first_timestamp)
                                .utc()
                                .format("HH:mm:ss")
                            : "N/A"}
                        </td>
                        <td style={{ width: "130px" }}>
                          {record.last_timestamp
                            ? moment(record.last_timestamp)
                                .utc()
                                .format("HH:mm:ss")
                            : "N/A"}
                        </td>
                        <td style={{ width: "130px" }}>
                          {record.duration || "N/A"}
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
            <div className="text-center">
                 <strong>Work Inprogress</strong>
            </div>
            {/* {Object.values(attendanceData).map((item, index) => {
                console.log("-----------item ", item);
                return(
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Accordion Item #1
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                   {index}
                </div>
              </div>
            </div>
                )
            })
            } */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceData;
