"use client";

import { getReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";

const UsersListDropdown = ({
  selectedUsersIds,
  setSelectedUsersIds,
  withEmail = false,
  showUsersAbove = false,
  showUsersbelow = false,
}) => {
  const [open, setOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [search, setSearch] = useState("");

  const handleGetUsersList = async () => {
    const response = await getReq(`/users/${search ? `?search=${search}` : ""}`);
    if (response.status) {
      setUsersList(response.data);
    }
  };

  useEffect(() => {
    handleGetUsersList();
  }, [search]);

  const handleCheckboxChange = (item) => {
    const isSelected = selectedList.find((selected) => selected.id === item.id);
    
    if (isSelected) {
      setSelectedList((prev) => prev.filter((user) => user.id !== item.id));
      setSelectedUsersIds((prev) => prev.filter((id) => id !== item.id));
    } else {
      const newUser = {
        first_name: item.first_name + " " + item.last_name,
        id: item.id,
      };
      setSelectedList((prev) => [...prev, newUser]);
      setSelectedUsersIds((prev) => [...prev, item.id]);
    }
  };

  return (
    <div className="position-relative cursor-pointer">
      <div
        className="client-form-input d-flex justify-content-end"
        onClick={() => setOpen(!open)}
        style={{ minHeight: "36px", maxHeight: "fit-content" }}
      >
        {showUsersAbove && (
          <div className="d-flex flex-wrap gap-2">
            {selectedList.map((item) => (
              <div
                key={item.id}
                className="my-1 px-1 text-black fw-medium d-flex gap-1 rounded-1"
                style={{
                  background: "var(--primary-2nd-color)",
                }}
              >
                <span>{item.first_name}</span>
              </div>
            ))}
          </div>
        )}
        <span className="float-end">{reactIcons.downarrow}</span>
      </div>
      {open && (
        <div
          className="position-absolute bg-white border border-1 w-100 px-2"
          style={{
            top: "33px",
            zIndex: 10000,
            height: "200px",
            overflow: "auto",
          }}
        >
          <div className="my-1">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here..."
              className="px-1 bg-background"
            />
          </div>
          {usersList.map((item) => (
            <div key={item.id} className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={selectedList.some((selected) => selected.id === item.id)}
                onChange={() => handleCheckboxChange(item)}
              />
              <span className="mx-2">
                {item.first_name} {item.last_name} {withEmail && item.email}
              </span>
            </div>
          ))}
        </div>
      )}
      {showUsersbelow && (
        <div className="flex-wrap gap-2">
          {selectedList.map((item) => (
            <div
              key={item.id}
              className="my-1 px-1 d-flex align-items-center text-black fw-medium gap-1 rounded-1"
            >
              <span className="fs-5">{reactIcons.user}</span>
              <p className="fw-medium text-black">{item.first_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersListDropdown;
  