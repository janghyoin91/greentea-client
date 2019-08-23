import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Signup from '../Signup';

const Container = styled.div`display: flex;`;
const LoginWrapper = styled.div`
	width: 25%;
	height: 578px;
	background-color: #fff;
	padding: 5% 5%;
`;

const Greentea = styled.div`
	font-weight: bold;
	font-size: 33px;
	color: #4f88f7;
	margin-bottom: 130px;
`;

const SignupWrapper = styled.div`
	position: relative;
	bottom: 80px;
	padding-right: 25%;
`;

const IdPwWrap = styled.div`margin-bottom: 10px;`;

const Wrapper = styled.div`margin-bottom: 10px;`;

const IconWrapper = styled.span``;

const Icon = styled.span`
	color: #d9dadc;
	border: 1px solid #d9dadc;
	padding: 5px 7px;
`;

const Input = styled.input`
	border: 1px solid #d9dadc;
	padding: 8px 3px;
	position: relative;
	right: 1px;
	bottom: 2.5px;
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
	isSignup: boolean;
	userid: any;
	username: any;
	email: string;
	password: string;
	token: any;
}

class Login extends Component<LoginState> {
	state = {
		isLogin: false,
		isSignup: false,
		userid: '',
		username: '',
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
				if (json.token) {
					localStorage.setItem('jwt', json.token);
					this.setState({ token: json.token });
					this.setState({ userid: json.userid });
					this.setState({ username: json.username });
					this.setState({ isLogin: true });
					this.setState({ email: '' });
					this.setState({ password: '' });
				}
			});
	};

	toggleSignup = () => {
		this.state.isSignup ? this.setState({ isSignup: false }) : this.setState({ isSignup: true });
	};

	changeInputVal = (e: any) => {
		if (e.target.name === 'email') {
			this.setState({ email: e.target.value });
		} else if (e.target.name === 'pw') {
			this.setState({ password: e.target.value });
		}
	};

	componentDidMount = () => {
		if (localStorage.getItem('jwt')) {
			let token: any = localStorage.getItem('jwt');
			let decode: any = jwt_decode(token);
			console.log(decode);
			if (token && decode) {
				console.log(decode.name);
				this.setState({ isLogin: true, username: decode.name, email: decode.email });
			}
		}
	};

	render() {
		const { isLogin, isSignup, username, email, password, token } = this.state;
		return isLogin ? (
			<Redirect
				to={{
					pathname: `/${username}/board`,
					state: { email, token }
				}}
			/>
		) : (
			<Container>
				<LoginWrapper>
					<Greentea>Greentea</Greentea>
					{isSignup ? (
						<SignupWrapper>
							<Signup toggleSignup={this.toggleSignup} />
						</SignupWrapper>
					) : (
						<div>
							<IdPwWrap>
								<Wrapper>
									<IconWrapper>
										<Icon>
											<FontAwesomeIcon icon="user" />
										</Icon>
									</IconWrapper>
									<Input value={email} name="email" onChange={this.changeInputVal} />
								</Wrapper>
								<Wrapper>
									<IconWrapper>
										<Icon>
											<FontAwesomeIcon icon="key" />
										</Icon>
									</IconWrapper>
									<Input value={password} name="pw" onChange={this.changeInputVal} />
								</Wrapper>
							</IdPwWrap>
							<div>
								<Btn onClick={this.toggleSignup}>SIGNUP</Btn>
								<Btn onClick={this.loginHandler}>LOGIN</Btn>
							</div>
						</div>
					)}
				</LoginWrapper>
				<ImgWrapper>
					<Img src="http://two.corporate.themerella.com/wp-content/uploads/sites/3/2017/02/corp02-blog-08.jpg.jpg" />
				</ImgWrapper>
			</Container>
		);
	}
}

export default Login;
