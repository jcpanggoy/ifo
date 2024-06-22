import React from "react";
import styled from "styled-components";

import MCMLogo from "../../img/MMCM_Logo.svg";

const Nav = styled.nav`
    width: 100%;
    display: flex;
    background-color: gray;
`;

const NavContainer = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
`;

const Img = styled.img`
    height: 120px;
    width: auto;
`;

const ImgContainer = styled.div`
    /* padding: 8px;
    margin: 4px; */
`;

const Navbar = () => {
    return (
        <Nav>
            <NavContainer>
                <ImgContainer>
                    <Img src={MCMLogo} />
                </ImgContainer>
                {/* <h1>navbar</h1> */}
            </NavContainer>
        </Nav>
    );
};

export default Navbar;
