import React from 'react';
import { WelcomeModal, WelcomeModalCon, BtnWrapper, OKbtn } from './styled';

interface WelcomeProps {
	toggleSuccess: Function;
	makeBlankInput: Function;
}

const Welcome: React.FC<WelcomeProps> = ({ toggleSuccess, makeBlankInput }) => {
	return (
		<WelcomeModal>
			<WelcomeModalCon>
				<div>
					<p>Welcome to Greentea!</p>
				</div>
				<BtnWrapper>
					<OKbtn
						onClick={() => {
							toggleSuccess();
							makeBlankInput();
						}}
					>
						OK
					</OKbtn>
				</BtnWrapper>
			</WelcomeModalCon>
		</WelcomeModal>
	);
};

export default Welcome;
