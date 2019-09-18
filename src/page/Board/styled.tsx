import styled from 'styled-components';

export const BoardWrpper = styled.div`padding: 50px;`;

export const Modal = styled.div`
	position: fixed;
	z-index: 1;
	padding-top: 100px;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalContent = styled.div`
	background-color: #fefefe;
	margin: auto;
	padding: 10px;
	border: 1px solid #888;
	width: 20%;
`;

export const BoardTitle = styled.input`
	width: 230px;
	border: none;
	background-color: #6868686c;
`;

export const CreateBtn = styled.div`
	background-color: #4f88f7;
	border: none;
	color: #fff;
	cursor: pointer;
	width: 100px;
	margin: 8px 8px 0 0;
	padding: 6px 6px;
	text-align: center;
	border-radius: 3px;
	font-size: 14px;
`;
export const BoardlistWrapper = styled.div`display: flex;`;

export const PlusBtn = styled.div`
	position: absolute;
	right: 50px;
	bottom: 30px;
	background-color: #4f88f7;
	box-shadow: 1px 1px 10px 0px #4f88f7;
	width: 40px;
	height: 40px;
	border-radius: 20px;
	cursor: pointer;
`;
export const Plus = styled.span`
	position: relative;
	top: 5px;
	left: 13px;
	color: #fff;
	text-align: center;
	font-size: 20px;
`;
