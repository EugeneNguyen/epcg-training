import React from 'react';

export default function Paginator({total, offset, limit, onChangePage}) {
  const totalPage = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {[...Array(totalPage).keys()].map((index) => (
          <li className={index === currentPage ? "page-item active" : "page-item"}>
            <a className="page-link" onClick={() => onChangePage(index)}>
              {index + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}