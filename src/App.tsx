import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './component/Header';
import Board from './page/Board';
import BoardEntry from './component/BoardEntry';
import Login from './util/Login';
import Signup from './util/Signup';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faEllipsisH, faPen, faTrashAlt, faPlus, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
library.add(fab, faSearch, faEllipsisH, faPen, faTrashAlt, faPlus, faUser, faKey);

const GlobalStyle = createGlobalStyle`
  body {
	padding: 0;
	margin: 0;
	background-color: #f6f7fb;
	width:100%;
	height:100%;
  }
`;
const HeaderDiv = styled.div`background-color: white;`;
const Body = styled.div``;

const App: React.FC = () => {
	return (
		<Router>
			<GlobalStyle />
			<HeaderDiv className="header">
				<Switch>
					<Route path="/:name/board" component={Header} />
					<Route path="/boardentry/:title" component={Header} />
				</Switch>
			</HeaderDiv>
			<Body className="body">
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/:name/board" component={Board} />
					<Route path="/boardentry/:title" component={BoardEntry} />
				</Switch>
			</Body>
		</Router>
	);
};

export default App;
