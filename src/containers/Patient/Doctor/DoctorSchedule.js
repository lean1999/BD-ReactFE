import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import BookingModal from "../../Patient/Doctor/Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTimes: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    this.setState({ allDays: allDays });

    if (this.props.detailDoctorIdFromParent) {
      let res = await getScheduleDoctorByDate(
        this.props.detailDoctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTimes: res.data ? res.data : [],
      });
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
          console.log("ddmm", today);
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (
      this.props.detailDoctorIdFromParent !== prevProps.detailDoctorIdFromParent
    ) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.detailDoctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTimes: res.data ? res.data : [],
      });
    }
  }
  handleOnChangeSelect = async (event) => {
    if (
      this.props.detailDoctorIdFromParent &&
      this.props.detailDoctorIdFromParent !== -1
    ) {
      let doctorId = this.props.detailDoctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTimes: res.data ? res.data : [],
        });
        console.log("check res after", res);
        //day
      }
    }
  };
  handleClickScheduleTime = (time) => {
    console.log("check", time);
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };
  closeBookingClose = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  isShow = (data) => {
    if (new Date().getTime() < Number(data.date)){
      return true;
    }
    return this.getListShow().includes(data.timeType);
  };
  getListShow = () => {
    var result = [];
    var nowHours = new Date().getHours();
    var type =
      nowHours <= 7
        ? 1
        : nowHours >= 16
        ? 0
        : nowHours <= 11
        ? nowHours - 6
        : nowHours - 7;
    switch (type) {
      case 1:
        result.push("T1")
      case 2:
        result.push("T2")
      case 3:
        result.push("T3")
      case 4:
        result.push("T4")
      case 5:
        result.push("T5")
      case 6:
        result.push("T6")
      case 7:
        result.push("T7")
      case 8:
        result.push("T8")
    }
    return result;
  };
  render() {
    let {
      allDays,
      allAvalableTimes,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    console.log("check 122312312", allAvalableTimes);
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fa fa-calendar-alt"></i>{" "}
              <span>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>
            <div className="time-content">
              {allAvalableTimes && allAvalableTimes.length > 0 ? (
                <>
                  <div className="time-content-btn">
                    {allAvalableTimes.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      console.log("check time", item);
                      return (
                        <button
                          key={index}
                          onClick={() => this.handleClickScheduleTime(item)}
                          disabled={!this.isShow(item)}
                        >
                          {" "}
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                    <i className="far fa-hand-point-up"></i>{" "}
                    <FormattedMessage id="patient.detail-doctor.free" />
                  </div>
                </>
              ) : (
                <div style={{ fontStyle: "italic", fontSize: "16px" }}>
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingClose={this.closeBookingClose}
          dataTime={dataScheduleTimeModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
