import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Signup from '../Signup';
import {
	Container,
	LoginWrapper,
	Greentea,
	SignupWrapper,
	IdPwWrap,
	Wrapper,
	IconWrapper,
	Icon,
	Input,
	Btn,
	ImgWrapper,
	Img
} from './styled';

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
		fetch('http://ec2-52-78-41-28.ap-northeast-2.compute.amazonaws.com:4000/user/login', {
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
			if (token && decode) {
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
