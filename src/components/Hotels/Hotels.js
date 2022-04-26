import React, { Component } from "react";
import "react-phone-input-2/lib/style.css";
import { connect } from "react-redux";
import getAllHotels from "../../actions/getAllHotels";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import Loading from "../LoadingButton/Loading";
import link from "./../../helpers/variableContains";
import { Link } from "react-router-dom";
import QR from "qrcode";
import moveObj from "../../actions/moveObj";
import "./hotel.css";
class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      name: "",
      location: "",
      phone: "",
      email: "",
      id: "",
      activePage: 1,
      hotels: [],
      images: [],
    };
  }
  componentDidMount() {
    try {
      this.props.getAllHotels(this.state.activePage);
      this.setState({
        hotels: this.props.hotels,
      });
    } catch (error) {
      console.log(error);
    }
  }
  handleOnEditAccount = ({ name, location, phone, id }) => {
    try {
      this.setState({
        name,
        location,
        phone,
        isEdit: true,
        id,
        images: [],
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleDestroyAccount = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        const reuslt = await axios.delete(
          `${link.URL_BACKEND}/hotel/delete/${id}`
        );
        const { message, statusCode } = reuslt.data.result;
        if (statusCode === 200) {
          toast.success(message);
          this.props.getAllHotels(this.state.activePage);
          return;
        }
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidUpdate(props, state) {
    try {
      if (this.props.hotels !== state.hotels) {
        this.setState({
          hotels: this.props.hotels,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleMoveObj = (email, name) => {
    this.props.moveObj({ email, name });
  };
  handleDeleteImg = async (id) => {
    const result = await axios.delete(`${link.URL_BACKEND}/img/delete/${id}`);
    if (result.data.result.statusCode === 200) {
      toast.success(result.data.result.message);
      this.props.getAllHotels(this.state.activePage);
      this.clearState();
      return;
    }
    toast.error(result.data.result.message);
  };
  renderHotels = () => {
    try {
      const { hotels } = this.state;
      if (this.props.hotels !== hotels) {
        return <Loading />;
      }
      return hotels.map((hotel, index) => {
        const arrImages = hotel.images.map((img, index) => {
          console.log(img);
          return (
            <p className={`imgOfHotel img${img._id}`}>
              <img className="avatar__image" src={img.image} />
              <span
                onClick={() => this.handleDeleteImg(img._id)}
                style={{ cursor: "pointer" }}
                class="labelOfHotel label label-danger"
              >
                Delete
              </span>
            </p>
          );
        });
        const hotelInfo = {
          name: hotel.name,
          location: hotel.location,
          phone: hotel.phone,
          id: hotel._id,
        };
        return (
          <tr key={index}>
            <td>
              <Link
                onClick={() => this.handleMoveObj(hotel.email, hotel.name)}
                to={`/partners/manage/${hotel.email}?name=${hotel.name}`}
              >
                {hotel.name}
              </Link>
            </td>
            <td>{hotel.location}</td>
            <td>{arrImages}</td>
            <td>
              <button
                style={{ marginRight: "5px" }}
                onClick={() => this.handleOnEditAccount(hotelInfo)}
                type="button"
                className="btn btn-success"
              >
                EDIT
              </button>
              <button
                onClick={() => this.handleDestroyAccount(hotel._id)}
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
  handlePageChange = (pageNumber) => {
    try {
      this.setState({
        activePage: pageNumber,
      });
      this.props.getAllHotels(pageNumber);
    } catch (error) {
      console.log(error);
    }
  };
  clearState = () => {
    this.setState({
      name: "",
      location: "",
      phone: "",
      id: "",
      email: "",
    });
  };
  handleOnClick = async (e) => {
    try {
      console.log(process.env.URL_SERVER);
      e.preventDefault();
      const { name, phone, location, id, isEdit, email, qr, images } =
        this.state;
      if (!isEdit) {
        const endEmail = email.lastIndexOf("@");
        const qr = await QR.toDataURL(
          `${link.URL_BACKEND}/${email.slice(0, endEmail)}`
        );
        const result = await axios.post(`${link.URL_BACKEND}/hotel/create`, {
          name,
          phone,
          location,
          email,
          qr,
          images,
        });
        console.log(result);
        if (result.data.result.error) {
          toast.error(result.data.result.error.details[0].message);
        }
        if (result.data.result.statusCode === 200) {
          toast.success(result.data.result.message);
          this.props.getAllHotels(this.state.activePage);
          this.clearState();
          return;
        }
        toast.error(result.data.result.message);
      } else {
        const result = await axios.put(`${link.URL_BACKEND}/hotel/update`, {
          name,
          phone,
          location,
          id,
          email,
          images,
        });
        console.log(result.data);
        if (result.data.result.statusCode === 200) {
          this.setState({
            isEdit: false,
          });
          toast.success(result.data.result.message);
          this.props.getAllHotels(this.state.activePage);
          this.clearState();
          return;
        }

        toast.error(result.data.result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleGetUrlImg = async (e) => {
    try {
      const { length } = e.target.files;
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < length; i++) {
        data.append("file", files[i]);
      }
      const result = await axios.post(`${link.URL_BACKEND}/hotel/create`, data);
      console.log(result);
      this.setState({
        images: result.data.image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isEdit, name, phone, location, email } = this.state;
    return (
      <>
        <div className="row ">
          <div className="form-container col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <legend>Manage Hotels</legend>

            <div class="row">
              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
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

              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                {" "}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    onChange={this.handleOnChange}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label>location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                    name="location"
                    onChange={this.handleOnChange}
                    value={location}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="numberphone">Number Phone</label>
                  <PhoneInput
                    country={"vn"}
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                    onChange={this.handleOnGetPhoneNumber}
                    value={phone}
                  />
                </div> */}
                <button
                  data-toggle="modal"
                  href="#modal-id"
                  type="submit"
                  className={isEdit ? "btn btn-success" : "btn btn-primary"}
                >
                  {isEdit ? "UPDATE" : "CREATE"}
                </button>
                <div class="modal fade" id="modal-id">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-hidden="true"
                        >
                          &times;
                        </button>
                        <h4 class="modal-title">Modal title</h4>
                      </div>
                      <div class="modal-body">
                        Do you want to {this.state.isEdit ? "update" : "create"}{" "}
                        new hotel with the these information <br></br>
                        {"> Hotel's name - "}
                        {this.state.name ? this.state.name : "Empty"}
                        <br></br>
                        {"> Hotel's Address - "}
                        {this.state.location ? this.state.location : "Empty"}
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-default"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={this.handleOnClick}
                          type="button"
                          class="btn btn-primary"
                          data-dismiss="modal"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="type-table reset-padding-table col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.renderHotels()}</tbody>
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
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    hotels: state.getAllHotels,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllHotels: (id) => {
      dispatch(getAllHotels(id));
    },
    moveObj: (obj) => {
      dispatch(moveObj(obj));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Hotels);
