import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
//import { Default, Tablet, Mobile, Desktop } from '../Responsive/Responsive';
import Logo from '../Logo/Logo';
import './Navbar.css';

const RowDivider = (props) => <Row><div style={{ height: props.height }} /></Row>

class Navbar extends Component {
    state = {
        tags: '',
        city: ''
    }

    handleTagChange = evt => this.setState({ tags: evt.target.value })
    handleCityChange = evt => this.setState({ city: evt.target.value });
    handleSearch = () => this.props.onSearch(this.state.tags, this.state.city);

    render() {
        return (
            <Row className='Navbar' type='flex' align='middle' gutter={8}>
                <Col span={6}>
                    <Logo />
                </Col>
                <Col span={12}>
                    <Row type='flex' justify='space-around' gutter={8}>
                        <Col span={11}>
                            <Input className='NavInput' placeholder='Tagi: (np. stanowisko,firma)' onChange={this.handleTagChange} />
                        </Col>
                        <Col span={11}>
                            <Input className='NavInput' placeholder='Miasto lub województwo' onChange={this.handleCityChange} />
                        </Col>
                    </Row>
                    <RowDivider height='0.5em' />
                    <Row type='flex' justify='center'>
                        <button className='NavButton Dark' onClick={this.handleSearch}>Szukaj</button>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row type='flex' justify='center'>
                        <button className='NavButton Light'>Zaloguj</button>
                    </Row>
                    <RowDivider height='0.5em' />
                    <Row type='flex' justify='center'>
                        <button className='NavButton Dark'>Zarejestruj</button>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Navbar;