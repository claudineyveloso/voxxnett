import Image from 'next/image'
import styles from './page.module.css'
import HeaderVertical from './components/headerVertical/page'
export default function Home() {
  debugger
  return (
    <>
      <div id="layout-wrapper">
        <HeaderVertical />
      </div>

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <h2 className='color-title'>Dashboard</h2>
            </div>
            <div className="row">
              <div className="col-xl col-sm-6">
                {/* <!-- Card --> */}
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="mb-2">
                          46.34k
                        </h4>
                        <p className="text-muted mb-0">Total Sales</p>
                      </div>
                      <div className="avatar-md">
                        <span className="avatar-title bg-soft-primary rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase font-size-24 text-primary">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl col-sm-6">
                {/* <!-- Card --> */}
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="mb-2">
                          3,895
                        </h4>
                        <p className="text-muted mb-0">Total Items</p>
                      </div>
                      <div className="avatar-md">
                        <span className="avatar-title bg-soft-primary rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag font-size-24 text-primary">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl col-sm-6">
                {/* <!-- Card --> */}
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="mb-2">
                          $61,985
                        </h4>
                        <p className="text-muted mb-0">Average Sales</p>
                      </div>
                      <div className="avatar-md">
                        <span className="avatar-title bg-soft-primary rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign font-size-24 text-primary">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl col-sm-6">
                {/* <!-- Card --> */}
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="mb-2">
                          12,584
                        </h4>
                        <p className="text-muted mb-0">Total Users</p>
                      </div>
                      <div className="avatar-md">
                        <span className="avatar-title bg-soft-primary rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users font-size-24 text-primary">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl">
                {/* <!-- Card --> */}
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="mb-2">
                          24,526
                        </h4>
                        <p className="text-muted mb-0">Order Delivery</p>
                      </div>
                      <div className="avatar-md">
                        <span className="avatar-title bg-soft-primary rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-truck font-size-24 text-primary">
                            <rect x="1" y="3" width="15" height="13"></rect>
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                            <circle cx="5.5" cy="18.5" r="2.5"></circle>
                            <circle cx="18.5" cy="18.5" r="2.5"></circle>
                          </svg>
                        </span>
                      </div>
                    </div>
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
