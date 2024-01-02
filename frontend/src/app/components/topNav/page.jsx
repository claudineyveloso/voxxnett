import React from "react"
import Link from "next/link"
export default function TopNav(){

  return (
    <div className="topnav">
      <div className="container-fluid active">
        <nav className="navbar navbar-light navbar-expand-lg topnav-menu active">
          <div className="collapse navbar-collapse active" id="topnav-menu-content">
            <ul className="navbar-nav active">
              <li className="nav-item">
                <Link
                  href={"/"}
                  className="nav-link dropdown-toggle arrow-none"
                  id="topnav-dashboard" 
                  role="button" 
                  data-toggle="dropdown" 
                  aria-haspopup="true" 
                  aria-expanded="false"                  
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-monitor icon nav-icon">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  <span data-key="t-dashboard">Dashboard</span>
                </Link>
                
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-pages" role="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid icon nav-icon">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span data-key="t-apps">Cadastros</span> 
                  <div className="arrow-down"></div>
                </a>
                <div className="dropdown-menu" aria-labelledby="topnav-pages">
                  <a href="apps-calendar.html" className="dropdown-item" data-key="t-calendar">Bucket</a>
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-ecommerce" role="button">
                      <span data-key="t-ecommerce">Equipamentos</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-ecommerce">
                      <a href="ecommerce-products.html" className="dropdown-item" data-key="t-products">Marca</a>
                      <a href="ecommerce-product-detail.html" className="dropdown-item" data-key="t-product-detail">Modelo</a>
                    </div>
                  </div>
                  <a href="apps-gallery.html" className="dropdown-item" data-key="t-gallery">Terminal</a>
                  <a href="apps-gallery.html" className="dropdown-item" data-key="t-gallery">Tronco</a>
                  <a href="apps-gallery.html" className="dropdown-item" data-key="t-gallery">Plano</a>
                  {/* 
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-ecommerce" role="button">
                      <span data-key="t-ecommerce">Ecommerce</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-ecommerce">
                      <a href="ecommerce-products.html" className="dropdown-item" data-key="t-products">Products</a>
                      <a href="ecommerce-product-detail.html" className="dropdown-item" data-key="t-product-detail">Product Detail</a>
                      <a href="ecommerce-orders.html" className="dropdown-item" data-key="t-orders">Orders</a>
                      <a href="ecommerce-customers.html" className="dropdown-item" data-key="t-customers">Customers</a>
                      <a href="ecommerce-cart.html" className="dropdown-item" data-key="t-cart">Cart</a>
                      <a href="ecommerce-checkout.html" className="dropdown-item" data-key="t-checkout">Checkout</a>
                      <a href="ecommerce-shops.html" className="dropdown-item" data-key="t-shops">Shops</a>
                      <a href="ecommerce-add-product.html" className="dropdown-item" data-key="t-add-product">Add Product</a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-email" role="button">
                      <span data-key="t-email">Email</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-email">
                      <a href="email-inbox.html" className="dropdown-item" data-key="t-inbox">Inbox</a>
                      <a href="email-read.html" className="dropdown-item" data-key="t-read-email">Read Email</a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-invoices" role="button">
                      <span data-key="t-invoices">Invoices</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-invoices">
                      <a href="invoices-list.html" className="dropdown-item" data-key="t-invoice-list">Invoice List</a>
                      <a href="invoices-detail.html" className="dropdown-item" data-key="t-invoice-detail">Invoice Detail</a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-contact" role="button">
                      <span data-key="t-contacts">Contacts</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-contact">
                      <a href="contacts-grid.html" className="dropdown-item" data-key="t-user-grid">User Grid</a>
                      <a href="contacts-list.html" className="dropdown-item" data-key="t-user-list">User List</a>
                      <a href="contacts-profile.html" className="dropdown-item" data-key="t-user-profile">Profile</a>
                    </div>
                  </div>
                  */}
                </div>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-uielement" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase icon nav-icon">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span data-key="t-elements">Elements</span> 
                  <div className="arrow-down"></div>
                </a>
                <div className="dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-xl" aria-labelledby="topnav-uielement">
                  <div className="ps-2 p-lg-0">
                    <div className="row">
                      <div className="col-lg-12">
                        <div>
                          <div className="menu-title">Elements</div>
                          <div className="row g-0">
                            <div className="col-lg-4">
                              <div>
                                <a href="ui-alerts.html" className="dropdown-item" data-key="t-alerts">Alerts</a>
                                <a href="ui-buttons.html" className="dropdown-item" data-key="t-buttons">Buttons</a>
                                <a href="ui-cards.html" className="dropdown-item" data-key="t-cards">Cards</a>
                                <a href="ui-carousel.html" className="dropdown-item" data-key="t-carousel">Carousel</a>
                                <a href="ui-dropdowns.html" className="dropdown-item" data-key="t-dropdowns">Dropdowns</a>
                                <a href="ui-grid.html" className="dropdown-item" data-key="t-grid">Grid</a>
                                <a href="ui-images.html" className="dropdown-item" data-key="t-images">Images</a>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div>
                                <a href="ui-lightbox.html" className="dropdown-item" data-key="t-lightbox">Lightbox</a>
                                <a href="ui-modals.html" className="dropdown-item" data-key="t-modals">Modals</a>
                                <a href="ui-offcanvas.html" className="dropdown-item" data-key="t-offcanvas">Offcanvas</a>
                                <a href="ui-rangeslider.html" className="dropdown-item" data-key="t-range-slider">Range Slider</a>
                                <a href="ui-progressbars.html" className="dropdown-item" data-key="t-progress-bars">Progress Bars</a>
                                <a href="ui-sweet-alert.html" className="dropdown-item" data-key="t-sweet-alert">Sweet-Alert</a>
                                <a href="ui-tabs-accordions.html" className="dropdown-item" data-key="t-tabs-accordions">Tabs &amp; Accordions</a>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div>
                                <a href="ui-typography.html" className="dropdown-item" data-key="t-typography">Typography</a>
                                <a href="ui-video.html" className="dropdown-item" data-key="t-video">Video</a>
                                <a href="ui-general.html" className="dropdown-item" data-key="t-general">General</a>
                                <a href="ui-colors.html" className="dropdown-item" data-key="t-colors">Colors</a>
                                <a href="ui-rating.html" className="dropdown-item" data-key="t-rating">Rating</a>
                                <a href="ui-notifications.html" className="dropdown-item" data-key="t-notifications">Notifications</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-components" role="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-archive icon nav-icon">
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                  </svg>
                  <span data-key="t-components">Components</span> 
                  <div className="arrow-down"></div>
                </a>
                <div className="dropdown-menu" aria-labelledby="topnav-components">
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-form" role="button">
                      <span data-key="t-forms">Forms</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-form">
                      <a href="form-elements.html" className="dropdown-item" data-key="t-form-elements">Form Elements</a>
                      <a href="form-layouts.html" className="dropdown-item" data-key="t-form-layouts">Form Layouts</a>
                      <a href="form-validation.html" className="dropdown-item" data-key="t-form-validation">Form Validation</a>
                      <a href="form-advanced.html" className="dropdown-item" data-key="t-form-advanced">Form Advanced</a>
                      <a href="form-editors.html" className="dropdown-item" data-key="t-form-editors">Form Editors</a>
                      <a href="form-uploads.html" className="dropdown-item" data-key="t-form-upload">Form File Upload</a>
                      <a href="form-wizard.html" className="dropdown-item" data-key="t-form-wizard">Form Wizard</a>
                      <a href="form-mask.html" className="dropdown-item" data-key="t-form-mask">Form Mask</a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-table" role="button">
                      <span data-key="t-tables">Tables</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-table">
                      <a href="tables-basic.html" className="dropdown-item" data-key="t-basic-tables">Basic Tables</a>
                      <a href="tables-advanced.html" className="dropdown-item" data-key="t-advanced-tables">Advance Tables</a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-charts" role="button">
                      <span data-key="t-charts">Charts</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-charts">
                      <a href="charts-apex.html" className="dropdown-item" data-key="t-apex-charts">Apex Charts</a>
                      <a href="charts-chartjs.html" className="dropdown-item" data-key="t-chartjs-charts">Chartjs Charts</a>
                      <a href="charts-tui.html" className="dropdown-item" data-key="t-ui-charts">Toast UI Charts</a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-icons" role="button">
                      <span data-key="t-icons">Icons</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-icons">
                      <a href="icons-feather.html" className="dropdown-item" data-key="t-feather">Feather</a>
                      <a href="icons-boxicons.html" className="dropdown-item" data-key="t-boxicons">Boxicons</a>
                      <a href="icons-materialdesign.html" className="dropdown-item" data-key="t-material-design">Material Design</a>
                      <a href="icons-fontawesome.html" className="dropdown-item" data-key="t-font-awesome">Font Awesome 5</a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-map" role="button">
                      <span data-key="t-maps">Maps</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-map">
                      <a href="maps-google.html" className="dropdown-item" data-key="t-google">Google</a>
                      <a href="maps-vector.html" className="dropdown-item" data-key="t-vector">Vector</a>
                      <a href="maps-leaflet.html" className="dropdown-item" data-key="t-leaflet">Leaflet</a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown active">
                <a className="nav-link dropdown-toggle arrow-none" href="#" id="topnav-more" role="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users icon nav-icon">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span data-key="t-pages">Pages</span> 
                  <div className="arrow-down"></div>
                </a>
                <div className="dropdown-menu active" aria-labelledby="topnav-more">
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-authentication" role="button">
                      <span data-key="t-authentication">Authentication</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-authentication">
                      <a href="auth-login.html" className="dropdown-item" data-key="t-login">Login</a>
                      <a href="auth-register.html" className="dropdown-item" data-key="t-register">Register</a>
                      <a href="auth-recoverpw.html" className="dropdown-item" data-key="t-recover-password">Recover Password</a>
                      <a href="auth-lock-screen.html" className="dropdown-item" data-key="t-lock-screen">Lock Screen</a>
                      <a href="auth-logout.html" className="dropdown-item" data-key="t-logout">Logout</a>
                      <a href="auth-confirm-mail.html" className="dropdown-item" data-key="t-confirm-mail">Confirm Mail</a>
                      <a href="auth-email-verification.html" className="dropdown-item" data-key="t-email-verification">Email Verification</a>
                      <a href="auth-two-step-verification.html" className="dropdown-item" data-key="t-two-step-verification">Two Step Verification</a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-utility" role="button">
                      <span data-key="t-utility">Utility</span> 
                      <div className="arrow-down"></div>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="topnav-utility">
                      <a href="pages-starter.html" className="dropdown-item" data-key="t-starter-page">Starter Page</a>
                      <a href="pages-maintenance.html" className="dropdown-item" data-key="t-maintenance">Maintenance</a>
                      <a href="pages-comingsoon.html" className="dropdown-item" data-key="t-coming-soon">Coming Soon</a>
                      <a href="pages-timeline.html" className="dropdown-item" data-key="t-timeline">Timeline</a>
                      <a href="pages-faqs.html" className="dropdown-item" data-key="t-faqs">FAQs</a>
                      <a href="pages-pricing.html" className="dropdown-item" data-key="t-pricing">Pricing</a>
                      <a href="pages-404.html" className="dropdown-item" data-key="t-error-404">Error 404</a>
                      <a href="pages-500.html" className="dropdown-item" data-key="t-error-500">Error 500</a>
                    </div>
                  </div>
                  <a href="layouts-horizontal.html" className="dropdown-item active" data-key="t-horizontal">Horizontal</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

  )
}