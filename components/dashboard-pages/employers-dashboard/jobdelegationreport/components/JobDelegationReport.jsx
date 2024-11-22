"use client";

import DatePickerCustom from "@/components/common/DatePickerCustom";
import Loader from "@/components/common/Loader";
import MultiFilterSearch from "@/components/common/MultiFilterSearch";
import MultiSearch from "@/components/common/MultiSearch";
import Pagination from "@/components/common/Pagination";
import { getApiReq, getReq } from "@/utils/apiHandlers";
import { jobDelegationFilterKey } from "@/utils/constant";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import { cleanString } from "@/utils/regex";
import moment from "moment";
import { useEffect, useState } from "react";
import FileSaver from "file-saver";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";

const JobDelegationReport = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [jobDelegationData, setJobDelegationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterKeys, setFilterKeys] = useState(jobDelegationFilterKey);
  const [allParam, setAllParam] = useState("");
  const [openAssign, setOpenAssign] = useState(null);
  const [isExcelLoading, setIsExcelLoading] = useState(false);
  const [openLoc, setOpenLoc] = useState(null);

  // useEffect(() => {
  //   let param;
  //   if (startDate && endDate) {
  //     setPage(0);
  //     param = `?assigned_date_start=${moment(startDate).format(
  //       "yyyy-MM-DD"
  //     )}&assigned_date_end=${moment(endDate).format("yyyy-MM-DD")}`;
  //   }

  //   if (fieldName && search) {
  //     setPage(0);
  //     param = param
  //       ? param + `&${fieldName}=${search}`
  //       : `?${fieldName}=${search}`;
  //   }
  //   if (fieldName == "assigned_today") {
  //     setPage(0);
  //     param = `?${fieldName}=""`;
  //   }
  //   getJobDelegationReports(param);
  // }, [search, startDate, endDate, page, fieldName]);

  useEffect(() => {
    let param = "";

    // Include date parameters if both startDate and endDate are present
    if (startDate && endDate) {
      param += `&assigned_date_start=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&assigned_date_end=${moment(endDate).format("YYYY-MM-DD")}`;
    }

    // Include filtered keys
    const filterParams = filterKeys
      .filter((item) => item.selected && item.search_value) // Filter items with selected: true and search_value present
      .map((item) => `&${item.value}=${item.search_value}`) // Create the string in the format &value=search_value
      .join(""); // Join them together to form the final string

    param += filterParams; // Combine date and filter parameters

    if (param !== allParam) {
      setAllParam(param);
      setPage(0); // Set page to 0 if it's falsy
      getJobDelegationReports(param);
    } else if (page) {
      getJobDelegationReports(param);
    } else {
      getJobDelegationReports(param);
    }
  }, [startDate, endDate, page, filterKeys]);

  const getJobDelegationReports = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      `/job-assignment-report/report/?page=${page + 1}&size=25${
        param ? param : ""
      }`
    );

    setIsLoading(false);

    if (response.status) {
      setDataCount(response.data.count);
      setJobDelegationData(response.data.results || response.data);
    }
  };

  const handleClear = () => {
    let update = [...filterKeys];
    update.map((item) => {
      delete item["selected"];
      delete item["search_value"];
      return item;
    });
    setFilterKeys(update);
    setFieldName("");
    setStartDate(null);
    setEndDate(null);
    setSearch("");
    setPage(0);
  };

  const handleExportExcel = async () => {
    try {
      setIsExcelLoading(true);
      const response = await getApiReq(
        `${
          allParam
            ? `/job-assignment-report/report/?${allParam}&export=excel`
            : "/job-assignment-report/report/?export=excel"
        }`
      );
      setIsExcelLoading(false);
      if (response.status) {
        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(blob, "job-assignment-report.xlsx");
      }
    } catch (err) {
      setIsExcelLoading(false);
      toast.error(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="py-1">
        <h4>Jobs Delegation</h4>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <MultiFilterSearch
            openFields={openFields}
            setOpenFields={setOpenFields}
            filterKeys={filterKeys}
            setFilterKeys={setFilterKeys}
            search={search}
            fieldName={fieldName}
            setFieldName={setFieldName}
            setSearch={setSearch}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <div className="d-flex gap-2 justify-content-end align-items-center">
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
            <div className="d-flex gap-2">
              <button
                className={` small theme-btn ${
                  moment(startDate).format("DD-MM") ==
                    moment(new Date()).format("DD-MM") &&
                  moment(endDate).format("DD-MM") ==
                    moment(new Date()).format("DD-MM")
                    ? "btn-style-five"
                    : "btn-style-three"
                }`}
                onClick={() => {
                  setStartDate(new Date());
                  setEndDate(new Date());
                }}
              >
                Today
              </button>
              <button
                className={` small theme-btn ${
                  moment(startDate).format("DD-MM") ===
                    moment(new Date().setDate(new Date().getDate() - 1)).format(
                      "DD-MM"
                    ) &&
                  moment(endDate).format("DD-MM") ===
                    moment(new Date().setDate(new Date().getDate() - 1)).format(
                      "DD-MM"
                    )
                    ? "btn-style-five"
                    : "btn-style-three"
                }`}
                onClick={() => {
                  const today = new Date();
                  const yesterday = new Date();
                  yesterday.setDate(today.getDate() - 1); // Set yesterday's date

                  setStartDate(yesterday); // Setting yesterday's date
                  setEndDate(yesterday); // Setting today's date
                }}
              >
                Yesterday
              </button>
              <button
                className="theme-btn btn-style-two small"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div>
            <span className="text-primary">{dataCount} records</span>
          </div>
          <button
            className="theme-btn btn-style-one small d-flex gap-2"
            onClick={() => handleExportExcel()}
            disabled={isExcelLoading}
          >
            {isExcelLoading ? (
              <BtnBeatLoader />
            ) : (
              <>
                <span>Excel</span>
                <span>{reactIcons.download}</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="d-flex me-2 mt-1 mb-2">
        {filterKeys
          .sort((a, b) => (a.rank || Infinity) - (b.rank || Infinity))
          .map((item, index) => {
            return (
              <div className="">
                {item.selected && (
                  <div
                    key={item.id}
                    className="border d-flex me-2 justify-content-between border-secondary"
                  >
                    <div
                      onClick={() => {
                        setFieldName(item.id);
                        let itemIndex = filterKeys.findIndex(
                          (i) => i.id == item.id
                        );
                        setFilterKeys((prevKeys) => {
                          const update = [...prevKeys];
                          update[itemIndex] = {
                            ...update[itemIndex],
                            search_value: "",
                          };
                          return update;
                        });
                      }}
                      className="bg-gray text-white px-2 cursor-pointer"
                      htmlFor={item.value}
                    >
                      {item.name}
                    </div>
                    {item.search_value && (
                      <div className="px-2 bg-secondary fw-600">
                        {item.search_value || ""}
                        {/* <input type="text" placeholder="Search..." /> */}
                      </div>
                    )}
                    <div className="px-1 bg-secondary cursor-pointer">
                      <span
                        onClick={() => {
                          setFieldName(null);
                          setFilterKeys((prevKeys) => {
                            const update = [...prevKeys];
                            let itemIndex = update.findIndex(
                              (i) => i.id == item.id
                            );
                            update[itemIndex] = {
                              ...update[itemIndex],
                              selected: false,
                              search_value: "",
                              rank: "",
                            };
                            return update;
                          });
                        }}
                      >
                        {reactIcons.normalclose}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="">
        <div className="table_div custom-scroll-sm">
          <table className="default-table ">
            <thead className="position-sticky">
              <tr>
                <th className="" style={{ width: "200px" }}>
                  Assign On
                </th>
                <th style={{ width: "100px" }}>Job Code</th>
                <th style={{ width: "250px" }}>Job Title</th>
                <th style={{ width: "200px" }}>Client</th>
                <th style={{ width: "250px" }}>Contact Manager Name</th>
                <th style={{ width: "200px" }}>End Client </th>
                <th style={{ width: "250px" }}>LOB</th>
                <th style={{ width: "160px" }}>Job Type</th>
                <th style={{ width: "300px" }}>Job Location</th>
                <th style={{ width: "200px" }}>Job Status</th>
                <th style={{ width: "200px" }}>Account Manager</th>
                <th style={{ width: "150px" }}>Assigned To</th>
                <th style={{ width: "150px" }} className="">
                  Position
                </th>
                <th style={{ width: "150px" }} className="">
                  Submission
                </th>
                <th style={{ width: "150px" }}>Tagged</th>
                <th style={{ width: "150px" }}>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {jobDelegationData?.map((item, index) => {
                let {
                  assigned_date,
                  job_code,
                  job_create_date,
                  contact_manager,
                  job_title,
                  number_of_position,
                  lob_name,
                  client,
                  job_location,
                  end_client,
                  job_type,
                  account_manager,
                  assigned_to,
                  assigned_time,
                  submissions_done,
                  job_status,
                  tagged_count,
                } = item;

                return (
                  <>
                    <tr key={index}>
                      <td className="" style={{ width: "200px" }}>
                        {moment(assigned_date).format("DD-MM-YYYY  hh:mm A")}
                      </td>
                      <td className="" style={{ width: "100px" }}>
                        {job_code}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "250px" }}
                      >
                        {job_title}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        {client || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "250px" }}
                      >
                        {contact_manager || "N/A"}
                      </td>
                      <td
                        style={{ width: "200px" }}
                        className="text-capitalize"
                      >
                        {end_client || "N/A"}
                      </td>
                      <td
                        style={{ width: "250px" }}
                        className="text-capitalize"
                      >
                        {lob_name || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "160px" }}
                      >
                        {job_type || "N/A"}
                      </td>
                      {/* <td
                        className="text-capitalize"
                        style={{ width: "300px" }}
                      >
                        {job_location ? cleanString(job_location) : "N/A"}
                      </td> */}
                       <td
                       style={{width:"300px"}}
                      onMouseEnter={() => setOpenLoc(assigned_time)}
                      onMouseLeave={() => setOpenLoc(null)}
                    >
                      <div className="d-flex gap-1 flex-wrap">
                        {item.job_location &&
                          item.job_location
                            .split("  ")
                            .slice(0, 1)
                            .map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  // className="rounded-1 px-1"
                                  // style={{ background: "rgb(64 69 114 / 81%)" }}
                                >
                                  <span className="text-black">{cleanString(item)}</span>
                                </div>
                              );
                            })}
                        {item.job_location && item.job_location.split("  ").length > 1 && (
                          <span className="text-primary cursor-pointer fs-4">
                            {reactIcons.more}
                          </span>
                        )}
                        {!item.job_location && "N/A"}
                        {openLoc == assigned_time && (
                          <div
                            className="position-absolute bg-lightestblue px-2 d-flex gap-2 flex-wrap rounded-1"
                            style={{
                              width: "250px",
                              minHeight: "30px",
                              maxHeight: "fit-content",
                              zIndex: "5",
                            }}
                          >
                            {item.job_location &&
                              item.job_location.split("  ").map((item) => {
                                return (
                                  <span className="text-white">{cleanString(item)}</span>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        {job_status || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        {account_manager || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        onMouseEnter={() => setOpenAssign(assigned_time)}
                        onMouseLeave={() => setOpenAssign(null)}
                        style={{ width: "150px" }}
                      >
                        <div className="d-flex justify-content-center position-relative">
                          {/* {assigned_to?.slice(0, 2).map((_item, index) => {
                          return (
                            <div className="rounded-1 border border-primary px-1">
                              <span key={index}>
                                {_item}
                              </span>
                            </div>
                          );
                        })} */}
                          <span
                            // onMouseEnter={() => setOpenAssign(job_code)}
                            // onMouseLeave={() => setOpenAssign(null)}
                            className="cursor-pointer text-primary fs-5"
                          >
                            {reactIcons.peoplegroup}
                          </span>
                          {/* {assigned_to.length == 0 && "N/A"} */}
                          {openAssign == assigned_time && (
                            <div
                              className="position-absolute bg-lightestblue px-2 d-flex gap-2 flex-wrap rounded-1"
                              style={{
                                width: "250px",
                                minHeight: "30px",
                                maxHeight: "fit-content",
                                zIndex: "5",
                              }}
                            >
                              {assigned_to.map((_item, index) => {
                                return (
                                  <span key={index} className="text-white">
                                    {_item}
                                  </span>
                                );
                              })}
                              {assigned_to.length == 0 && "N/A"}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="" style={{ width: "150px" }}>
                        {number_of_position || "N/A"}
                      </td>
                      <td
                        className="d-flex flex-wrap gap-2"
                        style={{ width: "150px" }}
                      >
                        {submissions_done || "N/A"}
                      </td>
                      <td className="" style={{ width: "150px" }}>
                        {tagged_count}
                      </td>
                      <td className="" style={{ width: "150px" }}>
                        {job_create_date || "N/A"}
                      </td>
                    </tr>
                  </>
                );
              })}
              {/* End tr */}
              {jobDelegationData?.length == 0 && (
                <tr className="mt-5 ">
                  <td colSpan={4} className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {dataCount > 25 && (
          <Pagination dataCount={dataCount} page={page} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default JobDelegationReport;
