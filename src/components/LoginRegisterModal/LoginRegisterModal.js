import React, { Component } from 'react';
import { Modal, Menu } from 'antd';
import Login from '../Login/Login';
import Register from '../Register/Register';

class LoginRegisterModal extends Component {

    render() {
        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.onClose}
                maskClosable={true}
                zIndex={1000}
                footer={null}
                style={{ borderRadius: "20px" }}
            >
                <Menu onClick={this.props.onMenuChange} selectedKeys={[this.props.current]} mode="horizontal" style={{  fontWeight: 'bold'}}>
                            <Menu.Item key="login">
                                Zaloguj się
                            </Menu.Item>
                            <Menu.Item key="register" >
                                Zarejestruj się
                            </Menu.Item>
                </Menu>
                <div style={{height:'10px'}}></div>
                {this.props.current=='login'?<Login onLogin = {this.props.onLogin}/>:<Register onRegister = {this.props.onRegister} />}

            </Modal>
        );
    }
}

export default LoginRegisterModal;