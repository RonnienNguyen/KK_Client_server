import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Accounts from "./components/Accounts/Accounts";
import Hotels from "./components/Hotels/Hotels";
import Partners from "./components/Partners/Partners";
import Types from "./components/Types/Types";
import Login from "./components/Login/Login";
import NotFount from "./components/NotFoundPage/NotFount";
import QR from "./components/QR/Qr";
import Recommend from "./components/Recommend/Recommend";
import RecommendAll from "./components/Recommend All/Recommend";
import RestaurantDetails from "./components/RestaurantDetails/RestaurantDetails";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    return (
      <div>
        {this.props.isLogin ? (
          <BrowserRouter>
            <div className="header_class row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <Header />{" "}
              </div>

              <div className="body__class col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <Routes>
                  {" "}
                  <Route path="/" element={<Home />} />
                  <Route path="/accounts/manage" element={<Accounts />} />
                  <Route path="/hotels/manage" element={<Hotels />} />
                  <Route
                    path="/partners/manage/:email"
                    element={<Partners />}
                  />
                  <Route
                    path="/manage/restaurant/details/:id"
                    element={<RestaurantDetails />}
                  />
                  <Route path="/types/manage" element={<Types />} />
                  <Route path="/QRcodes/manage" element={<QR />} />
                  <Route path="/recommend/manage" element={<Recommend />} />
                  <Route path="/recommend" element={<RecommendAll />} />
                  <Route path="*" element={<NotFount />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        ) : (
          <Login />
        )}
        <div class="footer__appp">
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.login,
  };
};
const mapDisPatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDisPatchToProps)(App);
