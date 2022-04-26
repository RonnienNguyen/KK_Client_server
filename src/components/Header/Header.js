import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { connect } from "react-redux";
import falseAction from "./../../actions/falseLogin";
import axios from "axios";
import link from "./../../helpers/variableContains";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
    };
  }
  async componentDidMount() {
    try {
      const account = localStorage.getItem("account")
        ? JSON.parse(localStorage.getItem("account"))
        : this.props.accountInfo;
      const result = await axios.get(
        `${link.URL_BACKEND}/account/get/${account._id}`
      );
      console.log(this.props.accountInfo);
      this.setState({
        account: result.data.result.accounts,
      });
      const links = document.querySelectorAll(".item__link");
      links.forEach((link, item) => {
        link.onclick = function () {
          links.forEach((e) => {
            e.classList.remove("active_item");
          });
          this.classList.add("active_item");
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  hanldeExit = () => {
    this.props.falseAction();
    window.location.href = "/";
  };
  z;
  render() {
    const { fullname, phone, email, avatar, _id } = this.state.account;
    console.log(this.state.account);
    const arrLink = [
      {
        text: "Home management",
        to: "/",
      },
      {
        text: "Accounts management",
        to: "/accounts/manage",
      },
      {
        text: "Hotels management",
        to: "/hotels/manage",
      },
      {
        text: "Types management",
        to: "/types/manage",
      },
      {
        text: "QRCODE management",
        to: "/QRcodes/manage",
      },
      // {
      //   text: "Recommend manage",
      //   to: "/recommend/manage",
      // },
      // {
      //   text: "RECOMMEND",
      //   to: "/recommend",
      // },
    ];
    const loopLink = arrLink.map((element, index) => {
      try {
        return (
          <Link className="item__link" key={index + 1} to={element.to}>
            {element.text}
          </Link>
        );
      } catch (error) {
        console.log(error);
      }
    });

    return (
      <>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="header">
              <h1 className="logo"></h1>
              <div className="menu">
                <li title="account" className="menu-item account__img">
                  <img style={{ objectFit: "cover" }} src={avatar} />
                </li>
                <li
                  title="click to logout"
                  onClick={this.hanldeExit}
                  className="menu-item"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className=" col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <div className="left">
              <div className="container___sr">
                <div className="account">
                  <div className="avata">
                    <img src={avatar} alt="Image" />
                  </div>
                  <div className="all__info">
                    <div className="account_fiel fullname">
                      <p className="account_fiel-left">NAME</p>
                      <p className="account_fiel-right">{fullname}</p>
                    </div>
                    <div className="account_fiel email">
                      <p className="account_fiel-left">EMAIL</p>
                      <p className="account_fiel-right">{email}</p>
                    </div>
                    <div className="account_fiel phone">
                      <p className="account_fiel-left">PHONE</p>
                      <p className="account_fiel-right">{phone}</p>
                    </div>
                  </div>
                </div>
                {loopLink}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    accountInfo: state.accountInfo,
  };
};
const mapDisptachToProps = (dispatch) => {
  return {
    falseAction: () => {
      dispatch(falseAction());
    },
  };
};
export default connect(mapStateToProps, mapDisptachToProps)(Header);
