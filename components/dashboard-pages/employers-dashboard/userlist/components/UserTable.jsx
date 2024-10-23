"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import UserUpdateModal from "./UserUpdateModal";
import UserDeleteModal from "./components/UserDeleteModal";
import { toast } from "react-toastify";
import Pagination from "@/components/common/Pagination";
import { deleteReq, getReq, postApiReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import Loader from "@/components/common/Loader";
import debounce from "lodash/debounce";

const tabsName = [
  { id: 1, name: "ACTIVE USERS" },
  { id: 2, name: "INACTIVE USERS" },
];

const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const [item, setItem] = useState();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(1);
  const [search, setSearch] = useState("");
  const [csvFile, setCsvFile] = useState();

  // Fetch users with memoized function and debounce the search requests
  const fetchUserList = useCallback(async (search) => {
    setLoading(true);
    try {
      const response = await getReq(
        `/usersprofile/?active=${active === 1}&page=${page + 1}${
          search ? `&search=${search}` : ""
        }`
      );
      setUserData(response.data ? response.data.results : []);
      setDataCount(response.data.count);
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
    setLoading(false);
  }, [active, page]);

  const debouncedSearch = useMemo(() => debounce(fetchUserList, 500), [fetchUserList]);

  useEffect(() => {
   
    if (search) {
      setPage(0);
      debouncedSearch(search);
    } else {
      fetchUserList();
    }
  }, [active, search, page, debouncedSearch]);

  const handleDeleteUser = async (id) => {
    const response = await deleteReq(`/usersprofile/${id}/`);
    if (response.status) {
      toast.success("User has been successfully inactivated");
      fetchUserList();
    }
  };

  const handleActiveUser = async (id) => {
    const response = await postApiReq(`/usersprofile/${id}/activate=true/`);
    if (response.status) {
      toast.success("User has been successfully activated");
      fetchUserList();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  useEffect(() => {
    if (csvFile) {
      handleUploadCsvFile();
    }
  }, [csvFile]);

  const handleUploadCsvFile = async () => {
    const formData = new FormData();
    formData.append("file", csvFile);
    try {
      const response = await postApiReq("/upload-csv/", formData);
      if (response.status) {
        toast.success("CSV file has been successfully uploaded");
        fetchUserList();
      }
    } catch (err) {
      toast.error(err.response?.message || "Something went wrong");
    }
  };

  // Memoize table rows to prevent unnecessary re-renders
  const userRows = useMemo(
    () =>
      userData.map((item, index) => (
        <tr key={index}>
          <td style={{ width: "100px" }}>{item.empcode || "N/A"}</td>
          <td style={{ width: "200px" }}>
            {item.user.first_name} {item.user.last_name || "N/A"}
          </td>
          <td style={{ width: "300px" }}>{item.user.email || "N/A"}</td>
          <td style={{ width: "300px" }}>{item.user_skype_id || "N/A"}</td>
          <td style={{ width: "300px" }}>{item.role_name || "N/A"}</td>
          <td style={{ width: "150px" }}>{item.team || "N/A"}</td>
          <td style={{ width: "100px" }}>
            {item.user_branch === 1 ? "INDIA" : "USA"}
          </td>
          <td style={{ width: "100px" }}>{item.department_name || "N/A"}</td>
          <td style={{ width: "200px" }}>{item.reportingmanager_name || "N/A"}</td>
          <td className="text-left" style={{ width: "100px" }}>
            <div className="option-box text-center">
              <ul className="option-list">
                <li>
                  <button
                    onClick={() => setItem(item)}
                    data-bs-toggle="modal"
                    data-bs-target="#userUpdateModal"
                    data-text="Edit User"
                  >
                    <span className="las la-edit"></span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (active === 1) {
                        handleDeleteUser(item.id);
                      } else {
                        handleActiveUser(item.id);
                      }
                    }}
                    data-text={`${
                      active === 1 ? "Inactive User" : "Active User"
                    }`}
                  >
                    <span
                      className={`${
                        active === 1
                          ? "las la-times-circle"
                          : "las la-check-square"
                      }`}
                    ></span>
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      )),
    [userData, active]
  );

  return (
    <>
      {loading && <Loader />}
      <UserUpdateModal getUserList={fetchUserList} item={item} />
      <UserDeleteModal
        active={active}
        handleActiveUser={handleActiveUser}
        userId={userId}
        handleDeleteUser={handleDeleteUser}
      />
      <div className="col-xl-12 col-lg-12 my-3">
        <div className="d-flex justify-content-between">
          <div
            className="d-flex border border-primary rounded-1"
            style={{ width: "300px" }}
          >
            {tabsName.map((item) => (
              <div
                key={item.id}
                style={{ width: "150px", borderLeft: "2px" }}
                className={`text-center cursor-pointer rounded-1 ${
                  active === item.id
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
              >
                <li
                  onClick={() => {
                    setPage(0);
                    setActive(item.id);
                  }}
                >
                  {item.name}
                </li>
              </div>
            ))}
          </div>
          <div className="d-flex gap-2">
            <div className="position-relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "350px", height: "45px" }}
                className="border border-primary px-4 rounded-1 h-100"
                placeholder="Search anything..."
              />
              <span
                className="position-absolute fs-4 text-primary"
                style={{ left: "2px" }}
              >
                {reactIcons.search}
              </span>
              {search && (
                <span
                  onClick={() => setSearch("")}
                  className="position-absolute cursor-pointer text-primary fs-5"
                  style={{ right: "8px" }}
                >
                  {reactIcons.close}
                </span>
              )}
            </div>
            <div>
              <label>
                <div htmlFor="#upload">
                  <span className="theme-btn btn-style-one small">
                    Upload CSV File
                  </span>
                </div>
                <input
                  type="file"
                  id="upload"
                  onChange={handleFileUpload}
                  className="d-none"
                />
              </label>
            </div>
              {/* <button onClick={handleDownloadExcel} className="theme-btn btn-style-one small">CSV Format</button> */}
          </div>
        </div>
      </div>
      <div className="table_div custom-scroll-sm">
        <div className="table-wrapper">
          <table className="default-table">
            <thead>
              <tr>
                <th style={{ width: "100px" }}>Empcode</th>
                <th style={{ width: "200px" }}>Name</th>
                <th style={{ width: "300px" }}>Email</th>
                <th style={{ width: "300px" }}>Skype Id</th>
                <th style={{ width: "300px" }}>Role</th>
                <th style={{ width: "150px" }}>Team</th>
                <th style={{ width: "100px" }}>Branch</th>
                <th style={{ width: "100px" }}>Department</th>
                <th style={{ width: "200px" }}>Reporting Manager</th>
                <th style={{ width: "100px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 ? userRows : (
                <tr className="text-center mt-5">
                  <td colSpan={11}>No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination dataCount={dataCount} page={page} setPage={setPage} />
    </>
  );
};

export default UserTable;
