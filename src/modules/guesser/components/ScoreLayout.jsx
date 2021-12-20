import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function ScoreLayout(props) {
	const { score } = props;

	return (
		<StyledScoreLayout>
			<div className="prompt-container">
				<div className="prompt-wrapper">
					<p>You got a {score} / 10!</p>
				</div>
			</div>
			<div className="quit-wrapper">
				<Link to="/">
					<button>{'Quit >>'}</button>
				</Link>
			</div>
		</StyledScoreLayout>
	);
}

ScoreLayout.defaultProps = {
	score: 0
};

ScoreLayout.propTypes = {
	score: PropTypes.number
};

const StyledScoreLayout = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	.prompt-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 20px;

		.prompt-wrapper {
			border: 4px solid black;
			border-left: none;
			border-right: none;
			outline: 10px double black;
			border-radius: 4px;
			padding: 0 20px;
		}
	}

	.quit-wrapper {
		position: absolute;
		height: 20px;
		bottom: 8%;
		right: 5%;

		button {
			outline: none;
			background-color: #fff;
			cursor: pointer;
			text-transform: uppercase;
			border: 4px solid #000;
			padding: 8px;
			margin-bottom: 4px;
			animation: blinker 1s linear infinite;

			&:hover {
				animation: none;
			}
		}
	}
`;

export default ScoreLayout;
