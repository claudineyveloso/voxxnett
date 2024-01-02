import React from "react";
import HeaderVertical from "@/app/components/headerVertical/page";

export default function Profile() {
  return (
    <>
      <div id="layout-wrapper">
        <HeaderVertical />
      </div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <h2 className="color-title">Perfil</h2>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}