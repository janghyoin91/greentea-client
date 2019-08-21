import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable } from 'react-beautiful-dnd';

const Div = styled.div`
	justify-content: flex-start;
	cursor: pointer;
	flex-grow: 8;
`;
const Wrapper = styled.div`
	display: flex;
	border: 1px solid #d9dadc;
	padding: 10px;
	margin-bottom: 12px;
`;

const Btns = styled.div`
	font-size: 12px;
	color: #c9cdd0;
	cursor: pointer;
`;
const EditcardentryWrapper = styled.div`display: flex;`;
const Input = styled.input`
	width: 240px;
	padding: 5px 3px;
	font-size: 16px;
`;

const Xbtn = styled.span`
	color: #b7b8bc;
	position: relative;
	right: 10px;
	top: 3px;
	cursor: pointer;
`;
const Pen = styled.span`
	position: relative;
	right: 10px;
	:hover {
		color: #4f88f7;
	}
`;
const Trash = styled.span`
	:hover {
		color: #4f88f7;
	}
`;

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
		const { card, detail, index, deleteCardentry, updateCardentryTitle } = this.props;
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
