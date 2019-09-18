import React, { Component } from 'react';
import BoardList from '../../component/BoardList';
import { BoardWrpper, Modal, ModalContent, BoardTitle, CreateBtn, BoardlistWrapper, PlusBtn, Plus } from './styled';

interface BoardProps {
	location: any;
}

interface BoardState {
	boardlist: Array<{ id: number; title: string; user_id: string }>;
	modal: boolean;
	newboardentryTitle: string;
}

class Board extends Component<BoardProps, BoardState> {
	state: BoardState = {
		boardlist: [],
		modal: false,
		newboardentryTitle: ''
	};

	componentDidMount() {
		const { email } = this.props.location.state;
		const token = localStorage.getItem('jwt');
		fetch('http://ec2-52-78-41-28.ap-northeast-2.compute.amazonaws.com:4000/board/boardlist', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: token ? token : ''
			},
			body: JSON.stringify({
				email
			})
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ boardlist: json });
			});
	}

	toggleModal = () => {
		this.state.modal ? this.setState({ modal: false }) : this.setState({ modal: true });
	};

	handleInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ newboardentryTitle: e.target.value });
	};

	addBoardentry = () => {
		const { email } = this.props.location.state;
		const token = localStorage.getItem('jwt');

		fetch('http://ec2-52-78-41-28.ap-northeast-2.compute.amazonaws.com:4000/board/createboardentry', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: token ? token : ''
			},
			body: JSON.stringify({
				email,
				title: this.state.newboardentryTitle
			})
		})
			.then((res) => res.json())
			.then((json) => this.setState({ boardlist: json }));
		this.setState({ newboardentryTitle: '' });
		this.toggleModal();
	};

	updateBoardentry = (board: any, title: string) => {
		const { email } = this.props.location.state;
		const token = localStorage.getItem('jwt');

		fetch('http://ec2-52-78-41-28.ap-northeast-2.compute.amazonaws.com:4000/board/updateboardentrytitle', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: token ? token : ''
			},
			body: JSON.stringify({
				email,
				boardentryId: board.id,
				title
			})
		})
			.then((res) => res.json())
			.then((json) => this.setState({ boardlist: json }));
	};

	deleteBoardentry = (board: any) => {
		const token = localStorage.getItem('jwt');
		const { email } = this.props.location.state;
		fetch('http://ec2-52-78-41-28.ap-northeast-2.compute.amazonaws.com:4000/board/deleteboardentry', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: token ? token : ''
			},
			body: JSON.stringify({
				email,
				boardentryId: board.id
			})
		})
			.then((res) => res.json())
			.then((json) => this.setState({ boardlist: json }));
	};

	render() {
		const { boardlist, modal, newboardentryTitle } = this.state;
		const token = localStorage.getItem('jwt');

		return (
			<BoardWrpper>
				<BoardlistWrapper className="boardList">
					{boardlist.map((board: { title: string }) => (
						<BoardList
							board={board}
							token={token}
							updateBoardentry={this.updateBoardentry}
							deleteBoardentry={this.deleteBoardentry}
						/>
					))}
				</BoardlistWrapper>
				{modal ? (
					<Modal>
						<ModalContent>
							<div>
								<BoardTitle
									value={newboardentryTitle}
									onChange={this.handleInputVal}
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											this.addBoardentry();
										}
									}}
								/>
								<span onClick={this.toggleModal}>&#x2715;</span>
							</div>
							<CreateBtn onClick={this.addBoardentry}>Create Board</CreateBtn>
						</ModalContent>
					</Modal>
				) : (
					<PlusBtn onClick={this.toggleModal} className="createBtn">
						<Plus>+</Plus>
					</PlusBtn>
				)}
			</BoardWrpper>
		);
	}
}

export default Board;
