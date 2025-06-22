import React from 'react'
import {Container,Logo,LogoutBtn} from '../index.js'
import { Link } from 'react-router-dom'
//  to check user is logged in or not
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
      const authStatus = useSelector((state) => state.auth.status);
      const navigate = useNavigate();
      const navItems = [
        {
          name : "Home",
          urlpath : "/",
          active : true
        },
        {
          name : "Login",
          urlpath : "/Login",
          active : !authStatus
        },
        {
          name : "Signup",
          urlpath : "/signup",
          active : !authStatus
        },
        {
          name : "All-Posts",
          urlpath : "/all-posts",
          active : authStatus
        },
          {
          name : "Add-Posts",
          urlpath : "/add-posts",
          active : authStatus
        }
      ]
   
  return (
    <header>
      <Container>
         <nav className='flex'>
              <div className="mr-4">
                <Link to = '/'>
                  <Logo width='80px'></Logo>
                </Link>
              </div>
            <ul className="flex ml-auto">
              {navItems.map((item) => (
                  item.active ? ((
                    <li key={item.name}>
                      <button className = 'inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                      onClick={ ( ) => 
                        navigate(item.urlpath)
                      }
                      >{item.name}</button>
                      
                    </li>
                  )) : null
              ))}
              {/* if true then execute this syntax */}
              {authStatus && (

                <li>
                  <LogoutBtn />
                  </li>
              )}
            </ul>
         </nav>
      </Container>
    </header>
  )
}

export default Header