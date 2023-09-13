import { useState,useEffect } from "react";
import styled from "styled-components";
import Login from "./pages/Login";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import Category from "./components/Category";
import { GiKnifeFork } from "react-icons/gi";
import { Link,useNavigate } from "react-router-dom";

const App = () => {
  const [logedin,setIslogedin]=useState(false);
  const [openLogin,setOpenLogin]=useState(logedin || false);
  const navigate=useNavigate();
  useEffect(()=>{
    setIslogedin(localStorage.getItem('token') || false )
   
  },[logedin])

  function logoutUser(){
    localStorage.removeItem('token');
    setIslogedin(false)
  }
  return (
    <div>
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"}>delicious</Logo>{
          logedin ?<>
          <Button onClick={()=>navigate('/favourites')}  > Favourites</Button> 
          <Button 
          onClick={()=>{logoutUser()}}
          > Logout</Button>
          </>
          :
          <Button onClick={()=>{
            setOpenLogin((val)=>!val)}} 
          > Login</Button>

        }
       
     
      </Nav>
      
      {openLogin &&  <Login boxOpen={setOpenLogin} fun={setIslogedin}/>} 
          <Search />
          <Category />
          <Pages />
     
    
    </div>
  );
};

const Button = styled.button`
  padding: 0.5rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
  margin-left:40px
`;

const Nav = styled.div`
  padding: 4rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

export default App;