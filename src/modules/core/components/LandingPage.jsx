import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function LandingPage() {
	return (
		<StyledLandingPage>
			<div className="logo-wrapper">
				<img alt="logo" src="/img/logo.png" />
			</div>
			<div className="promo-wrapper">
				<img alt="promo" src="/img/ashwalk.gif" height="150px" />
			</div>
			<div className="action-wrapper">
				<Link className="start-btn" to="guesser">
					<p>Start</p>
				</Link>
			</div>
		</StyledLandingPage>
	);
}

const StyledLandingPage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	background-color: #ffcd00;

	.logo-wrapper,
	.promo-wrapper {
		max-height: 15%;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	.logo-wrapper {
		margin-bottom: 5%;
	}

	.promo-wrapper {
		margin-bottom: 8%;
	}

	.start-btn {
		text-decoration: none;
		color: #000;

		p {
			font-size: 1.5vw;
			animation: blinker 1s linear infinite;
		}

		&:hover {
			p {
				animation: none;
			}
		}
	}
`;

export default LandingPage;
