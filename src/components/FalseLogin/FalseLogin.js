import React, { Component } from "react";
import { connect } from "react-redux";
import falseAction from "./../../actions/falseLogin";
class FalseLogin extends Component {
  componentDidMount() {
    this.props.falseAction();
  }
  render() {
    return <div>FALSE LOGIN</div>;
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispachToProps = (dispatch) => {
  return {
    falseAction: () => {
      dispatch(falseAction());
    },
  };
};
export default connect(mapStateToProps, mapDispachToProps)(FalseLogin);
