import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt_decode from 'jwt-decode';
import {
	Div,
	First,
	Second,
	Third,
	Button,
	Trello,
	SearchDiv,
	SearchInput,
	SearchIcon,
	Boards,
	Logout,
	LogoutItem,
	RemoveAcc
} from './styled';

interface HeaderProps {
	location: any;
	match: any;
}

interface HeaderState {
	logout: boolean;
	jwt: string;
}
class Header extends Component<HeaderState> {
	state = {
		logout: false,
		jwt: ''
	};

	toggleLogout = () => {
		this.state.logout ? this.setState({ logout: false }) : this.setState({ logout: true });
	};

	logoutHandler = () => {
		localStorage.removeItem('jwt');
	};

	removeAccountHandler = () => {
		const token: any = localStorage.getItem('jwt');
		let decode: any = jwt_decode(token);
		localStorage.removeItem('jwt');
		fetch('http://ec2-52-78-41-28.ap-northeast-2.compute.amazonaws.com:4000/user/deleteaccount', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: token ? token : ''
			},
			body: JSON.stringify({
				email: decode.email
			})
		});
	};

	render() {
		let token: any = localStorage.getItem('jwt');
		let decode: any = jwt_decode(token);
		return (
			<Div>
				<First>
					<Link
						to={{
							pathname: `/${decode.name}/board`,
							state: { email: decode.email, token }
						}}
					>
						<Button>
							<Trello>
								<FontAwesomeIcon icon={[ 'fab', 'trello' ]} />
							</Trello>
							<Boards>Boards</Boards>
						</Button>
					</Link>
					<SearchDiv>
						<SearchIcon>
							<FontAwesomeIcon icon="search" />
						</SearchIcon>
						<SearchInput />
					</SearchDiv>
				</First>
				<Link
					to={{
						pathname: `/${decode.name}/board`,
						state: { email: decode.email, token }
					}}
				>
					<Second>Greentea</Second>
				</Link>
				<Third>
					<label>
						<img />
					</label>
					<label onClick={this.toggleLogout}>Hello,{decode.name}!</label>
				</Third>
				{this.state.logout ? (
					<Logout>
						<div>
							<Link to="/">
								<LogoutItem onClick={this.logoutHandler}>Log Out</LogoutItem>
							</Link>
							<Link to="/">
								<RemoveAcc onClick={this.removeAccountHandler}>Remove Account</RemoveAcc>
							</Link>
						</div>
					</Logout>
				) : null}
			</Div>
		);
	}
}

export default Header;
