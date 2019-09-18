import React, { Component } from 'react';
import Welcome from './Welcome';
import Fail from './Fail';
import { SmallTitle, GotoLogin, UserInfoWrapper, UserInput, CnaBtn } from './styled';

interface SignupProps {
	toggleSignup: Function;
}

interface SignupState {
	email: string;
	name: string;
	pw: string;
	success: boolean;
	fail: boolean;
}

class Signup extends Component<SignupProps, SignupState> {
	constructor(props: SignupProps) {
		super(props);
		this.state = {
			email: '',
			name: '',
			pw: '',
			success: false,
			fail: false
		};
	}

	changeInputVal = (e: any) => {
		if (e.target.name === 'email') {
			this.setState({ email: e.target.value });
		} else if (e.target.name === 'name') {
			this.setState({ name: e.target.value });
		} else if (e.target.name === 'pw') {
			this.setState({ pw: e.target.value });
		}
	};

	signupHandler = () => {
		const { email, name, pw } = this.state;
		fetch('http://ec2-52-78-41-28.ap-northeast-2.compute.amazonaws.com:4000/user/signup', {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				email,
				name,
				password: pw
			})
		})
			.then((res) => res.json())
			.then((json) => {
				if (json === 'already exist') {
					this.setState({ fail: true });
				} else {
					this.setState({ success: true });
				}
			});
	};

	toggleSuccess = () => {
		this.state.success ? this.setState({ success: false }) : this.setState({ success: true });
	};

	toggleFail = () => {
		this.state.fail ? this.setState({ fail: false }) : this.setState({ fail: true });
	};

	makeBlankInput = () => {
		this.setState({
			email: '',
			name: '',
			pw: ''
		});
	};

	render() {
		const { email, name, pw, success, fail } = this.state;
		const { toggleSignup } = this.props;
		return (
			<div>
				<SmallTitle>Create a Trello Account</SmallTitle>
				<GotoLogin onClick={() => toggleSignup()}>or log in to your account</GotoLogin>
				<UserInfoWrapper>
					<div>Email</div>
					<UserInput
						value={email}
						name="email"
						placeholder="e.g. walli@hyoin.com"
						onChange={this.changeInputVal}
					/>
					<div>Name</div>
					<UserInput value={name} name="name" placeholder="e.g. Walli Park" onChange={this.changeInputVal} />
					<div>Password</div>
					<UserInput value={pw} name="pw" placeholder="e.g. *********" onChange={this.changeInputVal} />
				</UserInfoWrapper>
				<CnaBtn onClick={this.signupHandler}>Create New Account</CnaBtn>
				{success ? <Welcome toggleSuccess={this.toggleSuccess} makeBlankInput={this.makeBlankInput} /> : null}
				{fail ? <Fail toggleFail={this.toggleFail} makeBlankInput={this.makeBlankInput} /> : null}
			</div>
		);
	}
}

export default Signup;
