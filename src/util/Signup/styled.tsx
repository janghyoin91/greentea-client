import styled from 'styled-components';

export const SmallTitle = styled.div`
	font-weight: bold;
	font-size: 18px;
`;

export const GotoLogin = styled.div`
	color: #d9dadc;
	text-decoration: underline;
	margin-bottom: 10px;
	cursor: pointer;
`;

export const UserInfoWrapper = styled.div`margin-bottom: 10px;`;

export const UserInput = styled.input`
	width: 95%;
	padding: 5px 3px;
	margin-bottm: 5px;
`;

export const CnaBtn = styled.div`
	background-color: #4f88f7;
	border: none;
	color: #fff;
	cursor: pointer;
	padding: 9px 24px;
	text-align: center;
	border-radius: 3px;
	font-size: 14px;
`;

export const FailModal = styled.div`
	position: fixed;
	z-index: 99;
	padding-top: 100px;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.7);
	cursor: default;
`;

export const FailModalCon = styled.div`
	background-color: #f4f5f7;
	margin: auto;
	padding: 15px 60px;
	border: 1px solid #888;
	border-radius: 3px;
	width: 300px;
	box-shadow: 0 1px 20px -10px rgba(32, 33, 36, .28);
	text-align: center;
`;

export const BtnWrapper = styled.div`padding: 0 50px;`;

export const OKbtn = styled.div`
	background-color: #4f88f7;
	border: none;
	color: #fff;
	cursor: pointer;
	margin: 8px 8px 0 0;
	padding: 6px 12px;
	text-align: center;
	border-radius: 3px;
	font-size: 14px;
`;

export const WelcomeModal = styled.div`
	position: fixed;
	z-index: 99;
	padding-top: 100px;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.7);
	cursor: default;
`;

export const WelcomeModalCon = styled.div`
	background-color: #f4f5f7;
	margin: auto;
	padding: 15px 20px;
	border: 1px solid #888;
	border-radius: 3px;
	width: 300px;
	box-shadow: 0 1px 20px -10px rgba(32, 33, 36, .28);
	text-align: center;
`;
