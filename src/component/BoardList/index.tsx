import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BoardentryLink, TitleWrapper, Circle, Title, TitleEdit, EditClose, Icons, Pen, Trash } from './styled';

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
