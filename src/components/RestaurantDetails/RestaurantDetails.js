import React, { Component } from "react";
import { connect } from "react-redux";
import getAllTypes from "../../actions/getAllType";
import links from "./../../helpers/variableContains";
import axios from "axios";
import getRestaurants from "../../actions/getRestaurant";
import { toast } from "react-toastify";
class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idResOrSpa: "",
      id: "",
      typeName: "",
      type: [],
      description: "",
      name: "",
      benefit: "",
      arrType: [],
      restaurant: [],
      isUpdate: false,
      images: [],
    };
  }
  async componentDidMount() {
    const link = window.location.href;
    const findIndex = link.lastIndexOf("/");
    const findLastIndex = link.indexOf("&");
    const idResOrSpa = link.slice(findIndex + 1, findLastIndex);
    const typeName = link.slice(link.indexOf("=") + 1, link.lastIndexOf("*"));
    console.log(typeName);
    // const result = await axios.get(`${links.URL_BACKEND}/type/getAll/`);
    this.props.getAllTypes();
    this.setState({
      //   type: result.data.result.types,
      idResOrSpa,
      typeName,
    });
    console.log(typeName);
    this.props.getRestaurants(idResOrSpa, typeName);
  }

  renderType = () => {
    const { type } = this.state;
    return type.map((type) => {
      return (
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              value={type.name}
              onChange={this.handleChangeCheckBox}
              checked={this.state.arrType.includes(type.name)}
            />
            {type.name}
          </label>
        </div>
      );
    });
  };
  handleOnChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };
  handleChangeCheckBox = (e) => {
    const { arrType } = this.state;
    if (e.target.checked) {
      arrType.push(e.target.value);
      this.setState({
        arrType,
      });
    } else {
      const findIndex = arrType.findIndex((type) => type === e.target.value);
      arrType.splice(findIndex, 1);
      this.setState({
        arrType,
      });
    }
  };
  createRestaurant = async (e) => {
    e.preventDefault();
    const {
      idResOrSpa,
      name,
      arrType,
      description,
      benefit,
      id,
      typeName,
      images,
    } = this.state;
    if (!this.state.isUpdate) {
      const result = await axios.post(
        `${links.URL_BACKEND}/${typeName}/create`,
        {
          idResOrSpa,
          name,
          arrType,
          description,
          benefit,
          images,
        }
      );
      if (result.data.result) {
        const { statusCode, message } = result.data.result;
        if (statusCode === 200) {
          toast.success(message);
          this.props.getRestaurants(this.state.idResOrSpa, this.state.typeName);
          this.setState({
            name: "",
            description: "",
            benefit: "",
            arrType: [],
            images: [],
          });
          window.location.reload();
        }
      }
    } else {
      const result = await axios.put(
        `${links.URL_BACKEND}/${this.state.typeName}/update`,
        {
          name,
          arrType,
          description,
          benefit,
          id,
          images,
        }
      );
      if (result.data.result) {
        const { statusCode, message } = result.data.result;
        if (statusCode === 200) {
          toast.success(message);
          this.props.getRestaurants(this.state.idResOrSpa, this.state.typeName);
          this.setState({
            name: "",
            description: "",
            benefit: "",
            arrType: [],
            isUpdate: false,
            images: [],
          });
          window.location.reload();
        }
      }
    }
  };
  handleUpdate = (name, description, arrType, benefit, id) => {
    this.setState({
      name,
      description,
      arrType,
      benefit,
      isUpdate: true,
      id,
    });
  };
  handleDelete = async (id) => {
    console.log(id);
    const result = await axios.delete(
      `${links.URL_BACKEND}/${this.state.typeName}/delete/${id}`
    );
    console.log(result);
    if (result.data.result.statusCode === 200) {
      toast.success(result.data.result.message);
      this.props.getRestaurants(this.state.idResOrSpa, this.state.typeName);
      return;
    }

    toast.error(result.data.result.message);
  };
  renderRestaurants = () => {
    const { restaurant } = this.state;
    return restaurant.map((res) => {
      const imgList = res.images.map((img) => {
        console.log(img);
        return (
          <div>
            <img
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
              src={img.image}
            />
          </div>
        );
      });
      return (
        <tr>
          <td>{res.name}</td>
          <td>{`${res.description.slice(0, 40)} . . .`}</td>
          <td>{res.arrType.join("\n")}</td>
          <td>{imgList}</td>
          <td>
            <button
              onClick={() =>
                this.handleUpdate(
                  res.name,
                  res.description,
                  res.arrType,
                  res.benefit,
                  res._id
                )
              }
              type="button"
              class="btn btn-success"
            >
              UPDATE
            </button>
            <button
              onClick={() => this.handleDelete(res._id)}
              type="button"
              class="btn btn-danger"
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });
  };
  componentDidUpdate(prevProps) {
    if (this.props.restaurant !== prevProps.restaurant) {
      this.setState({
        restaurant: this.props.restaurant,
      });
    }
    if (this.props.type !== prevProps.type) {
      this.setState({
        type: this.props.type,
      });
    }
  }
  handleGetUrlImg = async (e) => {
    try {
      const { length } = e.target.files;
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < length; i++) {
        data.append("file", files[i]);
      }
      const result = await axios.post(
        `${links.URL_BACKEND}/partner/create`,
        data
      );
      console.log(result.data.image);
      this.setState({
        images: result.data.image,
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const resultType =
      this.state.typeName === "Spa" ? "Treatment's" : "Dishe's";
    return (
      <div>
        <div class="row">
          <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <legend>Form title</legend>
            <div className="form-group">
              <label htmlFor="numberphone">Images</label>
              <input
                type="file"
                name="img"
                multiple="multiple"
                onChange={this.handleGetUrlImg}
              />
            </div>
            <div class="form-group">
              <label for="">{this.state.typeName} Name</label>
              <input
                type="text"
                class="form-control"
                name="name"
                placeholder={`Enter ${resultType} Name`}
                onChange={this.handleOnChange}
                value={this.state.name}
              />
            </div>

            <div class="form-group">{this.renderType()}</div>
          </div>

          <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <div class="form-group">
              <label for="">{this.state.typeName} Description</label>
              <input
                type="text"
                class="form-control"
                name="description"
                placeholder={`Enter ${resultType} Description`}
                onChange={this.handleOnChange}
                value={this.state.description}
              />
            </div>
            <div class="form-group">
              <label for="">{this.state.typeName} Benefit</label>
              <input
                type="text"
                class="form-control"
                name="benefit"
                placeholder={`Enter ${resultType} Benefit`}
                onChange={this.handleOnChange}
                value={this.state.benefit}
              />
            </div>

            <button
              onClick={this.createRestaurant}
              type="submit"
              class={
                this.state.isUpdate ? "btn btn-success" : "btn btn-primary"
              }
            >
              {this.state.isUpdate ? "UPDATE" : "ADD"}
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>{resultType} Name</th>
                  <th>{resultType} Description</th>
                  <th>Body Type</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.renderRestaurants()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    type: state.getAllType,
    restaurant: state.restaurant,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurants: (id, name) => {
      dispatch(getRestaurants(id, name));
    },
    getAllTypes: () => {
      dispatch(getAllTypes());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetails);
