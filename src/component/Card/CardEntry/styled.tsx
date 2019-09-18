import styled from 'styled-components';

export const Div = styled.div`
	justify-content: flex-start;
	cursor: pointer;
	flex-grow: 8;
`;
export const Wrapper = styled.div`
	display: flex;
	border: 1px solid #d9dadc;
	padding: 10px;
	margin-bottom: 12px;
`;

export const Btns = styled.div`
	font-size: 12px;
	color: #c9cdd0;
	cursor: pointer;
`;
export const EditcardentryWrapper = styled.div`display: flex;`;
export const Input = styled.input`
	width: 240px;
	padding: 5px 3px;
	font-size: 16px;
`;

export const Xbtn = styled.span`
	color: #b7b8bc;
	position: relative;
	right: 10px;
	top: 3px;
	cursor: pointer;
`;
export const Pen = styled.span`
	position: relative;
	right: 10px;
	:hover {
		color: #4f88f7;
	}
`;
export const Trash = styled.span`
	:hover {
		color: #4f88f7;
	}
`;
