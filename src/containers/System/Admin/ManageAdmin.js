import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageAdmin.scss";
import UserManage from "../UserManage";
import { getAllUsers, getAllTypeUsers, getAllListPatient, GetAllUsersPatient } from '../../../services/userService'
import UserRedux from "./UserRedux";
import ManageDoctor from "./ManageDoctor";
import ManageSchedule from "../Doctor/ManageSchedule";
import ManageClinic from "../Clinic/ManageClinic";
import ManageSpecialty from "../Specialty/ManageSpecialty";
import { FaBeer, FaUserCircle } from "react-icons/fa";
import { BiUser, BiLogOut, BiBookContent, BiBrain } from "react-icons/bi";
import { FcDepartment } from "react-icons/fc";
import * as actions from "../../../store/actions";
import ManagePatient from "../Doctor/ManagePatient";
import ManagePrescription from "../Doctor/ManagePrescription";
import ManageHandBook from "./ManageHandBook";
import ListPatientExam from "./ListPatientExam";
import ListPatienShedule from "./ListPatienShedule";
import { Chart } from "react-google-charts";
import { flatMap } from "lodash";


class ManageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCrudUser: false,
      showCrudReduxUser: false,
      showManageDoctor: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showHandBook: false,
      showManageDoctorRole: false,
      showManagePatient: false,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      arrUsers: [],
      arrUsers1: [],
      arrUsers2: [],
      arrUsers3: [],
      arrUsers4: [],
      showDashBoard: false
    };
  }

  async componentDidMount() {
    await this.getAllDoctor();
    await this.getAllUsersPatient();
    await this.getALlPatient();
    await this.getALlPatient1();
    await this.getALlPatient2();
  }

  getALlPatient = async () => {
    let response1 = await GetAllUsersPatient("S3");
    if (response1 && response1.err === 0) {
      this.setState({
        arrUsers2: response1.dataTypeUser,
      });
    }
  };
  getALlPatient1 = async () => {
    let response1 = await GetAllUsersPatient("S2");
    if (response1 && response1.err === 0) {
      this.setState({
        arrUsers3: response1.dataTypeUser,
      });
    }
  };
  getALlPatient2 = async () => {
    let response1 = await GetAllUsersPatient("S1");
    if (response1 && response1.err === 0) {
      this.setState({
        arrUsers4: response1.dataTypeUser,
      });
    }
  };
  getAllUsersPatient = async () => {
    let response1 = await getAllTypeUsers("R3");
    if (response1 && response1.err === 0) {
      this.setState({
        arrUsers1: response1.dataTypeUser,
      });
    }
  };
  getAllDoctor = async () => {
    let response = await getAllTypeUsers("R2");
    if (response && response.err === 0) {
      this.setState({
        arrUsers: response.dataTypeUser,
      });
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handShowCrudUser = () => {
    this.setState({
      showCrudUser: true,
      showCrudReduxUser: false,
      showManageDoctor: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowCrudUserRedux = () => {
    this.setState({
      showCrudReduxUser: true,
      showCrudUser: false,
      showManageDoctor: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowManageDoctor = () => {
    this.setState({
      showManageDoctor: true,
      showCrudUser: false,
      showCrudReduxUser: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowPlanExam = () => {
    this.setState({
      showManagePlanExam: true,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowManageClinic = () => {
    this.setState({
      showManageClinic: true,
      showManagePlanExam: false,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowSpecialist = () => {
    this.setState({
      showSpeciallist: true,
      showManagePlanExam: false,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showManageClinic: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowHandBook = () => {
    this.setState({
      showManageClinic: false,
      showManagePlanExam: false,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: true,
    });
  };

  handShowManagePatient = () => {
    this.setState({
      showManagePatient: true,
      showManageDoctorRole: false,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
    });
  };
  handShowManageDoctorMN = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: true,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
    });
  };
  handShowManagePresition = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: false,
      showManagePrescription: true,
      showListPatientExamined: false,
      showListPatientScheduled: false,
    });
  };
  handleShowListPatientExamined = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: false,
      showManagePrescription: false,
      showListPatientExamined: true,
      showListPatientScheduled: false,
    });
  };
  handleShowListPatientScheduled = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: false,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: true,
    });
  };
  showDashBoard = () => {
    this.setState({
      showDashBoard: true

    })
    alert('??dasd');
  }
  render() {
    let {
      showCrudReduxUser,
      showCrudUser,
      showHandBook,
      showManageClinic,
      showManageDoctor,
      showSpeciallist,
      showManagePlanExam,
      showManageDoctorRole,
      showManagePatient,
      showManagePrescription,
      showListPatientExamined,
      showListPatientScheduled,
      showDashBoard
    } = this.state;
    let arrUsers = this.state.arrUsers;
    let arrUsers1 = this.state.arrUsers1;
    let arrUsers2 = this.state.arrUsers2;
    let arrUsers3 = this.state.arrUsers3;
    let arrUsers4 = this.state.arrUsers4;
    console.log('check state aruser', arrUsers)
    console.log('check state aruser1', arrUsers1.length)
    const { isLoggedIn, userInfo, processLogout } = this.props;
    // console.log('checl', userInfo.roleId)
    let testdate = [];
    console.log('??cscsc', typeof (testdate))
    const iads = arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => [`${item.firstName}`, '10', "#b87333"])
    console.log('check 123123', typeof (iads))
    const datatest = [["Element", "B??c s?? c?? l?????t kh??m cao nh???t", { role: "style" }], iads[1]]

    console.log('??cscascsa', datatest);
    const data = [

      ["Element", "S??? l?????ng b???nh nh??n ???? kh??m c???a b??c s??", { role: "style" }],
      // [testdate, 8.94, "#b87333"],
      ['Nguy???n Th??y An', 10, "#b87333"],
      ['L?? ??an T??', 15, "#b87333"],
      ['Ph???m Di???u Linh', 30, "blue"],
      ['Nguy???n Di???p Chi', 12, "#b87333"],
      ['Ph??ng M???nh', 13, "#b87333"],
      ['Nguy???n Tr???ng Tu???n', 14, "#b87333"],
      // [arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
      //   let dat = [];
      //   if (item && item.roleId === 'R2' && index === 0) {
      //     dat = item.lastName + ' ' + item.firstName;
      //   }
      //   console.log('check l??tname', dat)
      //   return dat
      // }), 8.94, "#b87333"], // RGB value
    ];
    console.log('check ????sd', data)
    return (
      <>
        {isLoggedIn && userInfo.roleId === "R1" ? (
          <>
            <div className="container-manage-admin">
              <div className="manage-admin">
                <div className="content-left-admin">
                  <div className="title-app" onClick={this.showDashBoard}>BOOKING DOCTOR </div>
                  <div className="menu-manage-admin">
                    <div className="mn-user">
                      <BiUser className="icon-user" /> Qu???n L?? Ng?????i D??ng
                      <div className="sub-mn" onClick={this.handShowCrudUser}>
                        CRUD User
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowCrudUserRedux}
                      >
                        CRUD Redux User
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageDoctor}
                      >
                        Qu???n L?? B??c S??
                      </div>
                      <div className="sub-mn" onClick={this.handShowPlanExam}>
                        Qu???n L?? K??? Ho???ch Kh??m
                      </div>
                    </div>
                    <div className="mn-clinic">
                      Ph??ng Kh??m
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageClinic}
                      >
                        Qu???n L?? Ph??ng Kh??m
                      </div>
                    </div>
                    <div className="mn-specialist">
                      Chuy??n Khoa
                      <div className="sub-mn" onClick={this.handShowSpecialist}>
                        Qu???n L?? Chuy??n Khoa
                      </div>
                    </div>
                    <div
                      className="mn-handlebook"
                      onClick={this.handShowHandBook}
                    >
                      Bi???u ?????
                      <div className="sub-mn">Qu???n L?? Bi???u ?????</div>
                    </div>

                    <div className="mn-exit">
                      <a
                        href="/"
                        style={{ textDecoration: "none" }}
                        onClick={processLogout}
                      >
                        <BiLogOut /> Tho??t
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content-right-admin">
                  <div className="header-content-right-admin">
                    <div className="title-manage-admin">Qu???n tr??? Admin</div>
                    <div className="info-admin"> Admin</div>
                  </div>
                  <div className="show-content-right-admin">
                    {showCrudUser === true || showCrudReduxUser === true ||
                      showManageDoctor === true || showManagePlanExam === true || showManageClinic === true
                      || showSpeciallist === true || showHandBook === true ?
                      <>

                      </> : <>
                        {showDashBoard = true ? <>
                          <div className="dashboard-admin">
                            <div className="content-dashboard">
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers.length}</span>
                                T???ng s??? b???nh nh??n
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers1.length}</span>
                                T???ng s??? b??c s??
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers2.length}</span>
                                S??? b???nh nh??n ?????i kh??m
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers3.length}</span>
                                S??? b???nh nh??n ???? kh??m
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers4.length}</span>
                                S??? b???nh nh??n ?????t ch??a x??c nh???n
                              </div>
                            </div>
                            <div className="chart-doctor-number">
                              <Chart chartType="ColumnChart" width="100%" height="600px" data={data} />
                            </div>
                          </div></> : <></>}</>}

                    {showCrudUser === true ? <UserManage /> : <></>}
                    {showCrudReduxUser === true ? <UserRedux /> : <></>}
                    {showManageDoctor === true ? <ManageDoctor /> : <></>}
                    {showManagePlanExam === true ? <ManageSchedule /> : <></>}
                    {showManageClinic === true ? <ManageClinic /> : <></>}
                    {showSpeciallist === true ? <ManageSpecialty /> : <></>}
                    {showHandBook === true ? <ManageHandBook /> : <></>}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>

          </>
        )}
        {isLoggedIn && userInfo.roleId === "R2" ? (
          <>
            <div className="container-manage-admin">
              <div className="manage-admin">
                <div className="content-left-admin">
                  <div className="title-app">BOOKING DOCTOR </div>
                  
                  <div className="menu-manage-admin">
                    
                    <div className="mn-user">
                      Qu???n L?? L???ch Tr??nh B??c S??
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageDoctorMN}
                      >
                        Qu???n L?? K??? Ho???ch Kh??m
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManagePatient}
                      >
                        Qu???n L?? B???nh Nh??n Kh??m
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManagePresition}
                      >
                        Qu???n L?? ????n Thu???c
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handleShowListPatientExamined}
                      >
                        Danh s??ch b???nh nh??n ???? kh??m
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handleShowListPatientScheduled}
                      >
                        Danh s??ch b???nh nh??n ???? ?????t l???ch
                      </div>
                    </div>
                    <div
                      className="mn-handlebook"
                      onClick={this.handShowHandBook}
                    >
                      B???nh Nh??n
                    </div>
                    <div className="mn-exit">
                      <a
                        href="/"
                        style={{ textDecoration: "none" }}
                        onClick={processLogout}
                      >
                        Tho??t <BiLogOut />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content-right-admin">
                  <div className="header-content-right-admin">
                    <div className="title-manage-admin">B??c S?? Qu???n L??</div>
                    <div className="info-admin"> B??c S??</div>
                  </div>
                  <div className="show-content-right-admin">
                  {showManageDoctorRole === true || showManagePatient === true ||
                      showManagePrescription === true || showListPatientExamined === true || showListPatientScheduled === true
                    ?
                      <>

                      </> : <>
                        {showDashBoard = true ? <>
                          <div className="dashboard-admin">
                            <div className="content-dashboard">
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers.length}</span>
                                T???ng s??? b???nh nh??n
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers1.length}</span>
                                T???ng s??? b??c s??
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers2.length}</span>
                                S??? b???nh nh??n ?????i kh??m
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers3.length}</span>
                                S??? b???nh nh??n ???? kh??m
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers4.length}</span>
                                S??? b???nh nh??n ?????t ch??a x??c nh???n
                              </div>
                            </div>
                            <div className="chart-doctor-number">
                              <Chart chartType="ColumnChart" width="100%" height="600px" data={data} />
                            </div>
                          </div></> : <></>}</>}
                    {showManageDoctorRole === true ? <ManageSchedule /> : <></>}
                    {showManagePatient === true ? <ManagePatient /> : <></>}
                    {showManagePrescription === true ? (
                      <ManagePrescription />
                    ) : (
                      <></>
                    )}
                    {showListPatientExamined === true ? (
                      <ListPatientExam />
                    ) : (
                      <></>
                    )}
                    {showListPatientScheduled === true ? (
                      <ListPatienShedule />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
