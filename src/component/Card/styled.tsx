import styled from 'styled-components';

export const Div = styled.div`
	margin-right: 20px;
	padding: 0 10px;
	background-color: white;
	box-shadow: 1px 1px 20px -10px rgba(32, 33, 36, .28);
	width: 240px;
`;

export const Imsi = styled.div`height: 20px;`;

export const CardTitle = styled.span`cursor: pointer;`;

export const Addcard = styled.div`
	padding: 6px 0 18px 0;
	text-align: center;
	font-size: 14px;
	color: #b7b8bc;
	cursor: pointer;

	:hover {
		color: #4f88f7;
	}
`;

export const Flex = styled.div`
	display: flex;
	padding: 25px 0;
`;

export const Flex1 = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-grow: 8;
`;

export const Circle = styled.span`
	color: #d9dadc;
	fornt-weight: bold;
	margin-right: 8px;
`;

export const Ellipsis = styled.span`
	color: #d9dadc;
	justify-content: flex-end;
	cursor: pointer;
	flex-grow: 1;
`;

export const AddcardWrapper = styled.div`
	padding-bottom: 20px;
	cursor: default;
`;

export const AddcardBtn = styled.span`
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

export const Input = styled.input`
	width: 213px;
	margin-bottom: 10px;
	padding: 5px 3px;
	font-size: 16px;
`;

export const X = styled.span`
	font-size: 20px;
	font-weight: bold;
	color: #b7b8bc;
	cursor: pointer;
`;

export const EditTitleDiv = styled.div`display: flex;`;
export const EditTitleX = styled.span`
	position: relative;
	right: 20px;
	top: 4px;
	cursor: pointer;
	color: #b7b8bc;
`;
