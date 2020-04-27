//NOTE/: external library --->
import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

//NOTE/: internal library --->
import { Block } from "../../../components";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegisterForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
        <Fragment>
            <div className='auth__top'>
                <h2>Регистрация аккаунта</h2>
                <p>Пожалуста зарегестрируйте свой аккаунт</p>
            </div>
            <Block>
                <Form
                    {...formItemLayout}
                    form={form}
                    name='register'
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name='email'
                        label='E-mail'
                        rules={[
                            {
                                type: "email",
                                message: "Введите правельный email",
                            },
                            {
                                required: true,
                                message: "Введите email",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label='Password'
                        rules={[
                            {
                                required: true,
                                message: "Введите пароль!",
                            },
                            //TODO: validation password rules --->
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (value.length > 5) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "Не менее 5 символов"
                                    );
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name='confirm'
                        label='Confirm Pass'
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Подтвердите пароль",
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        "Пароли должны совпадать!"
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name='nickname'
                        label={
                            <span>
                                Nickname&nbsp;
                                <Tooltip title='Как вас зовут?'>
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Пожалуста введите имя!",
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type='primary' htmlType='submit'>
                            Регистрация
                        </Button>
                    </Form.Item>
                    <Link to={"/"}>Войти</Link>
                </Form>
            </Block>
        </Fragment>
    );
};

export default RegisterForm;
