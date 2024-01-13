'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCustomers, deleteCustomer } from '@/app/components/api/page';
import HeaderVertical from '@/app/components/headerVertical/page';
import Pagination from '@/app/components/pagination/page';
import Errors from '../errors/page';
import Swal from 'sweetalert2';

export default function Customers() {
  const [customerData, setCustomerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCustomers(searchCustomer);
        setCustomerData(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      } catch (error) {
        console.error('Erro ao buscar os dados do cliente:', error);
      }
    };
    fetchData();
  }, [searchCustomer, loading]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //const subset = userData.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleInputChange = async (e) => {
    setSearchCustomer(e.target.value);
  };

  const backgroundColor = (people_type) => {
    switch (people_type) {
      case 'fisica':
        return 'badge-soft-success';
      default:
        return 'badge-soft-warning';
    }
  };

  const handleEditCustomer = async (customerId) => {
    //debugger
    // Redirecionar para o formulário de edição do usuário
    router.push(`/pages/customers/edit`);
  };

  const handleDelete = async (customerId) => {
    await Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(
          'Esse é o valor de result dentro de handleDelete',
          result.message
        );
        removeCustomer(customerId);
        Swal.fire('Deletado!', 'O registro foi deletado.', 'success');
      }
    });
  };

  const removeCustomer = async (customerId) => {
    console.log('Valor do Id do usuário para ser deletado', customerId);
    await deleteCustomer(customerId)
      .then((response) => {
        console.log('Response:', response.data);
        setLoading(true);
      })
      .catch((error) => {
        console.error('Erro:', error);
        return <Errors props={error.message} />;
      });
  };

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
                    <h4 className="card-title mb-0">Listagem de clientes</h4>
                  </div>
                  <div className="card-body">
                    {/* Add button */}
                    <div className="position-relative">
                      <div className="modal-button mt-2">
                        <div className="row align-items-start">
                          <div className="col-sm">
                            <div className="mt-3 mt-md-0 mb-3">
                              <Link
                                href="/pages/customers/create"
                                className="btn btn-success"
                              >
                                <i className="mdi mdi-plus me-1"></i> Adicionar
                              </Link>
                            </div>
                          </div>

                          <div className="col-sm-auto">
                            <div className="d-flex gap-1">
                              <div className="dropdown">
                                <a
                                  className="btn btn-link text-body shadow-none dropdown-toggle"
                                  href="#"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="bx bx-dots-horizontal-rounded"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Action
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Another action
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Something else here
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Add button end */}
                    <div id="table-gridjs">
                      <div
                        role="complementary"
                        className="gridjs gridjs-container"
                        style={{ width: '100%' }}
                      >
                        <div className="gridjs-head">
                          <div className="gridjs-search">
                            <input
                              type="search"
                              placeholder="Localizar cliente..."
                              aria-label="Type a keyword..."
                              className="gridjs-input gridjs-search-input"
                              value={searchCustomer}
                              //onChange={(e) => setSearchTerm(e.target.value)}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div
                          className="gridjs-wrapper"
                          style={{ height: 'auto' }}
                        >
                          <table
                            role="grid"
                            className="gridjs-table"
                            style={{ height: 'auto' }}
                          >
                            <thead className="gridjs-thead">
                              <tr className="gridjs-tr">
                                <th
                                  data-column-id="name"
                                  className="gridjs-th gridjs-th-sort"
                                  tabIndex="0"
                                  style={{ minWidth: '184px', width: '280px' }}
                                >
                                  <div className="gridjs-th-content">
                                    Nome/Razão Social
                                  </div>
                                  <button
                                    tabIndex="-1"
                                    aria-label="Sort column ascending"
                                    title="Sort column ascending"
                                    className="gridjs-sort gridjs-sort-neutral"
                                  ></button>
                                </th>
                                <th
                                  data-column-id="email"
                                  className="gridjs-th gridjs-th-sort"
                                  tabIndex="0"
                                  style={{ minWidth: '177px', width: '80px' }}
                                >
                                  <div className="gridjs-th-content">
                                    Tipo Pessoa
                                  </div>
                                  <button
                                    tabIndex="-1"
                                    aria-label="Sort column ascending"
                                    title="Sort column ascending"
                                    className="gridjs-sort gridjs-sort-neutral"
                                  ></button>
                                </th>
                                <th
                                  data-column-id="company"
                                  className="gridjs-th gridjs-th-sort"
                                  tabIndex="0"
                                  style={{ minWidth: '199px', width: '100px' }}
                                >
                                  <div className="gridjs-th-content">
                                    CPF/CNPJ
                                  </div>
                                  <button
                                    tabIndex="-1"
                                    aria-label="Sort column ascending"
                                    title="Sort column ascending"
                                    className="gridjs-sort gridjs-sort-neutral"
                                  ></button>
                                </th>
                                <th
                                  data-column-id="country"
                                  className="gridjs-th gridjs-th-sort"
                                  tabIndex="0"
                                  style={{ minWidth: '113px', width: '170px' }}
                                >
                                  <div className="gridjs-th-content">
                                    Endereço
                                  </div>
                                  <button
                                    tabIndex="-1"
                                    aria-label="Sort column ascending"
                                    title="Sort column ascending"
                                    className="gridjs-sort gridjs-sort-neutral"
                                  ></button>
                                </th>
                                <th
                                  data-column-id="country"
                                  className="gridjs-th gridjs-th-sort"
                                  tabIndex="0"
                                  style={{ minWidth: '100px', width: '100px' }}
                                >
                                  <div className="gridjs-th-content">Ações</div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="gridjs-tbody">
                              {!!customerData &&
                                customerData
                                  .slice(startIndex, endIndex)
                                  .map((data, i) => {
                                    return (
                                      <tr className="gridjs-tr" key={i}>
                                        <td data-column-id="code">
                                          {data.people[0]?.first_name}
                                        </td>
                                        <td
                                          data-column-id="code"
                                          style={{
                                            textTransform: 'capitalize'
                                          }}
                                        >
                                          <span>
                                            <span
                                              className={`badge badge-pill ${backgroundColor(
                                                data.people_type
                                              )} font-size-12`}
                                            >
                                              {data.people_type}
                                            </span>
                                          </span>
                                        </td>
                                        <td data-column-id="code">
                                          {data.people[0]?.cpf_cnpj}
                                        </td>
                                        <td data-column-id="code">
                                          {data.addresses[0]?.street}
                                        </td>

                                        <td
                                          data-column-id="viewDetails"
                                          className="gridjs-td"
                                        >
                                          <span>
                                            <ul className="list-inline mb-0">
                                              <li className="list-inline-item">
                                                <Link
                                                  href={`/pages/customers/${data.id}`}
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="top"
                                                  title=""
                                                  className="px-2 text-primary"
                                                  data-bs-original-title="Edit"
                                                  aria-label="Edit"
                                                >
                                                  <i className="bx bx-pencil font-size-18"></i>
                                                </Link>
                                              </li>
                                              <li className="list-inline-item">
                                                <Link
                                                  href="#"
                                                  data-bs-toggle="tooltip"
                                                  data-bs-placement="top"
                                                  title=""
                                                  className="px-2 text-danger"
                                                  data-bs-original-title="Delete"
                                                  aria-label="Delete"
                                                  onClick={() =>
                                                    handleDelete(data.id)
                                                  }
                                                >
                                                  <i className="bx bx-trash-alt font-size-18"></i>
                                                </Link>
                                              </li>
                                              <li className="list-inline-item dropdown">
                                                <a
                                                  className="text-muted dropdown-toggle font-size-18 px-2"
                                                  href="#"
                                                  role="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-haspopup="true"
                                                  aria-expanded="false"
                                                >
                                                  <i className="bx bx-dots-vertical-rounded"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                  >
                                                    Action
                                                  </a>
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                  >
                                                    Another action
                                                  </a>
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                  >
                                                    Something else here
                                                  </a>
                                                </div>
                                              </li>
                                            </ul>
                                          </span>
                                        </td>
                                      </tr>
                                    );
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
                              onPageChange={handlePageChange} // Function called when changing pages
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
          </div>
        </div>
      </div>
    </>
  );
}
