import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import styled from "styled-components";
import { useHistory, withRouter, Link } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";


const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    margin-left: 10px;
    border-left: 4px solid white;
    cursor: pointer;
    text-decoration: none;
    color: white;
  }
`;


const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const SubMenu = ({ item }) => {
  const [subNav, setSubNav] = useState(false);
  const showSubNav = () => setSubNav(!subNav);
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);

  const URL = "https://bdcustompa-api.herokuapp.com/api/login";
  const history = useHistory();

  // onLogout
  const onLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Auth");
    setUsername("");
    setPassword("");
    history.push("/");
  };

  const handleSubmit = () => {
    const newRequest = { Username: username, Password: password };

    console.log(newRequest);

    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRequest),
    })
      .then((response) => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then((responseData) => {
        // "responseData" is an object
        console.log(responseData.auth);
        if (responseData.auth) {
          window.localStorage.setItem("Token", responseData.token);
          window.localStorage.setItem("Auth", responseData.auth);
          history.push("/");
        } else {
          console.log("incorrect password");
        }
      })
      .catch((error) => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
        // render error messages card
      });
  };

  return (
    <Container>
      {item.map((it) => {
        return (
          <SidebarLink
            to={it.path}
            onClick={it.subNav && showSubNav}
            spy={true}
            smooth={true}
            offset={-180}
          >
            <div>
              {it.icon}
              <SidebarLabel>{it.title}</SidebarLabel>
            </div>
            <div>
              {it.subNav && subNav
                ? it.iconOpened
                : it.subNav
                ? it.iconClosed
                : null}
            </div>
          </SidebarLink>
        );
      })}
      {subNav ? (
        !localStorage.getItem("Auth") ? (
          <Container>
            <TextField id="outlined-basic" label="Username" onChange={(e) => setUsername(e.target.value)} style={{
                margin: "25px 0px 0px 0px",
                borderRadius: "1vh",
              }} variant="outlined"/>
            <TextField id="outlined-basic" type="password" label="Password" style={{
                margin: "25px 0px 0px 0px",
                borderRadius: "1vh",
              }} onChange={(e) => setPassword(e.target.value)} variant="outlined"/>
            <Form style={{ marginLeft: "10px" }}>
            </Form>
            <Button
              variant="outline-light"
              onClick={handleSubmit}
              size="lg"
              style={{
                margin: "25px 20px 0px 10px",
                borderRadius: "1vh",
              }}
            >
              Login
            </Button>
          </Container>
        ) : null
      ) : null}
      {localStorage.getItem("Auth") ? (
        <Button
          variant="outline-light"
          onClick={onLogout}
          size="lg"
          style={{ marginTop: "10px", borderRadius: "1vh" }}
        >
          Logout
        </Button>
      ) : null}
    </Container>
  );
};

export default withRouter(SubMenu);

/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */

/* <Form style={{ marginLeft: "10px" }}>
<input
  type="text"
  id="user"
  placeholder="Username"
  style={{ margin: "15px 0px", width: "90%" }}
  onChange={(e) => setUsername(e.target.value)}
/>
<input
  type="password"
  id="password"
  placeholder="Password"
  style={{ margin: "10x 10px", width: "90%" }}
  onChange={(e) => setPassword(e.target.value)}
/>
</Form> */