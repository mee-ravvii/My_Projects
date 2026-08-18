import React, { useState } from "react";
import { loginUser } from '../services/authServices'


import {
  Search,
  ShoppingCart,
  SlidersHorizontal,
  User,
  UserRound,
  LogIn,
  UserPlus,
} from "lucide-react";

import "../css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ search, setSearch, onFilterClick }) => {

  const [accountOpen, setAccountOpen] = useState(false);
  const [userName , setUsername] = useState(null);

  

  const getUserName = async()=>{

  }

  return (
    <nav className="navbar">

      {/* ================= LOGO ================= */}

      <div className="logo">
        <h2>Berlin's Store</h2>
      </div>


      {/* ================= SEARCH ================= */}

      <div className="search-container">

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="search-btn"
          title="Search"
        >
          <Search
            size={21}
            strokeWidth={2.2}
          />
        </button>

      </div>


      {/* ================= NAV ACTIONS ================= */}

      <div className="nav-actions">


        {/* ================= CART ================= */}

        <Link to={'/cart'}>
        
        <button
          className="nav-icon-btn"
          title="Cart"
        >

          <ShoppingCart
            size={24}
            strokeWidth={2}
          />

          <span className="cart-badge">
            0
          </span>

        </button>
        </Link> 



        {/* ================= FILTER ================= */}

        <button
          className="nav-icon-btn"
          title="Filter"
          onClick={onFilterClick}
        >

          <SlidersHorizontal
            size={24}
            strokeWidth={2}
          />

        </button>


        {/* ================= ACCOUNT ================= */}

        <div className="account-wrapper">
       
          <button
            className="profile-btn"
            title="Account"
            onClick={() => setAccountOpen(!accountOpen)}
          >
            <User size={23} />
          </button>
          


          {/* ================= ACCOUNT DROPDOWN ================= */}

          {accountOpen && (

            <div className="account-dropdown">


              <div className="account-dropdown-header">

                <div className="account-avatar">

                  <User size={20} />

                </div>

                <div>

                  <h4>Welcome! 🙋‍♂️{localStorage.getItem('username')}</h4>

                  <p>
                    Manage your account
                  </p>

                </div>

              </div>


              <div className="dropdown-divider"></div>


              <button className="account-option">

                <UserRound size={18} />

                <span>
                  Account
                </span>

              </button>

              <Link to={'/login'} >
                <button className="account-option" >

                  <LogIn size={18} />
                  <span>
                    {localStorage.getItem('username')?localStorage.getItem('username') :" 🙎‍♂️Login" }
                  </span>
                </button>
              </Link>


              <button className="account-option">

                <UserPlus size={18} />

                <span>
                  Sign Up
                </span>

              </button>


            </div>

          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;