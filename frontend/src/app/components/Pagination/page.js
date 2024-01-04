import React from 'react';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs"; // icons form react-icons
import { IconContext } from "react-icons"; // for customizing icons

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={onPageChange}
      containerClassName="pagination"
      activeClassName="active"
      previousClassName={'page-item'}
      nextClassName={'page-item'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'} 
      disabledClassName={'align-disabled'}
      previousLabel={'Anterior'}
      nextLabel={'Próximo'}
      nextLinkClassName={'page-link'} 
      previousLinkClassName={'page-link'} 
   />
  );
};

export default Pagination;