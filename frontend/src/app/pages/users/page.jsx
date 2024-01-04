'use client'
import { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import Image from "next/image"
//import ReactPaginate from 'react-paginate';
import Link from "next/link"
import axios from "axios"
import HeaderVertical from "@/app/components/headerVertical/page"
import Pagination from "@/app/components/pagination/page";
const Avatar = require("../../assets/images/male.png")

export default function Users() {

  const [userData, setUserData] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);  
  const [searchUser, setSearchUser] = useState('');

  const itemsPerPage = 10;
  

  useEffect(() => {
    const apiUrl = 'http://localhost:3001'
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/users`);
        setUserData(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
    fetchData(); 
  }, [])

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //const subset = userData.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleInputChange = (e) => {
    setSearchUser(e.target.value);
    setUserData(userData.filter(user =>
      user.email.toLowerCase().includes(searchUser.toLowerCase())
    ));
    console.log(searchUser)
  }

  const handleEditModal = (data) => {

  }

  // function handleChange(e) {
  //   //e.preventDefault();
  //   //const value = e.target.value;
  //   setUserData(userData.filter(user =>
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase())
  //   ));
  // }

  // const filteredUsers = userData.filter(user =>
  //   user.email.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
      <div id="layout-wrapper">
        <HeaderVertical />
      </div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title mb-0">Listagem de usuários</h4>
                    </div>
                  <div className="card-body">
                    {/* Add button */}
                    <div className="position-relative">
                      <div className="modal-button mt-2">
                        <div className="row align-items-start">
                          <div className="col-sm">
                            <div className="mt-3 mt-md-0 mb-3">
                              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addInvoiceModal">
                                <i className="mdi mdi-plus me-1"></i> Adicionar
                              </button>
                            </div>
                          </div>
                          
                          <div className="col-sm-auto">
                            <div className="d-flex gap-1">
                              <div className="dropdown">
                                <a className="btn btn-link text-body shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bx bx-dots-horizontal-rounded"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                  <li><a className="dropdown-item" href="#">Action</a></li>
                                  <li><a className="dropdown-item" href="#">Another action</a></li>
                                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Add button end */}
                    <div id="table-gridjs">
                      <div role="complementary" className="gridjs gridjs-container" style={{width: '100%'}}>
                        <div className="gridjs-head">
                          <div className="gridjs-search">
                            <input 
                              type="search" 
                              placeholder="Localizar usuário..." 
                              aria-label="Type a keyword..." 
                              className="gridjs-input gridjs-search-input" 
                              value={searchUser}
                              //onChange={(e) => setSearchTerm(e.target.value)}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="gridjs-wrapper" style={{height: 'auto'}}>
                          <table role="grid" className="gridjs-table" style={{height: 'auto'}}>
                            <thead className="gridjs-thead">
                              <tr className="gridjs-tr">
                                <th data-column-id="name" className="gridjs-th gridjs-th-sort" tabIndex="0" style={{minWidth: '184px', width: '280px'}}>
                                  <div className="gridjs-th-content">Email</div>
                                  <button tabIndex="-1" aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral"></button>
                                </th>
                                <th data-column-id="email" className="gridjs-th gridjs-th-sort" tabIndex="0" style={{minWidth: '177px', width: '80px'}}>
                                  <div className="gridjs-th-content">Tipo</div>
                                  <button tabIndex="-1" aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral"></button>
                                </th>
                                <th data-column-id="company" className="gridjs-th gridjs-th-sort" tabIndex="0" style={{minWidth: '199px', width: '100px'}}>
                                  <div className="gridjs-th-content">Cliente</div>
                                  <button tabIndex="-1" aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral"></button>
                                </th>
                                <th data-column-id="country" className="gridjs-th gridjs-th-sort" tabIndex="0" style={{minWidth: '113px', width: '170px'}}>
                                  <div className="gridjs-th-content">Country</div>
                                  <button tabIndex="-1" aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral"></button>
                                </th>
                                <th data-column-id="country" className="gridjs-th gridjs-th-sort" tabIndex="0" style={{minWidth: '100px', width: '100px'}}>
                                  <div className="gridjs-th-content">Ações</div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="gridjs-tbody">
                              {!!userData &&
                                userData.slice(startIndex, endIndex).map((data, i) => {
                                return <tr className="gridjs-tr" key={i}>
                                  <td data-column-id="code">
                                    <span>
                                      <Image 
                                        src={Avatar} 
                                        className="avatar-sm rounded-circle me-2"
                                        width="42" 
                                        height="42" 
                                        alt="user-pic" 
                                      />
                                      <a href="#" className="text-body">{data.email}</a>
                                    </span>
                                  </td>
                                  <td data-column-id="code" style={{ textTransform: 'capitalize'}}>{data.user_type}</td>
                                  <td data-column-id="code">{data.id}</td>
                                  <td data-column-id="code">{data.user_name}</td>
                                  <td data-column-id="viewDetails" className="gridjs-td">
                                    <span>
                                      <ul className="list-inline mb-0">
                                        <li className="list-inline-item">
                                          <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="" className="px-2 text-primary" data-bs-original-title="Edit" aria-label="Edit">
                                            <i className="bx bx-pencil font-size-18"></i>
                                          </a> 
                                        </li>
                                        <li className="list-inline-item"> 
                                          <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="" className="px-2 text-danger" data-bs-original-title="Delete" aria-label="Delete">
                                            <i className="bx bx-trash-alt font-size-18"></i>
                                          </a>
                                        </li>
                                        <li className="list-inline-item dropdown">
                                          <a className="text-muted dropdown-toggle font-size-18 px-2" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                            <i className="bx bx-dots-vertical-rounded"></i> 
                                          </a> 
                                          <div className="dropdown-menu dropdown-menu-end"> 
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                          </div>
                                        </li>
                                      </ul>
                                    </span>
                                  </td>
                                </tr>
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    <div className="row">
                      <div className="d-flex mt-4 justify-content-center ">
                        <div className="paginate">
                          <Pagination
                            pageCount={totalPages} // Total number of pages 
                            onPageChange={handlePageChange}// Function called when changing pages
                            forcePage={currentPage}
                          />
                        </div>

                      </div>
                    </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="addInvoiceModal" tabIndex="-1" aria-labelledby="addInvoiceModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addInvoiceModalLabel">Cadastro de usuário</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body p-4">
                    <form>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Usuário"
                        />
                        <label htmlFor="floatingInput">Usuário</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingInputEmail"
                          placeholder="nome@email.com.br"
                        />
                        <label htmlFor="floatingInputEmail">Email</label>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              id="floatingInputPassword"
                              placeholder="nome@email.com.br"
                            />
                            <label htmlFor="floatingInputPassword">Password</label>
                          </div>

                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" for="formrow-password-input">Password</label>
                            <input type="password" className="form-control" id="formrow-password-input" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary w-md end-0">Salvar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}