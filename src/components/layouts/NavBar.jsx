import React,{useState,useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'   
import UserContext from '../../contexts/user'
import logo from "../../assets/logo.png"
import { useMoralis } from 'react-moralis'
function NavBar({title}) {  
  const {isAuthenticated,connect,disconnect,accountChanged}= useContext(UserContext)
  const {Moralis} = useMoralis()
  useEffect(()=>{
    Moralis.onAccountChanged(async (account)=>{
      await accountChanged(account)
    }) 
              
  },[])
  return (
 
  <div className="navbar shadow-lg bg-gradient-to-tr from-primary to-secondary">
    <div className="container mx-auto">
    <div className="navbar-start">
   
      <Link to={'/'} className="btn btn-ghost normal-case text-xl md:w-1/3">
         <img src={logo} alt="MEHG TOKEN LOGO" className=' float-left' />
      </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal p-0">
         
         
      </ul>
    </div>
      <div className="navbar-end">
       
     {
        (!isAuthenticated)?
        (<button className="btn btn-success" onClick={connect}>Connect Wallet</button>):
        (<div className="dropdown dropdown-end float-right">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" alt='test'/>
                </div>
              </label>
              <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <button onClick={disconnect} className="justify-between btn btn-error">
                   Disconnect Wallet
                  </button>
                </li> 
              </ul>
            </div>)
        }  
          
         
      </div>
    </div>  
  </div>

  )
}

NavBar.defaultProps = {
  title:'MEHG Token'
}
NavBar.prototype ={
  title: PropTypes.string,
}
export default NavBar