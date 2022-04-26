import React, { Component } from "react";
import axios from "axios";
import link from "../../helpers/variableContains";
import { connect } from "react-redux";
import getAllRecommend from "../../actions/recommend";
import tippy from "tippy.js";
import { toast } from "react-toastify";
class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommend: [],
      name: "",
      list: [],
    };
  }

  componentDidMount() {
    this.props.getAllRecommend();
  }
  componentDidUpdate(prevState, state) {
    try {
      if (this.props.allRecommend !== state.recommend) {
        this.setState({
          recommend: this.props.allRecommend,
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
  handleChecked = (e, id) => {
    const { list, recommend } = this.state;
    if (e.target.checked) {
      const findOne = recommend.find((e) => {
        return e._id == id;
      });
      list.push(findOne);
      this.setState({
        list,
      });
    } else {
      const findIndex = list.findIndex((e) => {
        return e._id == id;
      });
      list.splice(findIndex, 1);
      this.setState({
        list,
      });
    }
  };
  renderRecommend = () => {
    try {
      const { recommend } = this.state;

      return recommend.map((item, index) => {
        return (
          <tr>
            <td>
              <label HTMlfor="input">
                <div class="dropdown">
                  <input
                    onChange={(e) => this.handleChecked(e, item._id)}
                    type="checkbox"
                    value=""
                    id="input"
                  />
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
              </label>
            </td>
            <td>{item.email}</td>
          </tr>
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleOnChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleAdd = async () => {
    const { name, list } = this.state;
    const result = await axios.post(
      `${link.URL_BACKEND}/recommend/all/create`,
      { name, list }
    );
    if (result.data.statusCode === 200) {
      toast.success(result.data.message);
      window.location.reload();
      return;
    }
    toast.error(result.data.message);
  };
  render() {
    console.log(this.state.list);
    return (
      <div>
        <div class="row">
          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <select
              name=""
              id="input"
              class="form-control"
              required="required"
              onChange={this.handleOnChange}
            >
              <option value="CARE RITUAL">CARE RITUAL</option>
              <option value="FINESS & MOVEMENT">FINESS & MOVEMENT</option>
              <option value="RESTAURANT">RESTAURANT</option>
              <option value="HOTEL'S SPA">HOTEL'S SPA</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="type-table reset-padding-table col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <table class="type-table table table-hover">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                  </tr>
                </thead>
                <tbody>{this.renderRecommend()}</tbody>
              </table>{" "}
              <button
                onClick={this.handleAdd}
                style={{ float: "right" }}
                type="button"
                class="btn btn-success"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allRecommend: state.allRecommend,
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
