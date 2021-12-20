import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ArenaLayout(props) {
	const {
		currentPokemon,
		round,
		changeRound,
		scorecard,
		updateScorecard,
		changeFinished
	} = props;
	const [guess, changeGuess] = useState(null);
	const [timeLeft, setTimeLeft] = useState(5);

	const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

	const onGuess = id => {
		if (guess) return;

		changeGuess(id);
	};

	const getNewScorecard = () => {
		let newScorecard = scorecard.slice(0);
		newScorecard[round - 1] = {
			...newScorecard[round - 1],
			guessed: true,
			correct: guess === currentPokemon.id
		};

		return newScorecard;
	};

	const renderOptionItem = (option, index) => {
		const { id, name } = option;

		let isCurrentPokemon = id === currentPokemon.id;

		return (
			<div key={index} className="option-item" onClick={e => onGuess(id)}>
				<div
					className={`pointer ${
						guess === id ? 'selected' : 'not-selected'
					}`}
				/>
				<p
					className={`name ${
						guess && !isCurrentPokemon && 'incorrect'
					}`}
				>
					{capitalize(name)}
				</p>
			</div>
		);
	};

	const renderOptionList = () => {
		const { options } = currentPokemon;

		return (
			<div className="option-list">{options.map(renderOptionItem)}</div>
		);
	};

	const renderGuessItems = () => {
		return scorecard
			.map((entry, index) => {
				const { round: entryRound, guessed, correct } = entry;

				let className = '';
				if (round === entryRound) {
					className = 'current';
				} else if (guessed) {
					if (correct) {
						className = 'correct';
					} else {
						className = 'incorrect';
					}
				} else {
					className = 'pending';
				}

				return (
					<div key={index} className={`guess-item ${className}`}>
						<img alt="pokeball" src="img/pokeball.png" />
					</div>
				);
			})
			.reverse();
	};

	const renderNextBtn = () => {
		if (!guess) return null;

		if (round < 10) {
			return (
				<button
					className="next-btn"
					onClick={() => {
						changeGuess(null);
						changeRound(round + 1);
						setTimeLeft(5);
						updateScorecard(getNewScorecard());
					}}
				>
					{'Next >>'}
				</button>
			);
		} else {
			return (
				<button
					className="next-btn"
					onClick={() => {
						updateScorecard(getNewScorecard());
						changeFinished(true);
					}}
				>
					{'FINISH >>'}
				</button>
			);
		}
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft(timeLeft => {
				if (timeLeft > 0) {
					return (timeLeft - 0.01).toFixed(2);
				} else {
					changeGuess(900);
					return timeLeft;
				}
			});
		}, 10);

		if (guess) {
			clearInterval(intervalId);
		}

		return () => clearInterval(intervalId);
	}, [guess, changeGuess]);

	return (
		<StyledArenaLayout>
			<div className="arena-container">
				<div className="opponent-container">
					<div className="guesses-container">
						<div className="guesses-wrapper">
							<div className="guess-list">
								{renderGuessItems()}
							</div>
						</div>
					</div>
					<div className="pokemon-container">
						<div className="pokemon-wrapper">
							<img
								alt="Pokemon"
								src={currentPokemon && currentPokemon.sprite}
								className={`${guess && 'reveal'}`}
							/>
						</div>
					</div>
				</div>
				<div className="user-container">
					<div className="ash-container">
						<div className="ash-wrapper">
							<img alt="Ash" src="/img/ash-back.png" />
						</div>
					</div>
					<div className="timer-container">
						<div className="timer-wrapper">
							<div className="info-container">
								<h4 className="label">TIME LEFT</h4>
								{renderNextBtn()}
							</div>
							<div className="time-wrapper">
								<h4 className="time">{timeLeft}</h4>
								<p className="unit">s</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="prompt-container">
				<div className="prompt-wrapper">
					<div className="options-wrapper">{renderOptionList()}</div>
				</div>
			</div>
		</StyledArenaLayout>
	);
}

ArenaLayout.propTypes = {
	currentPokemon: PropTypes.object.isRequired,
	round: PropTypes.number.isRequired,
	changeRound: PropTypes.func.isRequired,
	scorecard: PropTypes.object.isRequired,
	updateScorecard: PropTypes.func.isRequired,
	changeFinished: PropTypes.func.isRequired
};

const StyledArenaLayout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;

	.arena-container {
		height: 66%;
		flex-basis: 66%;
		display: flex;
		flex-direction: column;

		.opponent-container {
			height: 50%;
			flex-basis: 50%;
			display: flex;
			justify-content: space-between;
			padding: 0 20px;

			.guesses-container {
				flex-basis: 40%;
				padding-top: 20px;

				.guesses-wrapper {
					height: 50%;
					width: 100%;
					display: flex;
					align-items: flex-end;
					justify-content: flex-end;
					border-left: 12px solid black;
					border-bottom: 4px solid black;
					border-radius: 4px;

					.guess-list {
						display: flex;
						margin-bottom: 10px;

						.guess-item {
							margin: 4px;

							&.incorrect {
								img {
									filter: brightness(0%);
								}
							}

							&.pending {
								img {
									opacity: 0.6;
								}
							}

							img {
								height: 28px;
							}
						}
					}
				}
			}

			.pokemon-container {
				height: 100%;
				flex-basis: 33%;
				padding-top: 20px;

				.pokemon-wrapper {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;

					img {
						object-fit: contain;
						height: 100%;
						width: 100%;
						filter: brightness(0%);

						&.reveal {
							filter: initial;
						}
					}
				}
			}
		}

		.user-container {
			height: 50%;
			flex-basis: 50%;
			display: flex;
			justify-content: space-between;
			padding: 0 20px;

			.ash-container {
				flex-basis: 33%;

				.ash-wrapper {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;

					img {
						object-fit: contain;
						height: 100%;
						width: 100%;
					}
				}
			}

			.timer-container {
				flex-basis: 40%;
				justify-self: flex-end;
				display: flex;
				align-items: flex-end;

				.timer-wrapper {
					height: 50%;
					width: 100%;
					display: flex;
					justify-content: space-between;
					border-right: 12px solid black;
					border-bottom: 4px solid black;
					border-radius: 4px;

					.info-container {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						h4.label {
							background-color: #000;
							color: #fff;
							align-self: flex-start;
							padding: 6px 4px;
							font-size: 12px;
							margin: 0;
							white-space: nowrap;
						}

						button.next-btn {
							outline: none;
							background-color: #fff;
							cursor: pointer;
							text-transform: uppercase;
							border: 4px solid #000;
							padding: 4px;
							margin-bottom: 4px;
							animation: blinker 1s linear infinite;

							&:hover {
								animation: none;
							}
						}
					}

					.time-wrapper {
						align-self: flex-end;
						justify-self: flex-end;
						display: flex;
						align-items: flex-end;
						padding: 16px;

						h4.time {
							margin: 0;
							font-size: 48px;
						}

						p.unit {
							margin: 0;
							font-weight: bold;
							font-size: 16px;
						}
					}
				}
			}
		}
	}

	.prompt-container {
		flex-basis: 33%;
		height: 33%;
		padding: 0 20px;
		margin: 20px 0 28px;

		.prompt-wrapper {
			height: 100%;
			display: flex;
			justify-content: flex-end;
			border: 4px solid black;
			border-left: none;
			border-right: none;
			outline: 10px double black;
			border-radius: 4px;

			.options-wrapper {
				border-left: 12px double black;
				width: 60%;

				.option-list {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 100%;
					padding: 0 20px;

					.option-item {
						margin-left: 20px;
						position: relative;
						cursor: pointer;

						&:hover {
							.pointer {
								display: block;
							}
						}

						.pointer {
							display: none;
							position: absolute;
							left: -22px;
							border: 12px solid #000;
							border-top: 8px solid #fff;
							border-right: 8px solid #fff;
							border-bottom: 8px solid #fff;

							&.selected {
								display: block;
							}

							&.not-selected {
								display: none;
							}
						}

						.name {
							font-size: 18px;
							margin: 0;

							&.incorrect {
								text-decoration: line-through solid #000 4px;
							}
						}
					}
				}
			}
		}
	}
`;

export default ArenaLayout;
