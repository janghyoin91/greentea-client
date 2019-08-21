import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Card from '../Card';

const Div = styled.div`padding: 20px 40px;`;

const CardFlex = styled.div`display: flex;`;

const BoardTitle = styled.div`
	font-size: 20px;
	margin-bottom: 20px;
`;

const AddlistBtn = styled.span`
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

const AddlistInput = styled.input`
	margin-bottom: 10px;
	width: 230px;
	padding: 5px 3px;
`;

const CloseAddlist = styled.span`
	font-size: 20px;
	font-weight: bold;
	color: #b7b8bc;
	cursor: pointer;
`;
const Createlist = styled.span`
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

const Modal = styled.div`
	background: #dbd8d825;
	width: 240px;
	height: 70px;
	padding: 6px;
`;

interface BoardEntryProps {
	location: any;
	token: any;
}

interface BoardEntryState {
	cardlist: Array<{ id: number; board_id: number; title: string; index: number }>;
	cardentrylist: Array<{ id: number; card_container_id: number; title: string; index: number }>;
	addlistBtn: boolean;
	newcardtitle: string;
}

class BoardEntry extends Component<BoardEntryProps, BoardEntryState> {
	constructor(props: BoardEntryProps) {
		super(props);

		this.state = {
			cardlist: [],
			cardentrylist: [],
			addlistBtn: false,
			newcardtitle: ''
		};
	}

	componentDidMount = async () => {
		const { token } = this.props.location.state;
		await fetch('http://localhost:4000/cardlist', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			},
			body: JSON.stringify({
				boardId: this.props.location.state.board.id
			})
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ cardlist: json.sort(this.compare) });
			});

		await fetch('http://localhost:4000/cardentrylist', {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ cardentrylist: json });
			});
	};

	fetchUpdateCardlist = (
		draggableId: number,
		destination: { droppableId: string; index: number },
		source: { droppableId: string; index: number }
	) => {
		const { token } = this.props.location.state;

		fetch('http://localhost:4000/updateCardlist', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			},
			body: JSON.stringify({
				board: this.props.location.state.board,
				destination: destination,
				source: source,
				draggableId: draggableId
			})
		});
	};

	fetchUpdateCardentrylistInOneColumn = (
		draggableId: number,
		destination: { droppableId: number; index: number },
		source: { droppableId: number; index: number }
	) => {
		const { token } = this.props.location.state;

		fetch('http://localhost:4000/updateCardentrylistInOneColumn', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			},
			body: JSON.stringify({
				destination: destination,
				source: source,
				draggableId: draggableId
			})
		});
	};

	fetchUpdateCardentrylistInTwoColumn = (
		draggableId: number,
		destination: { droppableId: number; index: number },
		source: { droppableId: number; index: number }
	) => {
		const { token } = this.props.location.state;

		//실패시 alert띄우기
		fetch('http://localhost:4000/updateCardentrylistInTwoColumn', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			},
			body: JSON.stringify({
				destination: destination,
				source: source,
				draggableId: draggableId
			})
		});
	};

	compare = (a: any, b: any) => {
		return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
	};

	handleCard = (
		draggableId: number,
		destination: { droppableId: string; index: number },
		source: { droppableId: string; index: number }
	) => {
		const { cardlist } = this.state;
		let startPoint = source.index;
		let endPoint = destination.index;
		let tempArr = cardlist.slice(0);

		if (startPoint < endPoint) {
			for (let j = startPoint + 1; j <= endPoint; j++) {
				tempArr[j].index = tempArr[j].index - 1;
			}
		} else if (startPoint > endPoint) {
			for (let i = endPoint; i < startPoint; i++) {
				tempArr[i].index = tempArr[i].index + 1;
			}
		}
		tempArr[startPoint].index = endPoint;
		this.setState({ cardlist: tempArr.sort(this.compare) });
		this.fetchUpdateCardlist(draggableId, destination, source);
	};

	handleCardEntryInOneColumn = (
		draggableId: number,
		destination: { droppableId: number; index: number },
		source: { droppableId: number; index: number }
	) => {
		const { cardentrylist } = this.state;
		let startPoint = source.index;
		let endPoint = destination.index;
		let cardId = destination.droppableId;
		let tempArr: any = [];
		let entrylist = cardentrylist
			.filter(
				(item: { id: number; card_container_id: number; title: string; index: number }) =>
					item.card_container_id === cardId
			)
			.sort(this.compare);

		cardentrylist.forEach((item: { id: number; card_container_id: number; title: string; index: number }) => {
			if (item.card_container_id !== cardId) {
				tempArr.push(item);
			}
		});

		if (startPoint < endPoint) {
			for (let j = startPoint + 1; j <= endPoint; j++) {
				entrylist[j].index = entrylist[j].index - 1;
			}
		} else if (startPoint > endPoint) {
			for (let i = endPoint; i < startPoint; i++) {
				entrylist[i].index = entrylist[i].index + 1;
			}
		}

		entrylist[startPoint].index = endPoint;
		entrylist.forEach((item: { id: number; card_container_id: number; title: string; index: number }) => {
			tempArr.push(item);
		});
		this.setState({ cardentrylist: tempArr });

		this.fetchUpdateCardentrylistInOneColumn(draggableId, destination, source);
	};

	handleCardEntryInTwoColumn = (
		draggableId: number,
		destination: { droppableId: number; index: number },
		source: { droppableId: number; index: number }
	) => {
		const { cardentrylist } = this.state;
		let startPoint = source.index;
		let endPoint = destination.index;
		let homeId = source.droppableId;
		let newplaceId = destination.droppableId;
		let tempArr: any = [];
		let homelist = cardentrylist
			.filter(
				(item: { id: number; card_container_id: number; title: string; index: number }) =>
					item.card_container_id === homeId
			)
			.sort(this.compare);
		let newplacelist = cardentrylist
			.filter((item: any) => item.card_container_id === newplaceId)
			.sort(this.compare);

		cardentrylist.forEach((item: { id: number; card_container_id: number; title: string; index: number }) => {
			if (item.card_container_id !== homeId && item.card_container_id !== newplaceId) {
				tempArr.push(item);
			}
		});

		for (let i = startPoint + 1; i < homelist.length; i++) {
			homelist[i].index = homelist[i].index - 1;
		}

		for (let j = endPoint + 1; j < newplacelist.length; j++) {
			newplacelist[j].index = newplacelist[j].index + 1;
		}

		homelist[startPoint].card_container_id = newplaceId;
		homelist[startPoint].index = endPoint;

		homelist.forEach((item: { id: number; card_container_id: number; title: string; index: number }) => {
			tempArr.push(item);
		});
		newplacelist.forEach((item: { id: number; card_container_id: number; title: string; index: number }) => {
			tempArr.push(item);
		});
		this.setState({ cardentrylist: tempArr });

		this.fetchUpdateCardentrylistInTwoColumn(draggableId, destination, source);
	};

	onDragEnd = (result: any) => {
		console.log(result);
		const { draggableId, destination, source, type } = result;
		console.log(typeof draggableId);
		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === 'card') {
			console.log('move card!!!');
			this.handleCard(draggableId, destination, source);
		} else if (type === 'cardentry') {
			console.log('move cardentry!!!');
			if (source.droppableId === destination.droppableId) {
				console.log('한 card 내에서 이동했을 때');
				this.handleCardEntryInOneColumn(draggableId, destination, source);
			} else {
				console.log('두 card 사이에서 이동했을 떄');
				this.handleCardEntryInTwoColumn(draggableId, destination, source);
			}
		}
	};

	changeAddlistBtn = () => {
		this.state.addlistBtn
			? this.setState({ addlistBtn: false, newcardtitle: '' })
			: this.setState({ addlistBtn: true });
	};

	changeNewcardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ newcardtitle: e.target.value });
		console.log(this.state.newcardtitle);
	};

	addCard = () => {
		const { board, token } = this.props.location.state;

		fetch('http://localhost:4000/addcard', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: token
			},
			body: JSON.stringify({
				board: board,
				cardtitle: this.state.newcardtitle
			})
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ cardlist: json });
			});
		this.changeAddlistBtn();
	};

	addCardentry = (cardId: number, value: string) => {
		const { token } = this.props.location.state;

		fetch('http://localhost:4000/addcardentry', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: token
			},
			body: JSON.stringify({
				cardId: cardId,
				entryTitle: value
			})
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ cardentrylist: json });
			});
	};

	updateCardentryTitle = (cardId: any, cardentryId: any, newtitle: string) => {
		const { token } = this.props.location.state;

		fetch('http://localhost:4000/updatecardentrytitle', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: token
			},
			body: JSON.stringify({
				cardId: cardId,
				cardentryId: cardentryId,
				newTitle: newtitle
			})
		})
			.then((res) => res.json())
			.then((json) => {
				console.log('모햐모햐~!');
				console.log(json);
				this.setState({ cardentrylist: json });
			});
	};

	deleteCardentry = (cardId: number, cardentry: any) => {
		const { token } = this.props.location.state;

		fetch('http://localhost:4000/deletecardentry', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: token
			},
			body: JSON.stringify({
				cardId: cardId,
				cardentry: cardentry
			})
		})
			.then((res) => res.json())
			.then((json) => this.setState({ cardentrylist: json }));
	};

	updateCardTitle = (cardId: number, editedtitle: string) => {
		const { board, token } = this.props.location.state;

		fetch('http://localhost:4000/updatecardtitle', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: token
			},
			body: JSON.stringify({
				boardId: board.id,
				cardId: cardId,
				newTitle: editedtitle
			})
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ cardlist: json });
			});
	};
	deleteCard = (cardId: number) => {
		const { board, token } = this.props.location.state;
		fetch('http://localhost:4000/deletecard', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				authorization: token
			},
			body: JSON.stringify({
				boardId: board.id,
				cardId: cardId
			})
		})
			.then((res) => res.json())
			.then((json) => this.setState({ cardlist: json }));
	};

	pressEnterKey = () => {
		this.addCard();
		this.changeAddlistBtn();
	};

	render() {
		const { board, token } = this.props.location.state;
		console.log('!board!!!!', board);
		const { cardlist, cardentrylist, addlistBtn } = this.state;

		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="boardentry" direction="horizontal" type="card">
					{(provided) => (
						<Div {...provided.droppableProps} ref={provided.innerRef}>
							<BoardTitle>{board.title}</BoardTitle>
							<CardFlex>
								{cardlist.map(
									(
										el: { id: number; board_id: number; title: string; index: number },
										index: number
									) => (
										<Card
											card={el}
											index={index}
											cardentrylist={cardentrylist}
											addCardentry={this.addCardentry}
											deleteCard={this.deleteCard}
											deleteCardentry={this.deleteCardentry}
											updateCardTitle={this.updateCardTitle}
											updateCardentryTitle={this.updateCardentryTitle}
										/>
									)
								)}

								{addlistBtn ? (
									<Modal>
										<AddlistInput
											value={this.state.newcardtitle}
											onChange={this.changeNewcardTitle}
											onKeyPress={(e) => {
												if (e.key === 'Enter') {
													this.pressEnterKey();
												}
											}}
										/>
										<div>
											<Createlist onClick={this.addCard}>Add List</Createlist>
											<CloseAddlist onClick={this.changeAddlistBtn}>&#x2715;</CloseAddlist>
										</div>
									</Modal>
								) : (
									<AddlistBtn onClick={this.changeAddlistBtn}>
										<Plus>+</Plus>
									</AddlistBtn>
								)}
							</CardFlex>

							{provided.placeholder}
						</Div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

export default BoardEntry;
