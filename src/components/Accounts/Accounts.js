import React, { Component } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { connect } from "react-redux";
import getAllAccounts from "../../actions/getAllAccounts";
import "./account.css";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "./../../firebase/index";
import tippy from "tippy.js";
import Loading from "./../../components/LoadingButton/Loading";
import QR from "qrcode";
import link from "./../../helpers/variableContains";
class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      re_password: "",
      isEdit: false,
      id: "",
      activePage: 1,
      role: "customer",
      avatar:
        // Include your Link Avatar Here
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      accounts: [],
      token: "",
      qr: "",
    };
  }
  clearState = () => {
    this.setState({
      fullname: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      re_password: "",
      isEdit: false,
    });
  };
  handleOnChange = (e) => {
    try {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      this.setState({
        [name]: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleOnGetPhoneNumber = (e) => {
    try {
      this.setState({
        phone: e,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleOnClick = async (e) => {
    try {
      e.preventDefault();
      const {
        fullname,
        email,
        phone,
        username,
        password,
        re_password,
        id,
        role,
        avatar,
      } = this.state;
      if (!this.state.isEdit) {
        const result = await axios.post(`${link.URL_BACKEND}/account/create`, {
          fullname,
          email,
          phone,
          username,
          password,
          re_password,
          role,
          avatar,
        });
        if (!result.data.statusCode) {
          const { statusCode, message } = result.data.result;
          if (statusCode === 200) {
            toast.success(message);
            this.clearState();
            this.props.getAllAccounts(this.state.activePage);
            return;
          }
          toast.error(message);
          return;
        }
        toast.error(result.data.message);
      } else {
        console.log(avatar);
        const result = await axios.put(`${link.URL_BACKEND}/account/update`, {
          fullname,
          email,
          phone,
          username,
          id,
          role,
          password,
          re_password,
          avatar,
        });
        if (result.data.result.error) {
          toast.error(result.data.result.error.details[0].message);
          return;
        }
        const { message, statusCode } = result.data.result;
        if (statusCode === 200) {
          toast.success(message);
          this.clearState();
          this.props.getAllAccounts(this.state.activePage);

          return;
        }
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.props.getAllAccounts(1);
  }
  handleOnEditAccount = ({
    fullname,
    email,
    phone,
    username,
    id,
    role,
    avatar,
  }) => {
    try {
      this.setState({
        isEdit: true,
        fullname,
        email,
        phone,
        username,
        id,
        role,
        avatar,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleDestroyAccount = async (id) => {
    try {
      if (window.confirm(`Do you want to be sure to delete?`)) {
        const result = await axios.delete(
          `${link.URL_BACKEND}/account/delete/${id}`
        );
        if (result.data.result.statusCode === 200) {
          toast.success(result.data.result.message);
          this.props.getAllAccounts();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  renderAccounts = () => {
    try {
      const { accounts } = this.state;
      if (this.props.accounts !== this.state.accounts) {
        return <Loading />;
      }
      const xxx = accounts.map((account, index) => {
        const infoAccount = {
          fullname: account.fullname,
          email: account.email,
          phone: account.phone,
          username: account.username,
          role: account.role,
          id: account._id,
          avatar: account.avatar,
        };
        return (
          <tr key={index}>
            <td>{account.fullname}</td>
            <td>{account.email}</td>
            <td>{account.phone}</td>
            <td>
              <p className={`img${account._id}`}>
                <img className="avatar__image" src={account.avatar} />
              </p>
            </td>
            <td>{account.role}</td>
            <td style={{ display: "flex" }}>
              <button
                style={{ marginRight: "5px" }}
                onClick={() => this.handleOnEditAccount(infoAccount)}
                type="button"
                className="btn btn-success"
              >
                EDIT
              </button>
              <button
                onClick={() => this.handleDestroyAccount(account._id)}
                type="button"
                className="btn btn-danger"
              >
                DELETE
              </button>
            </td>
          </tr>
        );
      });
      return xxx;
    } catch (error) {
      console.log(`system err, plz logout !`);
    }
  };
  handleGetUrlImg = async (e) => {
    try {
      var file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      const result = await axios.post(
        `${link.URL_BACKEND}/account/create`,
        data
      );
      this.setState({
        avatar: result.data.avatar,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handlePageChange = (pageNumber) => {
    try {
      this.setState({
        activePage: pageNumber,
      });
      this.props.getAllAccounts(pageNumber);
    } catch (error) {
      console.log(error);
    }
  };
  componentDidUpdate(prev, state) {
    try {
      if (this.props.accounts !== state.accounts) {
        setTimeout(() => {
          this.setState({
            accounts: this.props.accounts,
          });
        }, 100);
      }
      if (this.props.token !== state.token) {
        this.setState({
          token: this.props.token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { isEdit, role, qr } = this.state;

    return (
      <div className="row manage__accounts">
        <div>
          <form>
            <legend>Manage Accounts</legend>
            <div class="row">
              <div class="col-xs-5 col-sm-12 col-md-7 col-lg-5">
                <div className="form-group">
                  <label htmlFor="numberphone">Avatar</label>
                  <input
                    type="file"
                    name="img"
                    onChange={this.handleGetUrlImg}
                  />
                </div>
                <div className="form-group">
                  <label>FullName</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter FullName"
                    name="fullname"
                    onChange={this.handleOnChange}
                    value={this.state.fullname}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    onChange={this.handleOnChange}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numberphone">Number Phone</label>
                  <PhoneInput
                    country={"vn"}
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                    onChange={this.handleOnGetPhoneNumber}
                    value={this.state.phone}
                  />
                </div>
              </div>

              <div class="col-xs-5 col-sm-12 col-md-7 col-lg-5">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Enter Username"
                    onChange={this.handleOnChange}
                    value={this.state.username}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>

                  <select
                    name="role"
                    id="input"
                    class="form-control"
                    required="required"
                    value={role}
                    onChange={this.handleOnChange}
                  >
                    <option value="customer">CUSTOMER</option>
                    <option value="admin">ADMIN</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                    onChange={this.handleOnChange}
                    value={this.state.password}
                  />
                </div>
                <div className="form-group">
                  <label>Repeat Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="re_password"
                    placeholder="Enter repeat password"
                    onChange={this.handleOnChange}
                    value={this.state.re_password}
                  />
                </div>
                <button
                  onClick={this.handleOnClick}
                  type="submit"
                  className={isEdit ? "btn btn-success" : "btn btn-primary"}
                >
                  {isEdit ? "UPDATE" : "CREATE"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className=" type-table reset-padding-table col-xs-10 col-sm-12 col-md-10 col-lg-10">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>FULLNAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>AVATAR</th>
                <th>ROLE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>{this.renderAccounts()}</tbody>
          </table>
          <Pagination
            className="pagination"
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={8}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    accounts: state.getAllAccounts,
    token: state.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllAccounts: (id) => {
      dispatch(getAllAccounts(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
