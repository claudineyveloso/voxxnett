import Image from 'next/image'
import styles from './page.module.css'
import NavBar from './components/navBar/page'

export default function Home() {
  debugger
  return (
    <div id="layout-wrapper">
      <header id="page-topbar" className="isvertical-topbar">
        <NavBar />
      </header>
      
    </div>
    
  )
}
