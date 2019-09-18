import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardEntry from './CardEntry';
import {
	Div,
	Imsi,
	CardTitle,
	Addcard,
	Flex,
	Flex1,
	Circle,
	Ellipsis,
	AddcardWrapper,
	AddcardBtn,
	Input,
	X,
	EditTitleDiv,
	EditTitleX
} from './styled';

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
										{filteredList.length !== 0 ? (
											filteredList.map((el: any, index: number) => (
												<CardEntry
													card={card}
													detail={el}
													index={index}
													deleteCardentry={deleteCardentry}
													updateCardentryTitle={updateCardentryTitle}
												/>
											))
										) : (
											<Imsi />
										)}
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
