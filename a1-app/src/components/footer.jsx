import React, { Component } from "react";
import * as AiIcons from "react-icons/ai";
import "../styles/footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="footer">
        <div className="icon-list">
          <a href="https://www.instagram.com/bd_custom_pa/">
            <AiIcons.AiFillYoutube className="icon" />
          </a>
          <a href="https://www.instagram.com/bd_custom_pa/">
            <AiIcons.AiFillFacebook className="icon" />
          </a>
          <a href="https://www.instagram.com/bd_custom_pa/">
            <AiIcons.AiFillInstagram className="icon" />
          </a>
          <a href="https://www.instagram.com/bd_custom_pa/">
            <AiIcons.AiFillTwitterCircle className="icon" />
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
