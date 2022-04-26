import React, { Component } from "react";
import "react-phone-input-2/lib/style.css";
import { connect } from "react-redux";
import axios from "axios";
import getAllType from "../../actions/getAllType";
import Loading from "../LoadingButton/Loading";
import { toast } from "react-toastify";
import link from "./../../helpers/variableContains";
import "./type.css";
class Types extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      name: "",
      id: "",
      types: [],
    };
  }
  handleDestroyType = async (id) => {
    try {
      if (window.confirm("are you sure delete type ?")) {
        const result = await axios.delete(
          `${link.URL_BACKEND}/type/delete/${id}`
        );
        const { statusCode, message } = result.data.result;
        if (statusCode === 200) {
          this.props.getAllType();
          toast.success(message);
          return;
        }
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = () => {
    try {
      this.props.getAllType();
    } catch (error) {
      console.log(error);
    }
  };
  componentDidUpdate(props, state) {
    try {
      if (this.props.types !== state.types) {
        setTimeout(() => {
          this.setState({
            types: this.props.types,
          });
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleOnEditType = ({ name, id }) => {
    try {
      this.setState({
        name,
        id,
        isEdit: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleOnChange = (e) => {
    try {
      this.setState({
        name: e.target.value.trim(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleOnClick = async (e) => {
    try {
      e.preventDefault();
      const { name, isEdit, id } = this.state;
      if (!isEdit) {
        const result = await axios.post(`${link.URL_BACKEND}/type/create`, {
          name,
        });
        const { statusCode, message } = result.data.result;
        if (statusCode === 200) {
          this.props.getAllType();
          toast.success(message);
          this.setState({
            name: "",
          });
          return;
        }
        toast.error(message);
      } else {
        const result = await axios.put(`${link.URL_BACKEND}/type/update`, {
          name,
          id,
        });
        const { statusCode, message } = result.data.result;
        if (statusCode === 200) {
          this.props.getAllType();
          toast.success(message);
          this.setState({
            name: "",
          });
          return;
        }
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  renderType = () => {
    const { types } = this.state;
    if (this.props.types !== types) {
      return <Loading />;
    }
    if (types) {
      return types.map((type, index) => {
        return (
          <tr>
            <td>{type.name}</td>
            <td>
              <button
                style={{ marginRight: "5px" }}
                onClick={() =>
                  this.handleOnEditType({ id: type._id, name: type.name })
                }
                type="button"
                className="btn btn-success"
              >
                EDIT
              </button>
              <button
                onClick={() => this.handleDestroyType(type._id)}
                type="button"
                className="btn btn-danger"
              >
                DELETE
              </button>
            </td>
          </tr>
        );
      });
    }
  };
  render() {
    const { isEdit, name, id } = this.state;
    return (
      <>
        <div className="row">
          <div className="form-container col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <form>
              <div class="row">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                  <legend>Manage Types</legend>
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
                  <button
                    onClick={this.handleOnClick}
                    type="submit"
                    className={isEdit ? "btn btn-success" : "btn btn-primary"}
                  >
                    {isEdit ? "UPDATE" : "CREATE"}
                  </button>
                </div>
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5"></div>
              </div>
            </form>
          </div>

          <div className="type-table reset-padding-table col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.renderType()}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    types: state.getAllType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllType: () => {
      dispatch(getAllType());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Types);
