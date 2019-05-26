import React, { Component } from "react";
import { Row } from "antd";
import Job from "../Job/Job";
import "./JobList.css";
import AnimateHeight from "react-animate-height";

class JobList extends Component {
  state = {
    jobs: [],
    lastClicked: 0,
    items: ["hello", "world", "click", "me"]
  };

  handleJobClick = ind => {
    let jobs = [...this.state.jobs];
    let tmp = !jobs[ind].state.clicked;
    if (this.state.lastClicked !== -1) {
      jobs[this.state.lastClicked].state.clicked = false;
      jobs[this.state.lastClicked].state.leaving = true;
    }
    if (tmp) jobs[ind].state.leaving = true;
    jobs[ind].state.clicked = tmp;
    this.setState({ jobs: jobs, lastClicked: ind });
  };

  handleRemove = i => {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  };

  handleAdd = () => {
    const newItems = [...this.state.items, "Newitem" + Math.random()];
    this.setState({ items: newItems });
  };

  componentWillReceiveProps(nextProps) {
    let jobs = [...this.state.jobs];
    for (let j of jobs) {
      if (
        !j.info.city.toLowerCase().includes(nextProps.query.city.toLowerCase())
      ) {
        j.state.collapsed = true;
        j.state.clicked = false;
      } else j.state.collapsed = false;
    }
    console.log(jobs);
    this.setState({ jobs });
  }

  componentDidMount() {
    fetch("https://jobs-central.herokuapp.com/api/jobOffers")
      .then(res => res.json())
      .then(json => {
        this.setState({
          jobs: json.map(job => {
            return {
              info: job,
              state: {
                clicked: false,
                collapsed: false
              }
            };
          })
        });
      });
  }

  render() {
    let jobs = [];
    let j = 0;
    for (let i = 0; i < this.state.jobs.length; i++) {
      let el = this.state.jobs[i];
      if (!el.state.collapsed) j++;
      jobs.push(
        <div
          key={el.info.id}
          className={el.state.clicked ? "JobListJob Clicked" : "JobListJob"}
        >
          <AnimateHeight
            height={el.state.collapsed ? 0 : "auto"}
            duration={500}
            easing="ease-in-out"
          >
            <Job
              bg={j % 2 ? "#36393E" : "#303136"}
              {...el.info}
              clicked={el.state.clicked}
              onClick={() => this.handleJobClick(i)}
            />
          </AnimateHeight>
        </div>
      );
    }
    return (
      <Row type="flex" justify="center">
        <div className="JobList">{jobs}</div>
      </Row>
    );
  }
}

export default JobList;
