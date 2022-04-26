import React, { Component } from "react";
import axios from "axios";
import link from "./../../helpers/variableContains";
import { connect } from "react-redux";
import getAllRecommend from "../../actions/getAllRecommend";
import tippy from "tippy.js";
import { toast } from "react-toastify";
class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      arrayTotalTypeManage: [],
      recommend: [],
      name: "",
      price: "",
      description: "",
      reason: "",
      ingredient: "",
      id: "",
      idC: "",
      idR: "",
      images: [],
    };
  }
  handleOnChangeTypeManage = (e, number) => {
    try {
      let target = e.target;
      let name = target["name"];
      let value = target.value;
      console.log(name);
      this.setState({
        [name]: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
  clearStateTypeManage = (number) => {
    try {
      this.setState({
        ["typename" + number]: "",
        ["price" + number]: "",
        ["description" + number]: "",
        ["reason" + number]: "",
        ["ingredient" + number]: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleAddTypeManage = (types, number) => {
    try {
      let xxx = this.state[types + number] || [];
      console.log([types + number]);
      if (
        !this.state["typename" + number] ||
        !this.state["price" + number] ||
        !this.state["description" + number] ||
        !this.state["reason" + number] ||
        !this.state["ingredient" + number]
      ) {
        alert(
          "typename, price, description, reason, ingredient cannot empty !"
        );
        return;
      }
      const obj = {
        ["typename" + number]: this.state["typename" + number],
        ["price" + number]: this.state["price" + number],
        ["description" + number]: this.state["description" + number],
        ["reason" + number]: this.state["reason" + number],
        ["ingredient" + number]: this.state["ingredient" + number],
        ["images" + number]: this.state["images" + number],
      };
      xxx.push(obj);
      console.log(obj);
      this.setState(
        {
          [types + number]: xxx,
        },
        () => {
          this.clearStateTypeManage(number);
          console.log(this.state);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  renderTypeManage = () => {
    try {
      const arr = [];
      for (let i = 0; i < this.state.numbermanage; i++) {
        let div = (
          <div key={i} className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div className="form-group">
              <label for="">Name Manage</label>
              <input
                type="text"
                className="form-control"
                name={"name" + (i + 1)}
                placeholder="Enter name manage"
                onChange={(e) => {
                  this.handleOnChangeTypeManage(e, i + 1);
                }}
              />
            </div>
            <div className="form-group">
              <label for="">Email Manage</label>
              <input
                type="text"
                className="form-control"
                name={"email" + (i + 1)}
                placeholder="Enter email manage"
                onChange={(e) => {
                  this.handleOnChangeTypeManage(e, i + 1);
                }}
              />
            </div>
            <div className="form-group">
              <label for="">Description</label>
              <input
                type="text"
                className="form-control"
                name={"description" + (i + 1)}
                placeholder="Enter description"
                onChange={(e) => {
                  this.handleOnChangeTypeManage(e, i + 1);
                }}
                value={this.state["description" + (i + 1)]}
              />
            </div>
            <div className="form-group">
              <label for="">Ingredient</label>
              <input
                type="text"
                className="form-control"
                name={"ingredient" + (i + 1)}
                placeholder="Enter name ingredient"
                onChange={(e) => {
                  this.handleOnChangeTypeManage(e, i + 1);
                }}
                value={this.state["ingredient" + (i + 1)]}
                // value={this.state.ingredient + (i + 1) || null}
              />
            </div>
            <div classNameName={"typeclassName" + (i + 1)}>
              <div className="form-group">
                <label for=""> Type Name</label>
                <input
                  type="text"
                  className="form-control"
                  name={"typename" + (i + 1)}
                  placeholder="Enter type name"
                  onChange={(e) => {
                    this.handleOnChangeTypeManage(e, i + 1);
                  }}
                  value={this.state["typename" + (i + 1)]}
                />
              </div>
              <div className="form-group">
                <label for=""> Price</label>
                <input
                  type="text"
                  className="form-control"
                  name={"price" + (i + 1)}
                  placeholder="Enter price"
                  onChange={(e) => {
                    this.handleOnChangeTypeManage(e, i + 1);
                  }}
                  value={this.state["price" + (i + 1)]}
                />
              </div>
              <div className="form-group">
                <label for=""> Images</label>
                <input
                  onChange={(e) => this.handleGetUrlImg(e, i + 1)}
                  type="file"
                  className="form-control"
                  id=""
                  multiple
                />
              </div>
              <div className="form-group">
                <label for="">Reason</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter reason"
                  name={"reason" + (i + 1)}
                  onChange={(e) => {
                    this.handleOnChangeTypeManage(e, i + 1);
                  }}
                  value={this.state["reason" + (i + 1)]}
                />
              </div>{" "}
              <button
                onClick={() => this.handleAddTypeManage("typeArr", i + 1)}
                type="button"
                className="btn btn-danger"
              >
                ADD
              </button>
            </div>
          </div>
        );
        arr.push(div);
      }
      return arr;
    } catch (error) {
      console.log(error);
    }
  };
  handleRenderManage = (e) => {
    try {
      if (isNaN(e.target.value) === true) {
        alert("value must number ");
        this.setState({
          numbermanage: "",
        });
        return;
      } else {
        this.setState({
          numbermanage: e.target.value,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleGetMail = (e) => {
    try {
      this.setState({
        email: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async () => {
    try {
      const {
        name,
        email,
        location,
        phone,
        isEdit,
        activePage,
        id,
        type,
        images,
        numbermanage,
        arrayTotalTypeManage,
      } = this.state;

      for (let i = 0; i < numbermanage; ++i) {
        const obj = {
          name: this.state["name" + (i + 1)],
          email: this.state["email" + (i + 1)],
          list: this.state["typeArr" + (i + 1)],
        };
        arrayTotalTypeManage.push(obj);
      }

      const result = await axios.post(
        `${link.URL_BACKEND}/recommend/create`,
        arrayTotalTypeManage
      );
      this.setState({
        arrayTotalTypeManage: [],
      });
      if (result.data.statusCode === 200) {
        toast.success(result.data.message);
        this.props.getAllRecommend();

        return;
      } else if (result.data.statusCode === 403) {
        toast.error(result.data.message);
        return;
      }
      toast.error(result.data.error.details[0].message);
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.props.getAllRecommend();
  }
  componentDidUpdate(prevState, state) {
    try {
      if (this.props.recommend !== state.recommend) {
        this.setState({
          recommend: this.props.recommend,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleShowDetail = (
    id,
    idC,
    { name, price, description, ingredient, reason }
  ) => {
    console.log(id, idC);
    this.setState({
      name,
      price,
      description,
      ingredient,
      reason,
      id,
      idC,
    });
  };
  handleUpdateEmailandNamer = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };
  handleOnClickUpdateRe = ({ nameR, email, idR }) => {
    this.setState({
      nameR,
      email,
      idR,
    });
  };
  hanldeUpdateReal = async () => {
    const { nameR, idR, email } = this.state;
    const obj = { nameR, idR, email };
    const result = await axios.put(`${link.URL_BACKEND}/recommend/update`, obj);
    if (result.data.statusCode === 200) {
      toast.success(result.data.message);
      this.props.getAllRecommend();
      return;
    }
    toast.error(result.data.message);
  };
  handleDeleteReal = async (id) => {
    const result = await axios.delete(
      `${link.URL_BACKEND}/recommend/delete/${id}`
    );
    if (result.data.statusCode === 200) {
      toast.success(result.data.message);
      this.props.getAllRecommend();
      return;
    }
    toast.error(result.data.message);
  };
  renderRecommend = () => {
    try {
      const { recommend } = this.state;

      return recommend.map((item) => {
        return (
          <tr>
            <td>
              <div class="dropdown">
                <a
                  class="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  {item.name}
                  <span class="caret"></span>
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  {item.list.map((l, index) => {
                    const arr = Object.keys(l);
                    const arr0 = arr[0];
                    const arr1 = arr[1];
                    const arr2 = arr[2];
                    const arr3 = arr[3];
                    const arr4 = arr[4];
                    const obj = {
                      name: l[arr0],
                      price: l[arr1],
                      description: l[arr2],
                      ingredient: l[arr4],
                      reason: l[arr3],
                    };
                    return (
                      <div
                        onClick={() =>
                          this.handleShowDetail(item._id, l._id, obj)
                        }
                        className={`img${l._id}`}
                        style={{ cursor: "pointer" }}
                      >
                        {l[arr[0]]}
                      </div>
                    );
                  })}
                </ul>
              </div>
            </td>
            <td>{item.email}</td>
            <td>
              <button
                onClick={() => this.handleDeleteReal(item._id)}
                type="button"
                class="btn btn-success"
              >
                DELETE
              </button>
              <button
                onClick={() =>
                  this.handleOnClickUpdateRe({
                    nameR: item.name,
                    email: item.email,
                    idR: item._id,
                  })
                }
                class="btn btn-primary"
                data-toggle="modal"
                href="#modal-id"
              >
                EDIT
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
                      <h4 class="modal-title">EDIT FORM</h4>
                    </div>
                    <div class="modal-body text-left">
                      <form action="" method="POST" role="form">
                        <legend>Form title</legend>
                        <div class="form-group">
                          <label for="">Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id=""
                            placeholder="Name field"
                            name="nameR"
                            value={this.state.nameR}
                            onChange={this.handleUpdateEmailandNamer}
                          />
                        </div>{" "}
                        <div class="form-group">
                          <label for="">Email</label>
                          <input
                            type="text"
                            class="form-control"
                            id=""
                            name="email"
                            placeholder="Email field"
                            value={this.state.email}
                            onChange={this.handleUpdateEmailandNamer}
                          />
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-default"
                        data-dismiss="modal"
                      >
                        CLOSE
                      </button>
                      <button
                        onClick={this.hanldeUpdateReal}
                        type="button"
                        class="btn btn-primary"
                      >
                        UPDATE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  handeDeleRecommendChildrend = async (e) => {
    e.preventDefault();
    const { id, idC } = this.state;
    const result = await axios.delete(
      `${link.URL_BACKEND}/recommend/delete/children/${id}/${idC}`
    );
    console.log(result);
  };
  handleUpdateRecommend = async (e) => {
    e.preventDefault();
    const { id, idC, name, price, description, ingredient, reason } =
      this.state;
    const obj = { name, price, description, ingredient, reason };
    console.log(obj);
    const result = await axios.put(
      `${link.URL_BACKEND}/recommend/update/children/${id}/${idC}`,
      obj
    );
    if (result.data.statusCode === 200) {
      toast.success(result.data.message);
      this.props.getAllRecommend();
      return;
    }
    toast.error(result.data.message);
  };
  handleOnChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };
  handleGetUrlImg = async (e, index) => {
    try {
      const { length } = e.target.files;
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < length; i++) {
        data.append("file", files[i]);
      }
      const result = await axios.post(
        `${link.URL_BACKEND}/recommend/create`,
        data
      );
      console.log(result);
      this.setState({
        ["images" + index]: result.data.image,
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { name, price, description, reason, ingredient, id } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <input
              type="text"
              name=""
              id="input"
              className="form-control"
              placeholder="Enter number  manage (Manage restanrant's, manage spa's v.v)"
              onChange={this.handleRenderManage}
            />
          </div>
          <button
            onClick={this.handleSubmit}
            type="button"
            className="btn btn-success"
          >
            SUBMIT RECOMMEND
          </button>
        </div>
        <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            {this.renderTypeManage()}
          </div>
        </div>

        <div class="row">
          <div class="type-table reset-padding-table col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <table class="type-table table table-hover">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>{this.renderRecommend()}</tbody>
            </table>
          </div>

          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <form>
              <legend>Form Details</legend>
              <div class="form-group">
                <label for="">NAME</label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="name field"
                  value={name}
                  onChange={this.handleOnChange}
                />
              </div>{" "}
              <div class="form-group">
                <label for="">PRICE</label>
                <input
                  type="text"
                  class="form-control"
                  name="price"
                  placeholder="price field"
                  value={price}
                  onChange={this.handleOnChange}
                />
              </div>
              <div class="form-group">
                <label for="">DESCRIPTION</label>
                <input
                  type="text"
                  class="form-control"
                  name="description"
                  placeholder="description field"
                  value={description}
                  onChange={this.handleOnChange}
                />
              </div>
              <div class="form-group">
                <label for="">INGREDIENT</label>
                <input
                  type="text"
                  class="form-control"
                  name="ingredient"
                  placeholder="ingredient field"
                  value={ingredient}
                  onChange={this.handleOnChange}
                />
              </div>
              <div class="form-group">
                <label for="">reason</label>
                <input
                  type="text"
                  class="form-control"
                  name="reason"
                  placeholder="reason field"
                  value={reason}
                  onChange={this.handleOnChange}
                />
              </div>
              <button
                onClick={this.handleUpdateRecommend}
                type="submit"
                class="btn btn-primary"
              >
                UPDATE
              </button>
              <button
                onClick={this.handeDeleRecommendChildrend}
                type="submit"
                class="btn btn-success"
              >
                DELETE
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    recommend: state.recommend,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllRecommend: () => {
      dispatch(getAllRecommend());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
