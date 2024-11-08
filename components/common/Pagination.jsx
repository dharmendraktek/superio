import { reactIcons } from '@/utils/icons';
import React from 'react';
import ReactPaginate from 'react-paginate';
const Pagination = ({ dataCount, pageSize=25, setPage, page }) => {
  const handlePageClick = (event) => {
    setPage(event.selected);
  };
  return (
    <div className="py-2 d-flex justify-content-center align-items-center">
      {/* <div>
        <label className="text-black">Page Size</label>
        <select
          onChange={(e) => setPageSize(e.target.value)}
          value={pageSize}
          className="w-16 border-[1px] custom-select-drop text-black ml-3 border-yellow rounded-md py-1 px-2 border-solid"
        >
          <option value={'10'}>10</option>
          <option value={'20'}>20</option>
        </select>
      </div> */}
      <ReactPaginate
        nextLabel={<span className='fs-6'>{reactIcons.fastForward}</span>}        
        onPageChange={handlePageClick}
        forcePage={page}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(dataCount/ 25)}
        previousLabel={<span className='fs-6'>{reactIcons.fastBackward}</span>}
        renderOnZeroPageCount={null}
        containerClassName="d-flex justify-content-center text-black gap-2 align-items-center pagination-container bg-white"
        pageClassName="pagination-item-style"
        activeClassName="bg-primary text-white"
        previousClassName="pagination-item-style"
        nextClassName="pagination-item-style"
        disabledClassName="disabled-item"
      />
      <div>
        <span>{page ? ((pageSize * (page+1))-pageSize+1) : page+1} - {dataCount > pageSize * (page+1) ? pageSize * (page+1) : dataCount } of {dataCount } </span>
      </div>
    </div>
  );
};

export default Pagination;