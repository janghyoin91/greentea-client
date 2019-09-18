import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable } from 'react-beautiful-dnd';
import { Div, Wrapper, Btns, EditcardentryWrapper, Input, Xbtn, Pen, Trash } from './styled';
interface CardEntryProps {
	card: any;
	detail: any;
	index: number;
	deleteCardentry: Function;
	updateCardentryTitle: Function;
}

interface CardEntryState {
	editcardentry: boolean;
	editedtitle: string;
	displayIcons: boolean;
}

class CardEntry extends Component<CardEntryProps, CardEntryState> {
	constructor(props: CardEntryProps) {
		super(props);

		this.state = {
			editcardentry: false,
			editedtitle: this.props.detail.title,
			displayIcons: false
		};
	}

	toggleEditcardentry = () => {
		this.state.editcardentry ? this.setState({ editcardentry: false }) : this.setState({ editcardentry: true });
	};

	displayIconsTrue = () => {
		this.setState({ displayIcons: true });
	};
	displayIconsFalse = () => {
		this.setState({ displayIcons: false });
	};

	changeInputValue = (e: any) => {
		this.setState({ editedtitle: e.target.value });
	};

	pressEnterKey = async () => {
		const { card, detail, updateCardentryTitle } = this.props;
		const { editedtitle } = this.state;

		await updateCardentryTitle(card.id, detail.id, editedtitle);
		await this.setState({ editcardentry: false });
		await this.setState({ editedtitle: editedtitle });
	};

	render() {
		const { card, detail, index, deleteCardentry } = this.props;
		const { editcardentry, editedtitle } = this.state;

		return (
			<Draggable draggableId={detail.id} index={index}>
				{(provided) => (
					<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
						{editcardentry ? (
							<EditcardentryWrapper>
								<Input
									value={editedtitle}
									onChange={this.changeInputValue}
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											this.pressEnterKey();
										}
									}}
								/>
								<Xbtn onClick={this.toggleEditcardentry}>&#x2715;</Xbtn>
							</EditcardentryWrapper>
						) : (
							<Wrapper onMouseOver={this.displayIconsTrue}>
								<Div>{detail.title}</Div>
								{this.state.displayIcons ? (
									<Btns>
										<Pen
											onClick={this.toggleEditcardentry}
											onMouseOver={this.displayIconsTrue}
											onMouseOut={this.displayIconsFalse}
										>
											<FontAwesomeIcon icon="pen" />
										</Pen>
										<Trash
											onClick={() => deleteCardentry(card.id, detail)}
											onMouseOver={this.displayIconsTrue}
											onMouseOut={this.displayIconsFalse}
										>
											<FontAwesomeIcon icon="trash-alt" />
										</Trash>
									</Btns>
								) : null}
							</Wrapper>
						)}
					</div>
				)}
			</Draggable>
		);
	}
}

export default CardEntry;
