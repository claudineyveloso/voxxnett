import React from "react";
import NavBar from '../navBar/page'
import TopNav from '../topNav/page'

export default function HeaderVertical() {
  return (
    <header id="page-topbar" className="isvertical-topbar">
      <NavBar />
      <TopNav />
    </header>
  )
}

