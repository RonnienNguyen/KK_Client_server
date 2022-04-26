import React, { Component } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import links from "./../../helpers/variableContains";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Spa: null,
      Gym: null,
      Restaurant: null,
      SeftCare: null,
    };
  }
  async componentDidMount() {
    const result = await axios.get(`${links.URL_BACKEND}/partner/getAll`);
    console.log(result);
    const { partners } = result.data.result;
    let { Spa, Gym, Restaurant, SeftCare } = this.state;
    Spa = partners.filter((partner) => {
      return partner.type === "Spa";
    });

    Gym = partners.filter((partner) => {
      return partner.type === "Gym";
    });
    Restaurant = partners.filter((partner) => {
      return partner.type === "Restaurant";
    });
    SeftCare = partners.filter((partner) => {
      return partner.type === "Seft Care";
    });
    setTimeout(() => {
      this.setState({
        Spa,
        Gym,
        Restaurant,
        SeftCare,
      });
    }, 1000);
  }
  render() {
    const { Spa, Gym, Restaurant, SeftCare } = this.state;
    return (
      <div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="container__card">
              <Link
                to="/accounts/manage"
                className="container__card-item item1"
              >
                <div className="card__title">
                  <p>Spa Management</p>
                  <p>{Spa ? Spa.length : "loading..."}</p>
                </div>
                <div className="card__icon">
                  <i class="fa-solid fa-user"></i>
                </div>
              </Link>
              <Link to="/hotels/manage" className="container__card-item item2">
                <div className="card__title">
                  <p>Restaurant Management</p>
                  <p>{Restaurant ? Restaurant.length : "loading..."}</p>
                </div>
                <div className="card__icon">
                  <i class="fa-solid fa-hotel"></i>
                </div>
              </Link>
              <Link
                to="/partners/manage"
                className="container__card-item item3"
              >
                <div className="card__title">
                  <p>Gym Management</p>
                  <p>{Gym ? Gym.length : "loading..."}</p>
                </div>
                <div className="card__icon">
                  <i class="fa-solid fa-handshake"></i>
                </div>
              </Link>
              <Link to="/types/manage" className="container__card-item item4">
                <div className="card__title">
                  <p>Seft Care Ritual Management</p>
                  <p>{SeftCare ? SeftCare.length : "loading..."}</p>
                </div>
                <div className="card__icon">
                  <i class="fa-brands fa-typo3"></i>
                </div>
              </Link>
            </div>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home__content"></div>
        </div>
      </div>
    );
  }
}
