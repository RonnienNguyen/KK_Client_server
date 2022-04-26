import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import loginAction from "./../../actions/login";
import accountInfo from "./../../actions/accountInfo";
import logo from "./logo.png";
import "./login.css";
import getToken from "./../../actions/getToken";
import link from "./../../helpers/variableContains";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleOnChange = (e) => {
    try {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      console.log({ [name]: value });
      this.setState({
        [name]: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleOnLogin = async (e) => {
    try {
      console.log(`${link.URL_BACKEND}/login`);
      e.preventDefault();
      const { email, password } = this.state;
      const result = await axios.post(`${link.URL_BACKEND}/login`, {
        email,
        password,
      });

      if (result.data.result) {
        const { statusCode, message, account, token } = result.data.result;
        if (statusCode === 200) {
          toast.success(message);
          this.props.activeLogin();
          this.props.accountInfo(account);
          localStorage.setItem("account", JSON.stringify(account));
          this.props.getToken(token);
          return;
        }
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    try {
      const logo = document.querySelector(".my__logo");
      const form__login = document.querySelector(".form__login");
      const gradien = document.querySelector(".gradient-custom-2");
      const text__product = document.querySelector(".text-product");
      setTimeout(() => {
        logo.classList.add("my__logo--run");
      }, 1000);
      setTimeout(() => {
        form__login.classList.add("form__login--run");
      }, 600);
      setTimeout(() => {
        gradien.classList.add("gradient-custom-2--run");
        text__product.classList.add("text-product--run");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="row form__login">
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 form__login--form">
          <div className="form1"></div>
          <div className="form2"></div>
          <div className="form3"></div>
          <div className="form4"></div>
          <div className="header__login">
            <div className="my__logo">
              <img src={logo} alt="Your Image" />
            </div>
          </div>
          <form>
            <legend style={{ textAlign: "center" }}>Form Login</legend>
            <div className="form-group">
              <p>Please login to your account</p>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                name="password"
                onChange={this.handleOnChange}
              />
            </div>
            <button
              onClick={this.handleOnLogin}
              style={{ float: "right" }}
              type="submit"
              className="form-control submit-btn"
            >
              LOGIN
            </button>
          </form>
        </div>
        <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
          <div className="text-white px-3 py-4 p-md-5 mx-md-4 text-product">
            <h4 className="mb-4">We are more than just a company</h4>
            <p className="small mb-0">
              In addition, in order to introduce yourself or introduce famous
              work, besides good content, you must also play the right sound.
              Just saving sample sentences for review is not enough, you should
              watch all the example videos and learn the correct pronunciation
              based on that. When looking up a word or saving a word, eJOY
              eXtension always shows how to read it and more specifically, it
              also supports the “Say it” feature, which helps to find all videos
              containing that word or phrase. There will be a great "mountain"
              video for you to learn: learn how to speak, tone, learn how to use
              structure too!
            </p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    accountInfo: state.accountInfo,
  };
};
const mapDispachToProps = (dispatch) => {
  return {
    activeLogin: () => {
      dispatch(loginAction());
    },
    accountInfo: (info) => {
      dispatch(accountInfo(info));
    },
    getToken: (token) => {
      dispatch(getToken(token));
    },
  };
};
export default connect(mapStateToProps, mapDispachToProps)(Login);
