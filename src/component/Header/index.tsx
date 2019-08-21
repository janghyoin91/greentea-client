import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

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
interface HeaderProps {
	location: any;
}
const Header: React.FC<HeaderProps> = ({}) => {
	return (
		<Div>
			<First>
				{/* <Link to={`/${}/board`}> */}
				<Button>
					<Trello>
						<FontAwesomeIcon icon={[ 'fab', 'trello' ]} />
					</Trello>
					<Boards>Boards</Boards>
				</Button>
				{/* </Link> */}
				<SearchDiv>
					<SarchIcon>
						<FontAwesomeIcon icon="search" />
					</SarchIcon>
					<SearchInput />
				</SearchDiv>
			</First>
			<Second>Greentea</Second>
			<Third>
				<label>
					<img />
				</label>
				<label>Hello, hyoin!</label>
			</Third>
		</Div>
	);
};

export default Header;
