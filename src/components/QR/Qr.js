import React, { Component } from "react";
import { connect } from "react-redux";
import getAllHotels from "./../../actions/getAllHotels";
import Loading from "./../../components/LoadingButton/Loading";
import { saveAs } from "file-saver";
class Qr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      activePage: 1,
    };
  }
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
  componentDidMount() {
    console.log("renedr");
    try {
      this.props.getAllHotels(null);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prev, state) {
    try {
      if (this.props.hotels !== state.hotels) {
        setTimeout(() => {
          this.setState({
            hotels: this.props.hotels,
          });
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleActiveDowloadAQ = (url) => {
    try {
      saveAs(url, "image.jpg");
    } catch (error) {
      console.log(error);
    }
  };
  renderQr = () => {
    try {
      const { hotels } = this.state;

      return hotels.map((hotel, index) => {
        return (
          <tr>
            <td>{hotel.name}</td>
            <td>
              <a id={hotel._id} href={hotel.qr}>
                <img src={hotel.qr} />
              </a>
            </td>
            <td>
              <form>
                <label
                  style={{ cursor: "pointer", fontSize: "16px" }}
                  onClick={() => {
                    this.handleActiveDowloadAQ(hotel.qr);
                  }}
                >
                  {hotel.qr
                    ? "Dowload QRCODE"
                    : "Have not sign up yet!"}
                </label>
              </form>
            </td>
          </tr>
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleFindQr = (e) => {
    try {
      e.preventDefault();
      const { value } = e.target;
      const arrQr = this.props.hotels.filter((qr, index) => {
        if (qr.email) {
          return qr.email.indexOf(value) !== -1;
        }
      });
      this.setState({
        hotels: arrQr,
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <>
        <div className="row">
          <legend>QRCODE Hotels</legend>

          <div
            style={{ padding: 0 }}
            class="col-xs-5 col-sm-5 col-md-5 col-lg-5"
          >
            <form>
              <legend>Form Filter</legend>

              <div class="form-group">
                <label HTMLfor="qr">Filter QRCODE</label>
                <input
                  type="text"
                  class="form-control"
                  id="qr"
                  placeholder="Enter your email to find QR code"
                  onChange={this.handleFindQr}
                />
              </div>
            </form>
          </div>

          <div className="type-table reset-padding-table col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>NAME HOTEL</th>
                  <th>QRCODE</th>
                  <th>OUTPUT</th>
                </tr>
              </thead>
              <tbody>
                {this.state.hotels !== this.props.hotels ? (
                  <Loading />
                ) : (
                  this.renderQr()
                )}
              </tbody>
            </table>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Qr);
