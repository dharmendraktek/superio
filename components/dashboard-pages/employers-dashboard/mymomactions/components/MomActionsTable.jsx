"use client";

import AddMomAction from "@/components/common/AddMomAction";
import AddMomModal from "@/components/common/AddMomModal";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import JobDetailsPreviewModal from "@/components/common/JobDetailsPreviewModal";
import Loader from "@/components/common/Loader";
import MultiFilterSearch from "@/components/common/MultiFilterSearch";
import MultiSearch from "@/components/common/MultiSearch";
import Pagination from "@/components/common/Pagination";
import { deleteReq, getApiReq, getReq } from "@/utils/apiHandlers";
import { jobReportFilterKey } from "@/utils/constant";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import { cleanString } from "@/utils/regex";
import FileSaver from "file-saver";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MomActionsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [momActionsData, setMomActionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAct, setOpenAct] = useState(false);
  const [expand, setExpand] = useState(null);
  const [allParam, setAllParam] = useState("");
  const [filterKeys, setFilterKeys] = useState(jobReportFilterKey);
  const [momItem, setMomItem] = useState("");
  const [momActionDetails, setMomActionDetails] = useState("");
  const [openAssign, setOpenAssign] = useState(null);
  const [openTaskOwner, setOpenTaskOwner] = useState(null);

  useEffect(() => {
    let param = "";

    // Include date parameters if both startDate and endDate are present
    if (startDate && endDate) {
      param += `&job_created_start=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&job_created_end=${moment(endDate).format("YYYY-MM-DD")}`;
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
      getMomActionsList(param);
    } else if (page) {
      getMomActionsList(param);
    } else {
      getMomActionsList(param);
    }
  }, [startDate, endDate, page, filterKeys]);

  const handleClear = () => {
    const updatedFilters = filterKeys.map((item) => ({
      ...item,
      selected: false,
      search_value: null,
      rank: null,
    }));
    setFilterKeys(updatedFilters);
    setFieldName("");
    setStartDate(null);
    setEndDate(null);
    setSearch("");
    setPage(0);
  };

  const handleExportExcel = async () => {
    const response = await getApiReq(
      `${
        allParam
          ? `/job-report/report/?${allParam}&export=excel`
          : "/job-report/report/?export=excel"
      }`
    );
    if (response.status) {
      var blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(blob, "jobs-report.xlsx");
    }
  };

  const getMomActionsList = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      `/meeting-action-items/?page=${page + 1}&size=25${param ? param : ""}`
    );
    setIsLoading(false);
    if (response.status) {
      setDataCount(response.data.count);
      setMomActionsData(response.data.results || response.data);
    }
  };

  const handleDeleteAction = async (id) => {
    const response = await deleteReq(`/meeting-item-items/${id}/`);
    if (response.status) {
      toast.success("Action Item has been successfully Deleted");
      getMomActionsList();
    }
  };

  const handleDeleteMom = async (id) => {
    const response = await deleteReq(`/meeting-minutes/${id}/`);
    if (response.status) {
      toast.success("MOM has been successfully Deleted");
      getMomActionsList();
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <AddMomAction
        setMomActionDetails={setMomActionDetails}
        momActionDetails={momActionDetails}
        handleGetMom={getMomActionsList}
        momItem={momItem}
        setMomItem={setMomItem}
      />
      <JobDetailsPreviewModal jobDetails={momItem} setJobDetails={setMomItem} />
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <div className="py-1">
            <h4>My MOM Actions</h4>
          </div>
          {/* <MultiFilterSearch
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
          /> */}
          <div className="d-flex gap-2 justify-content-end align-items-center">
            {/* <div className="d-flex gap-2 mt-1">
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
            </div> */}
            {/* <div className="d-flex gap-2">
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
            </div> */}
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div>
            {/* <span className="text-primary">{dataCount} records</span> */}
          </div>
          {/* <button
            className="theme-btn btn-style-one small d-flex align-items-center gap-2"
            onClick={() => handleExportExcel()}
          >
            <span className="fw-600 fs-6">Excel</span>
            <span>{reactIcons.download}</span>
          </button> */}
          {/* <button
            className="theme-btn btn-style-one small d-flex align-items-center gap-2"
            // onClick={() => handleExportExcel()}
            data-bs-toggle="offcanvas"
            data-bs-target="#addMomModal"
            aria-controls="offcanvasRight"
          >
            <span className="fw-600 fs-6">Create</span>
          </button> */}
          {/* <div class="dropdown">
            <button
              type="button"
              class="theme-btn btn-style-one small"
              data-bs-toggle="dropdown"
            >
              Create
            </button>
            <ul class="dropdown-menu">
              <li
                data-bs-toggle="offcanvas"
                data-bs-target="#addMomModal"
                aria-controls="offcanvasRight"
                className="cursor-pointer text-black"
                onClick={() => {
                  setMomItem("");
                }}
              >
                <a class="dropdown-item" href="#">
                  MOM
                </a>
              </li>
              <li
                data-bs-toggle="offcanvas"
                data-bs-target="#addMomActionModal"
                aria-controls="offcanvasLeft"
                className="cursor-pointer  text-black"
                //  onClick={() => setOpen(!open)}
              >
                <a class="dropdown-item" href="#">
                  Action Item
                </a>
              </li>
            </ul>
          </div> */}
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
      <div className="mt-2">
        <div className="table_div custom-scroll-sm">
          <table className="default-table ">
            <thead className="position-sticky">
              <tr>
                <th style={{ width: "300px" }}>Task</th>
                <th style={{ width: "100px" }}>Task Owner</th>
                <th style={{ width: "100px" }}>Timeline</th>
                <th style={{ width: "300px" }}>Action Taken</th>
                <th style={{ width: "300px" }}>Result</th>
                <th style={{ width: "150px" }}>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Head Ownership</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {momActionsData.length > 0 &&
                momActionsData?.map((item, index) => {
                  const {
                    task,
                    timeline,
                    action_taken,
                    result,
                    created_at,
                    updated_at,
                    meeting_ref,
                    ownership_details,
                    head_ownership_details,
                    status_details,
                  } = item;

                  return (
                    <>
                      <tr key={item.id}>
                        <td
                          onClick={() => {
                            setMomActionDetails(item);
                            setMomItem(item);
                          }}
                          data-bs-toggle="offcanvas"
                          data-bs-target="#addMomActionModal"
                          aria-controls="offcanvasLeft"
                          className="cursor-pointer fw-bold"
                          style={{ width: "300px" }}
                        >
                          {task || "N/A"}
                        </td>
                        <td
                          style={{ width: "100px" }}
                          className=""
                          onMouseEnter={() => setOpenTaskOwner(item.id)}
                          onMouseLeave={() => setOpenTaskOwner(null)}
                        >
                          <div className="d-flex px-5 position-relative">
                            <span className="cursor-pointer text-primary fs-5">
                              {reactIcons.peoplegroup}
                            </span>
                            {openTaskOwner == item.id && (
                              <div
                                className="position-absolute bg-lightestblue px-2 d-flex gap-2 flex-wrap rounded-1"
                                style={{
                                  width: "250px",
                                  minHeight: "30px",
                                  maxHeight: "fit-content",
                                  zIndex: "5",
                                }}
                              >
                                {ownership_details.map((item) => {
                                  return (
                                    <span className="text-white">
                                      {item.first_name} {item.last_name}
                                    </span>
                                  );
                                })}
                                <span className="text-white">
                                  {ownership_details.length == 0 &&
                                    "Not available"}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td style={{ width: "100px" }}>
                          {moment(timeline).format("DD-MM-yyyy") || "N/A"}
                        </td>
                        <td style={{ width: "300px" }}>
                          {action_taken || "N/A"}
                        </td>
                        <td style={{ width: "300px" }}>{result || "N/A"}</td>
                        <td style={{ width: "150px" }}>
                          {status_details?.name || "N/A"}
                        </td>
                        <td>{moment(created_at).format("DD-MM-yyyy")}</td>
                        <td>{moment(updated_at).format("DD-MM-yyyy")}</td>
                        <td>
                          {head_ownership_details.map((item) => {
                            return (
                              <span key={item.id} className="text-black">
                                {item.first_name} {item.last_name}
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <span
                              className="text-primary cursor-pointer"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#addMomActionModal"
                              aria-controls="offcanvasLeft"
                              onClick={() => setContactDetails(item)}
                            >
                              {reactIcons.edit}
                            </span>
                            <span
                              onClick={() => handleDeleteAction(item.id)}
                              className="text-danger cursor-pointer"
                            >
                              {reactIcons.delete}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              {/* End tr */}
              {momActionsData?.length == 0 && (
                <tr className="mt-5 ">
                  <td colSpan={6} className="text-center">
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

export default MomActionsTable;
