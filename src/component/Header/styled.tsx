import styled from 'styled-components';

export const Div = styled.div`
	display: flex;
	padding: 20px;
	box-shadow: 0 1px 20px -10px rgba(32, 33, 36, .28);
`;

export const First = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-grow: 1;
`;

export const Second = styled.div`
	@import url('https://fonts.gotogleapis.com/css?family=Megrim|Sriracha|Yellowtail&display=swap');
	font-family: Yellowtail;
	font-weight: bold;
	font-size: 25px;
	color: #4f88f7;
	display: block;
	left: 50%;
	position: absolute;
`;

export const Third = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;
	color: #abafb2;
`;

export const Button = styled.button`
	border: none;
	background-color: white;
`;

export const Trello = styled.span`
	color: #d9dadc;
	font-size: 22px;
`;

export const SearchDiv = styled.div`
	position: relative;
	left: 90px;
`;

export const SearchInput = styled.input.attrs({
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

export const SearchIcon = styled.span`
	position: relative;
	top: 3px;
	color: #d9dadc;
	font-size: 14px;
`;

export const Boards = styled.span`
	position: relative;
	bottom: 2px;
	left: 10px;
	color: #abafb2;
	cursor: pointer;
`;

export const Logout = styled.div`
	position: fixed;
	top: 57px;
	right: 10px;
	padding: 15px;
	background-color: #fff;
	box-shadow: 0 1px 20px -10px rgba(32, 33, 36, .28);
`;

export const LogoutItem = styled.div`
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 0.5px solid #d9dadc;
	cursor: pointer;
`;

export const RemoveAcc = styled.div`cursor: pointer;`;
