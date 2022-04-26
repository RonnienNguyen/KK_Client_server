import React, { Component } from "react";
import "react-phone-input-2/lib/style.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import partners from "./../../actions/getAllPartners";
import "tippy.js/dist/tippy.css"; // optional for styling
import Loading from "../LoadingButton/Loading";
import link from "./../../helpers/variableContains";
class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      name: "",
      description: "",
      phone: "",
      id: "",
      email: "",
      activePage: 1,
      addType: "",
      arrType: [],
      type: "Spa",
      images: [],
      statusUpLoad: false,
      count: 1,
      partners: [],
      numbermanage: 0,
      emailParam: "",
      arrayTotalTypeManage: [],
      linkB: "",
      gmail: "",
      moveObj: {},
      gmailHotel: "",
    };
  }
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
  clearState = () => {
    try {
      this.setState({
        name: "",
        location: "",
        id: "",
        images: [],
        description: "",
        linkB: "",
        isEdit: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidUpdate(prevProps, prevState) {
    try {
      if (this.props.partners !== prevState.partners) {
        setTimeout(() => {
          this.setState({
            partners: prevProps.partners,
          });
        }, 100);
      }
      if (this.props.moveObj !== this.state.moveObj) {
        this.setState({
          moveObj: this.props.moveObj,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handlePageChange = (pageNumber) => {
    try {
      const { email, name } = this.props.moveObj;
      this.props.getAllPartner(pageNumber, this.state.type, this.state.email);
      this.setState({
        activePage: pageNumber,
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
  componentDidMount() {
    try {
      const links = window.location.href;
      const findIndex = links.lastIndexOf("/");
      const findLastIndex = links.indexOf("?");
      const email = links.slice(findIndex + 1, findLastIndex);
      const findHotel = links.slice(links.indexOf("=") + 1);
      const nameHotel = findHotel.replace(/%20/g, " ");
      this.setState({
        email: email,
        nameHotel,
      });
      // console.log(this.state.moveObj);
      // const { email, name } = this.props.moveObj;
      this.props.getAllPartner(1, this.state.type, email);
      // const result = await axios.get(`${link.URL_BACKEND}/type/getAll`);
      // console.log(result);
      // const { statusCode } = result.data.result;
      // if (statusCode === 200) {
      //   this.setState({
      //     arrType: result.data.result.types,
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  }
  handleOnEditAccount = ({
    id,
    name,
    description,
    linkB,
    type,
    phone,
    img,
  }) => {
    try {
      this.setState({
        id,
        name,
        type,
        description,
        linkB,
        phone,
        isEdit: true,
        statusUpLoad: true,
        images: img,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleOnDeleteImg = (idParner) => {};
  handleDestroyPartner = async (id, name) => {
    try {
      if (window.confirm(`Delete ${this.state.type} ${name}?`)) {
        this.clearState();
        const result = await axios.delete(
          `${link.URL_BACKEND}/partner/delete/${id}`
        );
        const { statusCode, message } = result.data.result;

        const { email, name } = this.props.moveObj;
        if (statusCode === 200) {
          toast.success(message);
          this.props.getAllPartner(
            this.state.activePage,
            this.state.type,
            this.state.email
          );
          return;
        }
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderPartner = () => {
    try {
      const { partners, type } = this.state;
      if (this.props.partners !== this.state.partners) {
        return <Loading />;
      }
      const links = window.location.href;
      const findIndex = links.lastIndexOf("/");
      const email = links.slice(findIndex + 1);
      return partners.map((partner, index) => {
        const partnersInfo = {
          name: partner.name,
          type: partner.type,
          description: partner.description,
          linkB: partner.linkB,
          id: partner._id,
          img: partner.images,
        };
        // const arrImages = partner.images.map((img, index) => {
        //   return (
        //     <p key={index} className={`img${img._id}`}>
        //       <img className="avatar__image" src={img.name} />
        //     </p>
        //   );
        // });
        console.log(partner);
        return (
          <tr key={index}>
            <td>
              {partner.type === "Spa" || partner.type === "Restaurant" ? (
                <Link
                  to={
                    partner.type === "Spa"
                      ? `/manage/restaurant/details/${partner._id}&name=${this.state.type}*`
                      : `/manage/restaurant/details/${partner._id}&name=${this.state.type}*`
                  }
                >
                  {partner.name}
                </Link>
              ) : (
                partner.name
              )}
            </td>
            <td>{partner.description}</td>
            <td>{partner.linkB}</td>
            <td style={{ display: "flex" }}>
              <button
                style={{ marginRight: "5px" }}
                onClick={() => this.handleOnEditAccount(partnersInfo)}
                type="button"
                className="btn btn-success"
              >
                EDIT
              </button>
              <button
                onClick={() =>
                  this.handleDestroyPartner(partner._id, partner.name)
                }
                type="button"
                className="btn btn-danger"
              >
                DELETE
              </button>
            </td>
          </tr>
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleOnClick = async (e) => {
    try {
      e.preventDefault();
      const {
        name,
        location,
        phone,
        isEdit,
        activePage,
        id,
        type,
        linkB,
        images,
        numbermanage,
        arrayTotalTypeManage,
        description,
        email,
      } = this.state;
      if (!isEdit) {
        for (let i = 0; i < numbermanage; ++i) {
          const obj = {
            name: this.state["name" + (i + 1)],
            list: this.state["typeArr" + (i + 1)],
          };
          arrayTotalTypeManage.push(obj);
        }
        console.log(type);
        const result = await axios.post(`${link.URL_BACKEND}/partner/create`, {
          name,
          type,
          description,
          linkB,
          images,
          email,
          arrayTotalTypeManage,
        });

        if (result.data.result.error) {
          return toast.error(result.data.result.error.details[0].message);
        }
        const { statusCode, message } = result.data.result;

        if (statusCode === 200) {
          const { email, name } = this.props.moveObj;
          toast.success(message);
          this.props.getAllPartner(activePage, type, this.state.email);
          this.clearState();
          return;
        }
        toast.error(message);
      } else {
        const result = await axios.put(`${link.URL_BACKEND}/partner/update`, {
          name,
          type,
          location,
          phone,
          id,
          images,
          description,
          linkB,
        });
        const { statusCode, message } = result.data.result;
        if (statusCode === 200) {
          const { email, name } = this.props.moveObj;
          toast.success(message);
          this.props.getAllPartner(activePage, type, this.state.email);
          this.clearState();
          return;
        }
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleAddType = (e) => {
    this.setState({
      addType: e.target.value,
    });
  };
  handleGetValueCheck = (e) => {
    try {
      const { type, isEdit } = this.state;
      const target = e.target;
      const value = target.value;

      if (this.state.isEdit) {
        if (target.checked && type.indexOf(value) === -1) {
          type.push(value);
          if (target.checked) {
            target.checked = false;
          } else {
            target.checked = true;
          }
        } else if (!target.checked) {
          const findIndex = type.indexOf(value);
          type.splice(findIndex, 1);
        }
        this.setState({
          type,
        });

        return;
      } else {
        if (target.checked && type.indexOf(value) === -1) {
          type.push(value);
        } else if (!target.checked) {
          const findIndex = type.indexOf(value);
          type.splice(findIndex, 1);
        }
        this.setState({
          type,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  renderType = () => {
    var { arrType } = this.state;
    arrType = arrType ? arrType : [];
    return arrType.map((type, index) => {
      return (
        <div style={{ marginLeft: "20px" }} class="checkbox" key={index}>
          <input
            style={{ accentColor: "red" }}
            onChange={this.handleGetValueCheck}
            name={type.name}
            type="checkbox"
            value={type.name}
            checked={this.state.type.includes(type.name)}
          />
          {type.name}
        </div>
      );
    });
  };
  handleGetUrlImg = async (e) => {
    try {
      const { length } = e.target.files;
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < length; i++) {
        data.append("file", files[i]);
      }
      const result = await axios.post(
        `${link.URL_BACKEND}/partner/create`,
        data
      );
      this.setState({
        images: result.data.image,
      });
    } catch (error) {
      console.log(error);
    }
  };
  addTypeName = () => {
    const col__children = document.querySelector(".col__children__partner");
    let div = document.createElement("div");
  };
  handleGetKey = (e) => {
    this.setState({
      type: e.target.value,
    });

    const { email, name } = this.props.moveObj;
    this.props.getAllPartner(1, e.target.value, this.state.email);
  };
  render() {
    const { isEdit, name, description, phone, email, linkB } = this.state;
    return (
      <>
        <div class="row">
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <select
              onChange={this.handleGetKey}
              name=""
              id="input"
              class="form-control"
              required="required"
            >
              <option value="Spa">Spa</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Gym">Gym</option>
              <option value="Self Care">Self Care</option>
            </select>
          </div>
        </div>

        <div className="row ">
          {" "}
          <div className="form-container col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <form>
              <legend>
                {this.state.type + " "}Management - {this.state.nameHotel}
              </legend>
              <div className="row">
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                  <div className="form-group">
                    <label htmlFor="numberphone">Images</label>
                    <input
                      type="file"
                      name="img"
                      multiple="multiple"
                      onChange={this.handleGetUrlImg}
                    />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      name="name"
                      onChange={this.handleOnChange}
                      value={name}
                    />
                  </div>
                </div>
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                  <div className="form-group">
                    <label>description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter description"
                      name="description"
                      onChange={this.handleOnChange}
                      value={description}
                    />
                  </div>
                  <div className="form-group">
                    <label>Link booking</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter description"
                      name="linkB"
                      onChange={this.handleOnChange}
                      value={linkB}
                    />
                  </div>

                  {/* <div className="form-group">
                    <label htmlFor="numberphone">Type</label>

                    {this.renderType()}
                  </div> */}
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
          <div className="type-table reset-padding-table col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Link Booking</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.renderPartner()}</tbody>
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
        <Link
          style={{ position: "fixed", bottom: "10px", left: "400px" }}
          className="backtohotel"
          to="/hotels/manage"
        >
          {"<<<<< BACK TO HOTELS"}
        </Link>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    partners: state.getAllPartners,
    moveObj: state.moveObj,
  };
};
const mapDispatchToProps = (dispatch) => {
  try {
    return {
      getAllPartner: (id, type, email) => {
        console.log(id, type, email);
        dispatch(partners(id, type, email));
      },
    };
  } catch (error) {
    console.log(error);
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Partners);
