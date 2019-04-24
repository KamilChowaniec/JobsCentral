import React, { Component } from 'react';
import { Row, Col } from 'antd';
import arrow from './Arrow.png';
import './Job.css';


class Job extends Component {
    state = { extended: false }

    handleClick = () => {
        this.props.onClick();
    }

    render() {
        let { bg, title, logo, position, firm, city, dimensions, description, clicked, onClick } = this.props;

        return (
            <Row className='Job' type='flex' align='middle' justify='space-between' gutter={16} style={{ background: bg }}>
                <Col>
                    <div style={{position:'relative'}}>
                        <div style={{width:'10vw', float:'left', paddingRight:'10px'}}>
                            <img className='JobLogo' src={logo} alt='' />
                        </div>
                        <div style={{ float:'left'}}>
                            <div>
                                <div className='JobTitle'>{title}</div>
                                <div className='JobFirm'>{firm}</div>
                                <div className={clicked ? 'JobDivider Clicked' : 'JobDivider'}></div>
                                <div className={clicked ? 'JobDetailsClicked' : 'JobDetailsClicked Not'}>
                                    <div className='JobDetails'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gdzie:&nbsp;{city}</div>
                            <div className='JobDetails'>&nbsp;&nbsp;&nbsp;&nbsp;Stanowisko:&nbsp;{position}</div>
                            <div className='JobDetails'>Wymiar&nbsp;pracy:&nbsp;{dimensions}</div>
                                    {/* <Row type='flex' justify='center'>
                                        <Col span={12}><Row type='flex' justify='end'><span className='JobDetails'>Gdzie:&nbsp;</span></Row></Col>
                                        <Col span={12}><Row type='flex' justify='start'><span className='JobDetails'>{city}</span></Row></Col>
                                    </Row>
                                    <Row type='flex' justify='center'>
                                        <Col span={12}><Row type='flex' justify='end'><span className='JobDetails'>Stanowisko:&nbsp;</span></Row></Col>
                                        <Col span={12}><Row type='flex' justify='start'><span className='JobDetails'>{position}</span></Row></Col>
                                    </Row>
                                    <Row type='flex' justify='center'>
                                        <Col span={12}><Row type='flex' justify='end'><span className='JobDetails'>Wymiar&nbsp;pracy:&nbsp;</span></Row></Col>
                                        <Col span={12}><Row type='flex' justify='start'><span className='JobDetails'>{dimensions}</span></Row></Col>
                                    </Row> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col style={{ paddingRight: '30px' }}>
                    <div className={clicked ? 'JobDetailsNotClicked Not' : 'JobDetailsNotClicked'}>
                        <Row type='flex' justify='center'>
                            <Col span={12}><Row type='flex' justify='end'><span className='JobDetails'>Gdzie:&nbsp;</span></Row></Col>
                            <Col span={12}><Row type='flex' justify='start'><span className='JobDetails'>{city}</span></Row></Col>
                        </Row>
                        <Row type='flex' justify='center'>
                            <Col span={12}><Row type='flex' justify='end'><span className='JobDetails'>Stanowisko:&nbsp;</span></Row></Col>
                            <Col span={12}><Row type='flex' justify='start'><span className='JobDetails'>{position}</span></Row></Col>
                        </Row>
                        <Row type='flex' justify='center'>
                            <Col span={12}><Row type='flex' justify='end'><span className='JobDetails'>Wymiar&nbsp;pracy:&nbsp;</span></Row></Col>
                            <Col span={12}><Row type='flex' justify='start'><span className='JobDetails'>{dimensions}</span></Row></Col>
                        </Row>
                    </div>
                </Col>
                <div style={{ height: '100%', position: 'absolute', right: '4px', top: '65%' }}>
                    <img className={clicked ? 'Arrow Clicked' : 'Arrow'} src={arrow} alt='' onClick={this.handleClick} />
                </div>
            </Row>

        );
    }
}

export default Job;