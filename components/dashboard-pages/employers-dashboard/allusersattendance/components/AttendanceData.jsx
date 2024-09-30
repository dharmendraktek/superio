import React from 'react';

const attendanceData ={
    "1002": [
        {
            "id": 8002,
            "status": {
                "id": 9,
                "status_code": 102,
                "type": "Present"
            },
            "user_id": "1002",
            "username": "Raj Gupta",
            "shift_in_time": "18:00:00",
            "shift_out_time": "03:00:00",
            "late_status": "NOLATE",
            "first_timestamp": "2024-08-01T17:34:38Z",
            "last_timestamp": "2024-08-02T05:17:57Z",
            "duration": "11h 43m",
            "all_timestamps": "['2024-08-01 04:56:29', '2024-08-01 17:34:38', '2024-08-02 05:17:57', '2024-08-02 17:54:14']",
            "date_of_attendance": "2024-08-01T00:00:00Z",
            "created_at": "2024-08-01T00:00:00Z",
            "updated_at": "2024-08-01T00:00:00Z"
        },
        {
            "id": 8119,
            "status": {
                "id": 9,
                "status_code": 102,
                "type": "Present"
            },
            "user_id": "1002",
            "username": "Raj Gupta",
            "shift_in_time": "18:00:00",
            "shift_out_time": "03:00:00",
            "late_status": "NOLATE",
            "first_timestamp": "2024-08-02T17:54:14Z",
            "last_timestamp": "2024-08-03T04:09:36Z",
            "duration": "10h 15m",
            "all_timestamps": "['2024-08-02 05:17:57', '2024-08-02 17:54:14', '2024-08-03 04:09:36']",
            "date_of_attendance": "2024-08-02T00:00:00Z",
            "created_at": "2024-08-02T00:00:00Z",
            "updated_at": "2024-08-02T00:00:00Z"
        },
        {
            "id": 8223,
            "status": {
                "id": 8,
                "status_code": 101,
                "type": "Absent"
            },
            "user_id": "1002",
            "username": "Raj Gupta",
            "shift_in_time": "18:00:00",
            "shift_out_time": "03:00:00",
            "late_status": "",
            "first_timestamp": null,
            "last_timestamp": null,
            "duration": null,
            "all_timestamps": "['2024-08-03 04:09:36']",
            "date_of_attendance": "2024-08-03T00:00:00Z",
            "created_at": "2024-08-03T00:00:00Z",
            "updated_at": "2024-08-03T00:00:00Z"
        },
        {
            "id": 8290,
            "status": {
                "id": 8,
                "status_code": 101,
                "type": "Absent"
            },
            "user_id": "1002",
            "username": "Raj Gupta",
            "shift_in_time": "18:00:00",
            "shift_out_time": "03:00:00",
            "late_status": "",
            "first_timestamp": null,
            "last_timestamp": null,
            "duration": null,
            "all_timestamps": "['2024-08-05 17:49:11']",
            "date_of_attendance": "2024-08-04T00:00:00Z",
            "created_at": "2024-08-04T00:00:00Z",
            "updated_at": "2024-08-04T00:00:00Z"
        }
    ],
    "1003": [
        {
            "id": 7946,
            "status": {
                "id": 9,
                "status_code": 102,
                "type": "Present"
            },
            "user_id": "1003",
            "username": "Girish Soni",
            "shift_in_time": "18:00:00",
            "shift_out_time": "03:00:00",
            "late_status": "NOLATE",
            "first_timestamp": "2024-08-01T17:56:16Z",
            "last_timestamp": "2024-08-02T03:07:31Z",
            "duration": "9h 11m",
            "all_timestamps": "['2024-08-01 03:15:28', '2024-08-01 17:56:16', '2024-08-02 03:07:31', '2024-08-02 18:00:12']",
            "date_of_attendance": "2024-08-01T00:00:00Z",
            "created_at": "2024-08-01T00:00:00Z",
            "updated_at": "2024-08-01T00:00:00Z"
        },
        {
            "id": 8052,
            "status": {
                "id": 9,
                "status_code": 102,
                "type": "Present"
            },
            "user_id": "1003",
            "username": "Girish Soni",
            "shift_in_time": "18:00:00",
            "shift_out_time": "03:00:00",
            "late_status": "NOLATE",
            "first_timestamp": "2024-08-02T18:00:12Z",
            "last_timestamp": "2024-08-03T03:05:27Z",
            "duration": "9h 5m",
            "all_timestamps": "['2024-08-02 03:07:31', '2024-08-02 18:00:12', '2024-08-03 03:05:27']",
            "date_of_attendance": "2024-08-02T00:00:00Z",
            "created_at": "2024-08-02T00:00:00Z",
            "updated_at": "2024-08-02T00:00:00Z"
        },
        {
            "id": 8173,
            "status": {
                "id": 8,
                "status_code": 101,
                "type": "Absent"
            },
            "user_id": "1003",
            "username": "Girish Soni",
            "shift_in_time": "18:00:00",
            "shift_out_time": "03:00:00",
            "late_status": "",
            "first_timestamp": null,
            "last_timestamp": null,
            "duration": null,
            "all_timestamps": "['2024-08-03 03:05:27']",
            "date_of_attendance": "2024-08-03T00:00:00Z",
            "created_at": "2024-08-03T00:00:00Z",
            "updated_at": "2024-08-03T00:00:00Z"
        },
        {
            "id": 8325,
            "status": {
                "id": 8,
                "status_code": 101,
                "type": "Absent"
            },
            "user_id": "1003",
            "username": "Girish Soni",
            "shift_in_time": "18:00:00",
            "shift_out_time": "03:00:00",
            "late_status": "",
            "first_timestamp": null,
            "last_timestamp": null,
            "duration": null,
            "all_timestamps": "['2024-08-05 18:06:10']",
            "date_of_attendance": "2024-08-04T00:00:00Z",
            "created_at": "2024-08-04T00:00:00Z",
            "updated_at": "2024-08-04T00:00:00Z"
        }
    ],
    "1028": [
        {
            "id": 7984,
            "status": {
                "id": 9,
                "status_code": 102,
                "type": "Present"
            },
            "user_id": "1028",
            "username": "Anil Dave",
            "shift_in_time": "19:00:00",
            "shift_out_time": "04:00:00",
            "late_status": "NOLATE",
            "first_timestamp": "2024-08-01T18:48:04Z",
            "last_timestamp": "2024-08-02T03:55:44Z",
            "duration": "9h 7m",
            "all_timestamps": "['2024-08-01 04:01:26', '2024-08-01 18:48:04', '2024-08-02 03:55:44', '2024-08-02 18:58:04']",
            "date_of_attendance": "2024-08-01T00:00:00Z",
            "created_at": "2024-08-01T00:00:00Z",
            "updated_at": "2024-08-01T00:00:00Z"
        },
        {
            "id": 8096,
            "status": {
                "id": 9,
                "status_code": 102,
                "type": "Present"
            },
            "user_id": "1028",
            "username": "Anil Dave",
            "shift_in_time": "19:00:00",
            "shift_out_time": "04:00:00",
            "late_status": "NOLATE",
            "first_timestamp": "2024-08-02T18:58:04Z",
            "last_timestamp": "2024-08-03T03:58:58Z",
            "duration": "9h 0m",
            "all_timestamps": "['2024-08-02 03:55:44', '2024-08-02 18:58:04', '2024-08-03 03:58:58']",
            "date_of_attendance": "2024-08-02T00:00:00Z",
            "created_at": "2024-08-02T00:00:00Z",
            "updated_at": "2024-08-02T00:00:00Z"
        },
        {
            "id": 8216,
            "status": {
                "id": 8,
                "status_code": 101,
                "type": "Absent"
            },
            "user_id": "1028",
            "username": "Anil Dave",
            "shift_in_time": "19:00:00",
            "shift_out_time": "04:00:00",
            "late_status": "",
            "first_timestamp": null,
            "last_timestamp": null,
            "duration": null,
            "all_timestamps": "['2024-08-03 03:58:58']",
            "date_of_attendance": "2024-08-03T00:00:00Z",
            "created_at": "2024-08-03T00:00:00Z",
            "updated_at": "2024-08-03T00:00:00Z"
        },
        {
            "id": 8363,
            "status": {
                "id": 8,
                "status_code": 101,
                "type": "Absent"
            },
            "user_id": "1028",
            "username": "Anil Dave",
            "shift_in_time": "19:00:00",
            "shift_out_time": "04:00:00",
            "late_status": "",
            "first_timestamp": null,
            "last_timestamp": null,
            "duration": null,
            "all_timestamps": "['2024-08-05 19:09:38', '2024-08-05 19:09:46']",
            "date_of_attendance": "2024-08-04T00:00:00Z",
            "created_at": "2024-08-04T00:00:00Z",
            "updated_at": "2024-08-04T00:00:00Z"
        }
    ]
}

const AttendanceData = () => {
    const calculateAttendanceCounts = (data) => {
        let presentCount = 0;
        let absentCount = 0;

        data.forEach(record => {
            if (record.status.type === "Present") {
                presentCount++;
            } else {
                absentCount++;
            }
        });

        return { presentCount, absentCount };
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Employee Code</th>
                    <th>Leave Balance</th>
                    <th>Compoff</th>
                    <th>Company Name</th>
                    <th>Shift Time</th>
                    {/* Date-wise columns */}
                    {['Date', 'First Timestamp', 'Last Timestamp', 'Status', 'Duration'].map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.entries(attendanceData).map(([empCode, records]) => {
                    const { presentCount, absentCount } = calculateAttendanceCounts(records);
                    const userRecord = records[0]; // Get the first record for common info

                    return (
                        <tr key={empCode}>
                            <td>{userRecord.username}</td>
                            <td>{empCode}</td>
                            <td>0</td> {/* Placeholder for Leave Balance */}
                            <td>0</td> {/* Placeholder for Compoff */}
                            <td>Company XYZ</td> {/* Placeholder for Company Name */}
                            <td>{`${userRecord.shift_in_time} - ${userRecord.shift_out_time}`}</td>

                            {/* Render each record's data in sequence */}
                            {records.map(record => (
                                <React.Fragment key={record.id}>
                                    <td>
                                        {record.date_of_attendance 
                                            ? new Date(record.date_of_attendance).toLocaleDateString() 
                                            : ''}
                                    </td>
                                    <td>
                                        {record.first_timestamp 
                                            ? new Date(record.first_timestamp).toLocaleString() 
                                            : ''}
                                    </td>
                                    <td>
                                        {record.last_timestamp 
                                            ? new Date(record.last_timestamp).toLocaleString() 
                                            : ''}
                                    </td>
                                    <td>{record.status.type}</td>
                                    <td>{record.duration}</td>
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
    );
};

export default AttendanceData;
