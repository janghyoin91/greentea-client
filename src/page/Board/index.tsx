import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BoardList from '../../component/BoardList';

const BoardWrpper = styled.div`padding: 50px;`;

const Modal = styled.div`
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

const ModalContent = styled.div`
	background-color: #fefefe;
	margin: auto;
	padding: 10px;
	border: 1px solid #888;
	width: 20%;
`;

const BoardTitle = styled.input`
	width: 230px;
	border: none;
	background-color: #6868686c;
`;

const CreateBtn = styled.div`
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
const BoardlistWrapper = styled.div`display: flex;`;

const PlusBtn = styled.div`
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
const Plus = styled.span`
	position: relative;
	top: 5px;
	left: 13px;
	color: #fff;
	text-align: center;
	font-size: 20px;
`;
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
		console.log('~~~~~~~~~~~~~~~~~~~!!~!~@~#!#');
		const { email } = this.props.location.state;
		const token = localStorage.getItem('jwt');
		fetch('http://localhost:4000/boardlist', {
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

		fetch('http://localhost:4000/createboardentry', {
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

		fetch('http://localhost:4000/updateboardentrytitle', {
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
		fetch('http://localhost:4000/deleteboardentry', {
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
		const { token } = this.props.location.state;
		const { boardlist, modal, newboardentryTitle } = this.state;
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
