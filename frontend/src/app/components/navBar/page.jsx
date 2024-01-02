import React from "react"

export default function NavBar() {

  return (
    <div className="navbar-header">
      <div className="d-flex">
        {/* <!-- LOGO --> */}
        <div className="navbar-brand-box">
          <a href="index.html" className="logo logo-dark">
          <span className="logo-sm">
          <img src="assets/images/logo-dark-sm.png" alt="" height="24" />
          </span>
          <span className="logo-lg">
          <img src="assets/images/logo-dark.png" alt="" height="26" />
          </span>
          </a>
          <a href="index.html" className="logo logo-light">
          <span className="logo-sm">
          <img src="assets/images/logo-light-sm.png" alt="" height="24" />
          </span>
          <span className="logo-lg">
          <img src="assets/images/logo-light.png" alt="" height="26" />
          </span>
          </a>
        </div>
        <button type="button" className="btn btn-sm px-3 font-size-24 d-lg-none header-item" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
        <i className="bx bx-menu align-middle"></i>
        </button>
        {/* <!-- start page title --> */}
        <div className="page-title-box align-self-center d-none d-md-block">
          <h4 className="page-title mb-0">Horizontal</h4>
        </div>
        {/* <!-- end page title --> */}
      </div>
      <div className="d-flex">
        <div className="dropdown d-inline-block">
          <button type="button" className="btn header-item noti-icon" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search icon-sm align-middle">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
            <form className="p-2">
              <div className="search-box">
                <div className="position-relative">
                  <input type="text" className="form-control rounded bg-light border-0" placeholder="Search..." />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search search-icon">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="dropdown d-inline-block">
          <button type="button" className="btn header-item noti-icon" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell icon-sm align-middle">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="noti-dot bg-danger rounded-pill">4</span>
          </button>
          <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
            <div className="p-3">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="m-0 font-size-15"> Notifications </h5>
                </div>
                <div className="col-auto">
                  <a href="#!" className="small fw-semibold text-decoration-underline"> Mark all as read</a>
                </div>
              </div>
            </div>
            <div data-simplebar="init" style={{maxHeight: '250px'}}>
              <div className="simplebar-wrapper" style={{margin: '0px'}}>
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer"></div>
                </div>
                <div className="simplebar-mask">
                  <div className="simplebar-offset" style={{right: '0px', bottom: '0px'}}>
                    <div className="simplebar-content-wrapper" style={{height: 'auto', paddingRight: '0px', paddingBottom: '0px', overflow: 'hidden'}}>
                      <div className="simplebar-content" style={{padding: '0px'}}>
                        <a href="#!" className="text-reset notification-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <img src="assets/images/users/avatar-3.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                            </div>
                            <div className="flex-grow-1">
                              <p className="text-muted font-size-13 mb-0 float-end">1 hour ago</p>
                              <h6 className="mb-1">James Lemire</h6>
                              <div>
                                <p className="mb-0">It will seem like simplified English.</p>
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="text-reset notification-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 avatar-sm me-3">
                              <span className="avatar-title bg-primary rounded-circle font-size-18">
                              <i className="bx bx-cart"></i>
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <p className="text-muted font-size-13 mb-0 float-end">3 min ago</p>
                              <h6 className="mb-1">Your order is placed</h6>
                              <div>
                                <p className="mb-0">If several languages coalesce the grammar</p>
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="text-reset notification-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 avatar-sm me-3">
                              <span className="avatar-title bg-success rounded-circle font-size-18">
                              <i className="bx bx-badge-check"></i>
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <p className="text-muted font-size-13 mb-0 float-end">8 min ago</p>
                              <h6 className="mb-1">Your item is shipped</h6>
                              <div>
                                <p className="mb-0">If several languages coalesce the grammar</p>
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="text-reset notification-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <img src="assets/images/users/avatar-6.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                            </div>
                            <div className="flex-grow-1">
                              <p className="text-muted font-size-13 mb-0 float-end">1 hour ago</p>
                              <h6 className="mb-1">Salena Layfield</h6>
                              <div>
                                <p className="mb-1">As a skeptical Cambridge friend of mine occidental.</p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="simplebar-placeholder" style={{width: '0px', height: '0px'}}></div>
              </div>
              <div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}>
                <div className="simplebar-scrollbar" style={{transform: "translate3d(0px, 0px, 0px)", display: "none"}}></div>
              </div>
              <div className="simplebar-track simplebar-vertical" style={{visibility: 'hidden'}}>
                <div className="simplebar-scrollbar" style={{transform: "translate3d(0px, 0px, 0px)", display: "none"}}></div>
              </div>
            </div>
            <div className="p-2 border-top d-grid">
              <a className="btn btn-sm btn-link font-size-14 btn-block text-center" href="javascript:void(0)">
              <i className="uil-arrow-circle-right me-1"></i> <span>View More..</span>
              </a>
            </div>
          </div>
        </div>
        <div className="dropdown d-inline-block">
          <button type="button" className="btn header-item noti-icon right-bar-toggle" id="right-bar-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings icon-sm">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>
        <div className="dropdown d-inline-block">
          <button type="button" className="btn header-item user text-start d-flex align-items-center" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img className="rounded-circle header-profile-user" src="assets/images/users/avatar-3.jpg" alt="Header Avatar" />
          <span className="d-none d-xl-inline-block ms-2 fw-medium font-size-15">Martin Gurley</span>
          </button>
          <div className="dropdown-menu dropdown-menu-end pt-0">
            <div className="p-3 border-bottom">
              <h6 className="mb-0">Martin Gurley</h6>
              <p className="mb-0 font-size-11 text-muted">martin.gurley@email.com</p>
            </div>
            <a className="dropdown-item" href="contacts-profile.html"><i className="mdi mdi-account-circle text-muted font-size-16 align-middle me-2"></i> <span className="align-middle">Profile</span></a>
            <a className="dropdown-item" href="apps-chat.html"><i className="mdi mdi-message-text-outline text-muted font-size-16 align-middle me-2"></i> <span className="align-middle">Messages</span></a>
            <a className="dropdown-item" href="pages-faqs.html"><i className="mdi mdi-lifebuoy text-muted font-size-16 align-middle me-2"></i> <span className="align-middle">Help</span></a>
            <a className="dropdown-item d-flex align-items-center" href="#"><i className="mdi mdi-cog-outline text-muted font-size-16 align-middle me-2"></i> <span className="align-middle me-3">Settings</span><span className="badge badge-soft-success ms-auto">New</span></a>
            <a className="dropdown-item" href="auth-lock-screen.html"><i className="mdi mdi-lock text-muted font-size-16 align-middle me-2"></i> <span className="align-middle">Lock screen</span></a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="auth-logout.html"><i className="mdi mdi-logout text-muted font-size-16 align-middle me-2"></i> <span className="align-middle">Logout</span></a>
          </div>
        </div>
      </div>
    </div>
  )
}
