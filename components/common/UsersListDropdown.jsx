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

  const handleGetUsersList = async () => {
    const response = await getReq(`/users/`);
    if (response.status) {
      setUsersList(response.data);
    }
  };

  useEffect(() => {
    handleGetUsersList();
  }, []);

  return (
    <div className="position-relative cursor-pointer">
      <div
        className="client-form-input d-flex justify-content-between"
        onClick={() => setOpen(!open)}
        style={{ minHeight: "36px", maxHeight: "fit-content" }}
      >
        {showUsersAbove && (
          <div className="d-flex flex-wrap gap-2">
            {selectedList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="my-1 px-1 text-black fw-medium d-flex gap-1 rounded-1"
                  style={{
                    background: "var(--primary-2nd-color)",
                  }}
                >
                  <span>{item.first_name}</span>
                </div>
              );
            })}
          </div>
        )}
        <span className="float-end">{reactIcons.downarrow}</span>
      </div>
      {open && (
        <div
          className="position-absolute bg-white border border-1 w-100 px-2 "
          style={{
            top: "33px",
            zIndex: 10000,
            height: "200px",
            overflow: "auto",
          }}
        >
          {usersList.map((item, index) => {
            return (
              <div key={index} className="">
                <input
                  type="checkbox"
                  checked={selectedList?.find(
                    (_item) => _item.first_name == item.first_name + " " + item.last_name
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedList((prev) => [
                        ...prev,
                        { first_name: item.first_name + " " + item.last_name },
                      ]);
                      let userId = item.id;
                      setSelectedUsersIds((prev) => [...prev, userId]);

                      // setForm((prev) => ({
                      //   ...prev,
                      //   recipientList: [
                      //     ...prev.recipientList,
                      //     { first_name: item.first_name },
                      //   ],
                      // }));
                      // setForm((prev) => ({
                      //   ...prev,
                      //   recipientIds: [
                      //     ...prev.recipientIds,
                      //     item.id,
                      //   ],
                      // }));
                    } else {
                      let filtered = [...selectedList];
                      let filteruser = filtered.filter(
                        (_item) =>
                          _item.first_name !=
                          item.first_name + " " + item.last_name
                      );
                      console.log("--------------filer ddd", filteruser);
                      setSelectedList(filteruser);
                      let filteredIds = [...selectedUsersIds];
                      let userIds = filteredIds.filter(
                        (_item) => _item != item.id
                      );
                      setSelectedUsersIds(userIds);
                      // setForm((prev) => ({
                      //   ...prev,
                      //   recipientList:
                      //     prev.recipientList.filter(
                      //       (_item, _index) =>
                      //         _item.first_name !==
                      //         item.first_name
                      //     ),
                      // }));
                      // setForm((prev) => ({
                      //   ...prev,
                      //   recipientIds: prev.recipientIds.filter(
                      //     (_item, _index) => _item !== item.id
                      //   ),
                      // }));
                    }
                  }}
                />
                <span className="mx-2">
                  {item.first_name} {item.last_name} {withEmail && item.email}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {showUsersbelow && (
        <div className=" flex-wrap gap-2">
          {selectedList.map((item, index) => {
            return (
              <div
                key={index}
                className="my-1 px-1 d-flex align-items-center text-black fw-medium  gap-1 rounded-1"
              >
                <span className="fs-5">{reactIcons.user}</span>
                <p className="fw-medium text-black">{item.first_name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UsersListDropdown;
