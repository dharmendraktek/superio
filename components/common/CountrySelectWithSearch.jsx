"use client";

import { reactIcons } from "@/utils/icons";
import { useState } from "react";

const CountrySelectWithSearch = ({ list = [], form, setForm }) => {
  const [dataList, setDataList] = useState(list);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm) {
      // Filter based on name and case-insensitive match
      const filterData = list.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setDataList(filterData);
    } else {
      // Reset to the original list, keeping selected state
      setDataList(list);
    }
  };

  return (
    <div className="w-100">
      <div className="dropdown w-100">
        <button
          type=""
          className="w-100 d-flex justify-content-between client-form-input"
          data-bs-toggle="dropdown"
        >
          <div className="d-flex gap-2 flex-wrap">{form.country}</div>
          <span>{reactIcons.arrowfilldown}</span>
        </button>
        <ul
          className="dropdown-menu w-100 custom-scroll-sm"
          style={{
            minHeight: "60px",
            maxHeight: "250px",
            overflow: "auto",
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Search here ..."
              value={search}
              className="px-2 w-100 client-form-input"
              onChange={handleSearchChange}
            />
          </div>
          {dataList.map((item, index) => (
            <li
              key={index}
              className="d-flex px-2 cursor-pointer gap-2 hover-bg-change"
              onClick={() => {
                setDataList(list);
                setSearch('');
                setForm((prev) => ({ ...prev, country: item.name }));
              }}
            >
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CountrySelectWithSearch;
