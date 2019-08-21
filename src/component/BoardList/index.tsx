import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BoardentryLink = styled.div`
	padding: 10px;
	background-color: white;
	box-shadow: 1px 1px 20px -10px rgba(32, 33, 36, .28);
	color: #b7b8bc;
	margin-right: 20px;
	width: 200px;
	height: 104px;
	border-radius: 3px;
`;
const TitleWrapper = styled.div`
	display: flex;
	color: #d9dadc;
`;
const Circle = styled.span`
	color: #d9dadc;
	fornt-weight: bold;
	margin-right: 8px;
`;

const Title = styled.div`
	font-weight: bold;
	text-decoration: none;
	margin-bottom: 68px;
	:hover {
		color: #4f88f7;
	}
`;

const TitleEdit = styled.input`
	margin-bottom: 68px;
	position: relative;
	top: 3px;
`;

const EditClose = styled.div`
	float: right;
	cursor: pointer;
`;
const Icons = styled.div`
	float: right;
	font-size: 13px;
`;

const Pen = styled.span`
	position: relative;
	right: 10px;
	cursor: pointer;
	:hover {
		color: #4f88f7;
	}
`;
const Trash = styled.span`
	cursor: pointer;
	:hover {
		color: #4f88f7;
	}
`;

interface BoardListProps {
	board: any;
	token: any;
	updateBoardentry: Function;
	deleteBoardentry: Function;
}

interface BoardListState {
	edit: boolean;
	inputvalue: string;
}

class BoardList extends Component<BoardListProps, BoardListState> {
	constructor(props: BoardListProps) {
		super(props);

		this.state = {
			edit: false,
			inputvalue: this.props.board.title
		};
	}

	toggleEdit = () => {
		this.state.edit ? this.setState({ edit: false }) : this.setState({ edit: true });
	};

	changeInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ inputvalue: e.target.value });
	};

	render() {
		const { board, token, updateBoardentry, deleteBoardentry } = this.props;
		const { edit, inputvalue } = this.state;
		return (
			<BoardentryLink>
				<Link
					to={{
						pathname: `/boardentry/${board.title}`,
						state: {
							board,
							token
						}
					}}
					style={{ textDecoration: 'none' }}
				>
					<TitleWrapper>
						<Circle>ο</Circle>
						{edit ? (
							<TitleEdit
								value={inputvalue}
								onChange={this.changeInputVal}
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										updateBoardentry(board, inputvalue);
										this.toggleEdit();
									}
								}}
							/>
						) : (
							<Title>{board.title}</Title>
						)}
					</TitleWrapper>{' '}
				</Link>
				{edit ? (
					<EditClose onClick={this.toggleEdit}>&#x2715;</EditClose>
				) : (
					<Icons>
						<Pen onClick={this.toggleEdit}>
							<FontAwesomeIcon icon="pen" />
						</Pen>
						<Trash onClick={() => deleteBoardentry(board)}>
							<FontAwesomeIcon icon="trash-alt" />
						</Trash>
					</Icons>
				)}
			</BoardentryLink>
		);
	}
}

export default BoardList;
