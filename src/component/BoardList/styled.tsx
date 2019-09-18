import styled from 'styled-components';

export const BoardentryLink = styled.div`
	padding: 10px;
	background-color: white;
	box-shadow: 1px 1px 20px -10px rgba(32, 33, 36, .28);
	color: #b7b8bc;
	margin-right: 20px;
	width: 200px;
	height: 104px;
	border-radius: 3px;
`;
export const TitleWrapper = styled.div`
	display: flex;
	color: #d9dadc;
`;
export const Circle = styled.span`
	color: #d9dadc;
	fornt-weight: bold;
	margin-right: 8px;
`;

export const Title = styled.div`
	font-weight: bold;
	text-decoration: none;
	margin-bottom: 68px;
	:hover {
		color: #4f88f7;
	}
`;

export const TitleEdit = styled.input`
	margin-bottom: 68px;
	position: relative;
	top: 3px;
`;

export const EditClose = styled.div`
	float: right;
	cursor: pointer;
`;
export const Icons = styled.div`
	float: right;
	font-size: 13px;
`;

export const Pen = styled.span`
	position: relative;
	right: 10px;
	cursor: pointer;
	:hover {
		color: #4f88f7;
	}
`;
export const Trash = styled.span`
	cursor: pointer;
	:hover {
		color: #4f88f7;
	}
`;
