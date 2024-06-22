import React from "react";
import styled from "styled-components";

import MCMLogo from "../../img/MMCM_Logo.svg";

const Sidebar = styled.section`
 width: 20vw;
 height: 100vh;
 background-color: #c2c2c2;
 color: black;
 box-shadow: 5px 0px 8px 0px rgba(0, 0, 0, 0.75);
 -webkit-box-shadow: 5px 0px 8px 0px rgba(0, 0, 0, 0.75);
 -moz-box-shadow: 5px 0px 8px 0px rgba(0, 0, 0, 0.75);
`;

const SidebarContainer = styled.div`
 height: 85%;
 display: flex;
 flex-direction: column;
 /* justify-content: space-between; */
 align-items: center;
`;

const SidebarImgContainer = styled.div`
 margin-top: 24px;
 display: flex;
 justify-content: center;
 align-content: center;
`;

const SidebarMainContent = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 height: 50vh;
 width: 100%;
 margin-top: 100px;
`;

const UnorderedList = styled.ul`
 margin: 0;
 padding: 0;
 display: flex;
 flex-direction: column;
 text-decoration: none;
 list-style: none;
 list-style-type: none;
 gap: 12px;
`;

const List = styled.li`
 cursor: pointer;
 &:hover {
  text-decoration: underline;
 }
`;

const LogoutButtonContainer = styled.div``;

const LogoutButton = styled.button`
 font-size: large;
 font-weight: 500;
 width: 200px;
 height: 50px;
 padding: 12px;
 background-color: transparent;
 border-top: none;
 border-left: none;
 border-right: none;
 border-bottom: none;
 cursor: pointer;
 color: black;
 border-bottom: 1px solid;

 &:hover {
  background-color: black;
  color: white;
 }
`;

const SidebarComponent = () => {
 return (
  <Sidebar>
   <SidebarContainer>
    <SidebarImgContainer>
     <img
      src={MCMLogo}
      style={{ width: "65%", height: "auto" }}
      alt="MMCM Logo"
     />
    </SidebarImgContainer>

    <SidebarMainContent>
     <UnorderedList>
      <List>Requests</List>
      <List>Calendar</List>
      <List>Placeholder</List>
      <List>Placeholder</List>
     </UnorderedList>

     <LogoutButtonContainer>
      <LogoutButton>Logout</LogoutButton>
     </LogoutButtonContainer>
    </SidebarMainContent>
   </SidebarContainer>
  </Sidebar>
 );
};

export default SidebarComponent;
