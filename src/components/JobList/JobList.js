import React, { Component } from "react";
import { Row } from "antd";
import Job from "../Job/Job";
import "./JobList.css";
import AnimateHeight from "react-animate-height";

class JobList extends Component {
    state = {
        jobs: [],
        lastClicked: 0
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

    handleRemove = id => {
        let jobs = [...this.state.jobs];
        let lastClicked = this.state.lastClicked;
        jobs[id].state.collapsed = true;
        jobs[id].state.deleted = true;
        if (jobs[id].state.clicked) {
            jobs[id].state.clicked = false;
            lastClicked = -1;
        }
        // fetch(`/api/deleteOffer/${jobs[id].info.id}`)
        //     .then(res => res.json())
        //     .then(data => data.msg ? this.setState({ jobs, lastClicked }) : null);
        this.setState({ jobs, lastClicked });
    }


    componentWillReceiveProps(nextProps) {
        let jobs = [...this.state.jobs];
        for (let j of jobs) {
            if (
                !j.info.address.city.toLowerCase().includes(nextProps.query.city.toLowerCase())
            ) {
                j.state.collapsed = true;
                j.state.clicked = false;
            } else j.state.collapsed = false;
        }
        this.setState({ jobs });
    }

    componentDidMount() {
        fetch("/api/jobOffers")
            .then(res => res.json())
            .then(json => {
                this.setState(
                    {
                        jobs: json.map(job => ({
                            info: job,
                            state: {
                                clicked: false,
                                collapsed: false,
                                deleted: false,
                            }
                        }))
                    });
            })
            .catch(err => { });
    }

    render() {
        let jobs = [];
        let j = 0;
        for (let i = 0; i < this.state.jobs.length; i++) {
            let el = this.state.jobs[i];
            if (!(el.state.collapsed || el.state.deleted)) j++;
            jobs.push(
                <div
                    key={el.info.id}
                    className={el.state.clicked ? "JobListJob Clicked" : "JobListJob"}
                >
                    <AnimateHeight
                        height={(el.state.collapsed || el.state.deleted) ? 0 : "auto"}
                        duration={500}
                        easing="ease-in-out"
                    >
                        <Job
                            bg={j % 2 ? "#36393E" : "#303136"}
                            {...el.info}
                            clicked={el.state.clicked}
                            onRemove={() => { this.handleRemove(i) }}
                            removable={this.props.authed==2}
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
