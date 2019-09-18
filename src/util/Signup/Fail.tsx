import React from 'react';
import { FailModal, FailModalCon, BtnWrapper, OKbtn } from './styled';

interface FailProps {
	toggleFail: Function;
	makeBlankInput: Function;
}

const Fail: React.FC<FailProps> = ({ toggleFail, makeBlankInput }) => {
	return (
		<FailModal>
			<FailModalCon>
				<div>
					<p>Email address already exist!</p>
					<p>Go to login page</p>
				</div>
				<BtnWrapper>
					<OKbtn
						onClick={() => {
							toggleFail();
							makeBlankInput();
						}}
					>
						OK
					</OKbtn>
				</BtnWrapper>
			</FailModalCon>
		</FailModal>
	);
};

export default Fail;
