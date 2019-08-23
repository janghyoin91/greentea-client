import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';

const Div = styled.div`
	display: flex;
	padding: 20px;
	box-shadow: 0 1px 20px -10px rgba(32, 33, 36, .28);
`;

const First = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-grow: 1;
`;

const Second = styled.div`
	@import url('https://fonts.gotogleapis.com/css?family=Megrim|Sriracha|Yellowtail&display=swap');
	font-family: Yellowtail;
	font-weight: bold;
	font-size: 25px;
	color: #4f88f7;
	display: block;
	left: 50%;
	position: absolute;
`;

const Third = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
	color: #abafb2;
`;

const Button = styled.button`
	border: none;
	background-color: white;
`;

const Trello = styled.span`
	color: #d9dadc;
	font-size: 22px;
`;

const SearchDiv = styled.div`
	position: relative;
	left: 90px;
`;

const SearchInput = styled.input.attrs({
	placeholder: 'Search...'
})`
	position: relative;
	top: 3px; 
	left: 10px;
	border: none;
	::placeholder{
		font-style: italic;
		color: #D9DADC;
	}
`;

const SarchIcon = styled.span`
	position: relative;
	top: 3px;
	color: #d9dadc;
	font-size: 14px;
`;

const Boards = styled.span`
	position: relative;
	bottom: 2px;
	left: 10px;
	color: #abafb2;
	cursor: pointer;
`;

const Logout = styled.div`
	position: fixed;
	top: 57px;
	right: 10px;
	padding: 15px;
	background-color: #fff;
	box-shadow: 0 1px 20px -10px rgba(32, 33, 36, .28);
`;

const LogoutItem = styled.div`
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 0.5px solid #d9dadc;
	cursor: pointer;
`;

const RemoveAcc = styled.div`cursor: pointer;`;
interface HeaderProps {
	location: any;
	match: any;
}

interface HeaderState {
	logout: boolean;
}
class Header extends Component<HeaderState> {
	state = {
		logout: false
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

		fetch('http://localhost:4000/removeaccount', {
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
						<SarchIcon>
							<FontAwesomeIcon icon="search" />
						</SarchIcon>
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
							<RemoveAcc onClick={this.removeAccountHandler}>Remove Account</RemoveAcc>
						</div>
					</Logout>
				) : null}
			</Div>
		);
	}
}

export default Header;
