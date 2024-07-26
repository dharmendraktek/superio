'use client'

import { reactIcons } from "@/utils/icons";
import { useState } from "react";

const MultiSelect = ({label, ownerList, setOwnerList, usersList, form, name, setForm, email}) => {
    const [openOwner, setOpenOwner] = useState(false);
    return(
        <div className="">
        <p>{label}</p>
        <div className="position-relative cursor-pointer">
          <div
            className="client-form-input d-flex justify-content-between custom-scroll-sm"
            onClick={() => setOpenOwner(!openOwner)}
            style={{
              minHeight: "36px",
              maxHeight: "100px",
              overflow: "auto",
            }}
          >
            <div className="d-flex flex-wrap gap-2">
              {ownerList?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="my-1 px-1 text-black fw-medium d-flex gap-1 rounded-1"
                    style={{ background: "var(--primary-2nd-color)" }}
                  >
                    <span>
                      {item.first_name} {item.last_name}
                    </span>
                    {/* <span onClick={() => handleClose(item)} className="text-black fs-6 cursor-pointer">{reactIcons.close}</span> */}
                  </div>
                );
              })}
            </div>
            <span className=" float-end">{reactIcons.downarrow}</span>
          </div>
          {openOwner && (
            <>
              {/* <div className="position-fixed w-100">
          <input type="text" className=""/>
        </div> */}
              <div
                className="position-absolute bg-white border border-1 w-100 px-2 custom-scroll-sm"
                style={{
                  top: "33px",
                  zIndex: 10000,
                  maxHeight: "250px",
                  overflow: "auto",
                }}
              >
                {usersList.map((item, index) => {
                  return (
                    <div key={index} className="">
                      <input
                        type="checkbox"
                        checked={form[name]?.find(
                          (_item) => _item == item.id
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setOwnerList((prev) => [...prev, item]);
                            setForm((prev) => ({
                              ...prev,
                              [name]: [...prev[name], item.id],
                            }));
                          } else {
                            const updatedOwnerList = ownerList.filter(
                              (_item) => _item.id !== item.id
                            );
                            setOwnerList(updatedOwnerList);
                            setForm((prev) => ({
                              ...prev,
                              [name]: prev[name].filter(
                                (_item) => _item !== item.id
                              ),
                            }));
                          }
                        }}
                      />
                      <span className="mx-2">
                        {item.first_name} {item.last_name}{" "}
                        {email ? item.email : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    )
}

export default MultiSelect;