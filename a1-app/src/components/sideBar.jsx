/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import styled from "styled-components";
// import { Link } from "react-scroll";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData, SidebarData_2 } from "./sideBarData";
import SubMenu from "./subMenu";

const Nav = styled.div`
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  margin-top: -85px;
  @media (max-width: 766px) {
    margin-top: 0px;
    margin-left: -20px;
    height: 40px;
    position: unset;
  }
`;

const NavIcon = styled(Link)`
  cursor: pointer;
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 766px) {
    font-size: 1.7rem;
  }
`;

const SidebarNav = styled.nav`
  background: #333;
  width: 350px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSideBar] = useState(false);
  const showSidebar = () => setSideBar(!sidebar);

  const hrStyle = {
    display: "block",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    height: "4px",
    backgroundColor: "white",
  };

  var sideData;

  if (localStorage.getItem("Auth")) {
    sideData = SidebarData_2;
  } else {
    sideData = SidebarData;
  }

  return (
    <>
      <Nav>
        <NavIcon to="#">
          <FaIcons.FaBars onClick={showSidebar} style={{ color: "white" }} />
        </NavIcon>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to="#">
            <AiIcons.AiOutlineClose
              onClick={showSidebar}
              style={{ color: "white" }}
            />
          </NavIcon>
          <hr style={hrStyle}></hr>
          <SubMenu item={sideData} />
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
