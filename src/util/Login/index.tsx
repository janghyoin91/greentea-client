import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`display: flex;`;
const LoginWrapper = styled.div`
	width: 25%;
	height: 578px;
	background-color: #fff;
	padding: 5% 5%;
`;

const Greentea = styled.div`
	font-weight: bold;
	font-size: 25px;
	color: #4f88f7;
	margin-bottom: 130px;
`;

const IdPwWrap = styled.div`margin-bottom: 10px;`;

const IconWrapper = styled.span`
	border: 1px solid black;
	padding: 5px 0;
`;

const Icon = styled.span`
	color: #d9dadc;
	width: 20px;
	height: 20px;
	border: 1px solid #d9dadc;
	margin: 5px;
`;

const Input = styled.input`
	border: 1px solid #d9dadc;
	padding: 3px;
`;

const Btn = styled.span`
	background-color: #4f88f7;
	border: none;
	color: #fff;
	cursor: pointer;
	margin: 8px 8px 0 0;
	padding: 9px 24px;
	text-align: center;
	border-radius: 3px;
	font-size: 14px;
`;

const ImgWrapper = styled.div`
	width: 75%;
	height: 578px;
`;

const Img = styled.img`
	position: relative;
	height: 100%;
	width: 100%;
`;
interface LoginState {
	isLogin: boolean;
	user: any;
	name: string;
	email: string;
	password: string;
	token: any;
}

class Login extends Component<LoginState> {
	state = {
		isLogin: false,
		user: '',
		name: '',
		email: '',
		password: '',
		token: ''
	};

	loginHandler = () => {
		const { email, password } = this.state;
		fetch('http://localhost:4000/login', {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				localStorage.setItem('jwt', json.token);
				this.setState({ token: json.token });
				this.setState({ user: json.userInfo });
				this.setState({ name: json.userInfo.name });
				this.setState({ isLogin: true });
				this.setState({ email: '' });
				this.setState({ password: '' });
			});
	};

	changeInputVal = (e: any) => {
		if (e.target.name === 'email') {
			this.setState({ email: e.target.value });
		} else if (e.target.name === 'pw') {
			this.setState({ password: e.target.value });
		}
	};

	render() {
		const { isLogin, user, name, email, password, token } = this.state;
		return isLogin ? (
			<Redirect
				to={{
					pathname: `/${name}/board`,
					state: { user, token }
				}}
			/>
		) : (
			<Container>
				<LoginWrapper>
					<Greentea>Greentea</Greentea>
					<IdPwWrap>
						<div>
							<IconWrapper>
								<Icon>
									<FontAwesomeIcon icon="user" />
								</Icon>
							</IconWrapper>
							<Input value={email} name="email" onChange={this.changeInputVal} />
						</div>
						<div>
							<IconWrapper>
								<Icon>
									<FontAwesomeIcon icon="key" />
								</Icon>
							</IconWrapper>
							<Input value={password} name="pw" onChange={this.changeInputVal} />
						</div>
					</IdPwWrap>
					<div>
						<Btn>SIGNIN</Btn>
						<Btn onClick={this.loginHandler}>LOGIN</Btn>
					</div>
				</LoginWrapper>
				<ImgWrapper>
					<Img src="http://two.corporate.themerella.com/wp-content/uploads/sites/3/2017/02/corp02-blog-08.jpg.jpg" />
				</ImgWrapper>
			</Container>
		);
	}
}

export default Login;
