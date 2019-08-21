import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardEntry from './CardEntry';
import memoize from 'memoize-one';

const Div = styled.div`
	margin-right: 20px;
	padding: 0 10px;
	background-color: white;
	box-shadow: 1px 1px 20px -10px rgba(32, 33, 36, .28);
	width: 240px;
`;

const CardTitle = styled.span`cursor: pointer;`;

const Addcard = styled.div`
	padding: 6px 0 18px 0;
	text-align: center;
	font-size: 14px;
	color: #b7b8bc;
	cursor: pointer;

	:hover {
		color: #4f88f7;
	}
`;

const Flex = styled.div`
	display: flex;
	padding: 25px 0;
`;
const Flex1 = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-grow: 8;
`;

const Circle = styled.span`
	color: #d9dadc;
	fornt-weight: bold;
	margin-right: 8px;
`;

const Ellipsis = styled.span`
	color: #d9dadc;
	justify-content: flex-end;
	cursor: pointer;
	flex-grow: 1;
`;

const AddcardWrapper = styled.div`
	padding-bottom: 20px;
	cursor: default;
`;

const AddcardBtn = styled.span`
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

const Input = styled.input`
	width: 213px;
	margin-bottom: 10px;
	padding: 5px 3px;
	font-size: 16px;
`;

const X = styled.span`
	font-size: 20px;
	font-weight: bold;
	color: #b7b8bc;
	cursor: pointer;
`;

const EditTitleDiv = styled.div`display: flex;`;
const EditTitleX = styled.span`
	position: relative;
	right: 20px;
	top: 4px;
	cursor: pointer;
	color: #b7b8bc;
`;

interface CardProps {
	card: any;
	index: number;
	cardentrylist: any;
	addCardentry: Function;
	deleteCard: Function;
	deleteCardentry: Function;
	updateCardTitle: Function;
	updateCardentryTitle: Function;
}

interface CardState {
	addcard: boolean;
	newcardentrytitle: string;
	editcardtitle: boolean;
	modifiedcardtitle: string;
}

class Card extends Component<CardProps, CardState> {
	constructor(props: CardProps) {
		super(props);

		this.state = {
			addcard: false,
			newcardentrytitle: '',
			editcardtitle: false,
			modifiedcardtitle: this.props.card.title
		};
	}

	// toggleCircle = () => {
	// 	this.state.circle ? this.setState({ circle: false }) : this.setState({ circle: true });
	// };

	changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (this.state.addcard) {
			this.setState({ newcardentrytitle: e.target.value });
		} else if (this.state.editcardtitle) {
			this.setState({ modifiedcardtitle: e.target.value });
		}
	};

	changeAddcard = () => {
		this.state.addcard ? this.setState({ addcard: false }) : this.setState({ addcard: true });
	};

	toggleEditcardtitle = () => {
		this.state.editcardtitle ? this.setState({ editcardtitle: false }) : this.setState({ editcardtitle: true });
	};

	onclickAddcardBtn = () => {
		const { card, addCardentry } = this.props;
		const { newcardentrytitle } = this.state;
		addCardentry(card.id, newcardentrytitle);
		this.changeAddcard();
		this.setState({ newcardentrytitle: '' });
	};

	onKeyPressCardTitle = () => {
		const { card, updateCardTitle } = this.props;
		const { modifiedcardtitle } = this.state;
		updateCardTitle(card.id, modifiedcardtitle);
		this.toggleEditcardtitle();
		this.setState({ modifiedcardtitle: modifiedcardtitle });
	};

	pressEnterKeyAddCardentry = () => {
		const { card, addCardentry } = this.props;
		const { newcardentrytitle } = this.state;
		addCardentry(card.id, newcardentrytitle);
		this.changeAddcard();
		this.setState({ newcardentrytitle: '' });
	};

	render() {
		const {
			card,
			index,
			cardentrylist,
			addCardentry,
			deleteCard,
			deleteCardentry,
			updateCardentryTitle
		} = this.props;
		const { addcard, newcardentrytitle, modifiedcardtitle } = this.state;

		const compare = (a: any, b: any) => {
			return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
		};
		const filter = (list: any, card: any) =>
			list.filter((cardentry: any) => cardentry.card_container_id === card.id);
		const filteredList = filter(cardentrylist, card).sort(compare);

		return (
			<Draggable draggableId={card.id} index={index}>
				{(provided) => (
					<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
						<Div>
							<Flex>
								<Flex1>
									<Circle>ο</Circle>
									{this.state.editcardtitle ? (
										<EditTitleDiv>
											<Input
												value={modifiedcardtitle}
												onChange={this.changeTitle}
												onKeyPress={(e) => {
													if (e.key === 'Enter') {
														console.log('여기여깅!!');
														this.onKeyPressCardTitle();
													}
												}}
											/>
											<EditTitleX onClick={this.toggleEditcardtitle}>&#x2715;</EditTitleX>
										</EditTitleDiv>
									) : (
										<CardTitle onClick={this.toggleEditcardtitle}>{card.title}</CardTitle>
									)}
								</Flex1>
								{this.state.editcardtitle ? null : (
									<Ellipsis onClick={() => deleteCard(card.id)}>
										<FontAwesomeIcon icon="ellipsis-h" />
									</Ellipsis>
								)}
							</Flex>
							<Droppable droppableId={card.id} type="cardentry">
								{(provided) => (
									<div {...provided.droppableProps} ref={provided.innerRef}>
										{filteredList.map((el: any, index: number) => (
											<CardEntry
												card={card}
												detail={el}
												index={index}
												deleteCardentry={deleteCardentry}
												updateCardentryTitle={updateCardentryTitle}
											/>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
							{addcard ? (
								<AddcardWrapper>
									<Input
										value={newcardentrytitle}
										onChange={this.changeTitle}
										onKeyPress={(e) => {
											if (e.key === 'Enter') {
												this.pressEnterKeyAddCardentry();
											}
										}}
									/>
									<div>
										<AddcardBtn onClick={this.onclickAddcardBtn}>Add card</AddcardBtn>
										<X onClick={this.changeAddcard}>&#x2715;</X>
									</div>
								</AddcardWrapper>
							) : (
								<Addcard onClick={this.changeAddcard}>Add card</Addcard>
							)}
						</Div>
					</div>
				)}
			</Draggable>
		);
	}
}

export default Card;
