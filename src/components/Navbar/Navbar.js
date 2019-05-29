import React, { Component } from 'react';
import { Row, Col } from 'antd';
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
    handleLogin = () => this.props.onLogin();
    handleRegister = () => this.props.onRegister();
    handleEnter = evt=> {if(evt.keyCode===13) this.sButton.click();}
    handleLogout = () => this.props.onLogout();

    render() {
        return (
            <Row className='Navbar' type='flex' align='middle' gutter={8}>
                <Col span={6}>
                    <Logo />
                </Col>
                <Col span={12}>
                    <Row type='flex' justify='space-around' gutter={8}>
                        <Col span={11}>
                            <input type='text' className='NavInput' placeholder='Tagi: (np. stanowisko, firma)' onChange={this.handleTagChange} onKeyUp={this.handleEnter}/>
                        </Col>
                        <Col span={11}>
                            <input type='text' className='NavInput' placeholder='Miasto lub województwo' onChange={this.handleCityChange} onKeyUp={this.handleEnter}/>
                        </Col>
                    </Row>
                    <RowDivider height='0.5em' />
                    <Row type='flex' justify='center'>
                        <button ref={button => this.sButton = button} className='NavButton Dark' onClick={this.handleSearch}>Szukaj</button>
                    </Row>
                </Col>
                <Col span={6}>
                    {
                        this.props.authed ?
                        <>
                            <Row type='flex' justify='center'>
                                <button className='NavButton Light' onClick={this.handleAddJobOffer}>Dodaj ofertę</button>
                            </Row>
                            <RowDivider height='0.5em' />
                            <Row type='flex' justify='center'>
                                <button className='NavButton Dark' onClick={this.handleLogout}>Wyloguj</button>
                            </Row>
                        </>
                        :
                        <>
                            <Row type='flex' justify='center'>
                                <button className='NavButton Light' onClick={this.handleLogin}>Zaloguj</button>
                            </Row>
                            <RowDivider height='0.5em' />
                            <Row type='flex' justify='center'>
                                <button className='NavButton Dark' onClick={this.handleRegister}>Zarejestruj</button>
                            </Row>
                        </>
                    }
                </Col>
            </Row>
        );
    }
}

export default Navbar;