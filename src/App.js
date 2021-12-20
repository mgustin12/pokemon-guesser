import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MainLayout } from './modules/core/components';
import { HashRouter } from 'react-router-dom';

function App() {
	return (
		<StyledApp>
			<GlobalStyle />
			<HashRouter>
				<MainLayout />
			</HashRouter>
		</StyledApp>
	);
}

const StyledApp = styled.div`
	max-width: 1024px;
	min-height: 350px;
	margin: 0 auto;
	background: #fff;
	position: relative;
	aspect-ratio: 3/2;
	top: 10%;
	border: 2px solid black;
	border-radius: 4px;
`;

const GlobalStyle = createGlobalStyle`
	html, body, #root {
		height: 100%;
	}

	body {
		margin: 0;
		background-color: #000;
	}

	#root {
		background-image: url("/img/background.png");
		background-repeat: repeat;
		background-size: 500px;
		background-color: #000;
		min-width: 550px;
	}

	* {
		outline: none;
		font-family: 'Press Start 2P', cursive;
	}

	@keyframes blinker {
		50% {
			opacity: 0;
		}
	}
`;

export default App;
