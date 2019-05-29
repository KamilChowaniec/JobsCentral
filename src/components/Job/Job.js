import React, { Component } from "react";
import { Row, Col } from "antd";
import arrow from "./Arrow.png";
import redX from "./redX.png";
import "./Job.css";

class Job extends Component {
  state = { extended: false };

  handleClick = () => {
    this.props.onClick();
  };

  render() {
    let {
      bg,
      title,
      logo,
      position,
      firm,
      address,
      dimensions,
      description,
      clicked,
      removable
    } = this.props;

    return (
      <Row
        className="Job"
        type="flex"
        align="middle"
        justify="space-between"
        gutter={16}
        style={{ background: bg, position: "relative" }}
      >
        <Col span={9}>
          <Col span={8}>
            <img
              className="JobLogo"
              src={logo}
              alt=""
              style={{ width: "10vw", float: "left", paddingRight: "10px" }}
            />
          </Col>
          <Col span={16}>
            <div>
              <Row className="JobTitle">
                <span onClick={this.handleClick}>{title}</span>
              </Row>
              <Row className="JobFirm">{firm}</Row>
              <Row className={clicked ? "JobDivider Clicked" : "JobDivider"} />
              <Row
                className={
                  clicked ? "JobDetailsClicked" : "JobDetailsClicked Not"
                }
                type="flex"
                justify="center"
              >
                <Col>
                  <Row className="JobDetails">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gdzie:&nbsp;
                    {address.city}
                  </Row>
                  <Row className="JobDetails">
                    &nbsp;&nbsp;&nbsp;&nbsp;Stanowisko:&nbsp;{position}
                  </Row>
                  <Row className="JobDetails">
                    Wymiar&nbsp;pracy:&nbsp;{dimensions}
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Col>
        <Col span={15} style={{ paddingRight: "30px" }}>
          <div
            className={clicked ? "JobDescription Clicked" : "JobDescription"}
          >
            {description}
          </div>
          <div
            className={
              clicked ? "JobDetailsNotClicked Not" : "JobDetailsNotClicked"
            }
            style={{ right: 0 }}
          >
            <div className="JobDetails">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gdzie:&nbsp;
              {address.city}
            </div>
            <div className="JobDetails">
              &nbsp;&nbsp;&nbsp;&nbsp;Stanowisko:&nbsp;{position}
            </div>
            <div className="JobDetails">
              Wymiar&nbsp;pracy:&nbsp;{dimensions}
            </div>
          </div>
        </Col>
        <img
          className={clicked ? "Arrow Clicked" : "Arrow"}
          src={arrow}
          alt=""
          onClick={this.handleClick}
          style={{ position: "absolute", bottom: "10px", right: "13px" }}
        />
        {removable?<img
          className="RemoveButton"
          src={redX}
          alt=""
          onClick={this.props.onRemove}
          style={{ position: "absolute", top: "10px", right: "15px" }}
        />:null}
        
      </Row>
    );
  }
}

export default Job;
