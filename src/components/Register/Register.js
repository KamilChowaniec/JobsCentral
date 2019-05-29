import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

class NormalRegisterForm extends Component {
    state = {
        confirmDirty: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch("/api/users/signup",
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.msg == 'success') {
                            //Zarejestrowalem sie najs zrob cos :D:DD:D:D
                            this.props.onRegister();
                        }
                    })
                    .catch(err => { });
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
                <Form.Item>
                    {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Musisz wpisać swoje imię!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Imię"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('lastName', {
                        rules: [{ required: true, message: 'Musisz wpisać swoje nazwisko!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Nazwisko"
                        />,
                    )}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email',
                            message: 'Email jest niepoprawny!',
                        },
                        {
                            required: true,
                            message: 'Musisz wpisać swój email!'
                        }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Hasło" />)}

                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Powtórz hasło"
                        onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        Zarejestruj
          </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_register' })(NormalRegisterForm);

export default WrappedNormalRegisterForm;