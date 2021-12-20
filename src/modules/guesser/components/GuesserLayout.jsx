import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import ArenaLayout from './ArenaLayout';
import ScoreLayout from './ScoreLayout';

const POKIAPI_ENDPOINT = 'https://pokeapi.co/api/v2/';
const DEFAULT_SCORECARD = new Array(10).fill(null).map((el, index) => ({
	round: index + 1,
	guessed: false,
	correct: null
}));

function GuesserLayout() {
	const [loading, changeLoading] = useState(false);
	const [pokemon, updatePokemon] = useState(null);
	const [round, changeRound] = useState(1);
	const [scorecard, updateScorecard] = useState(DEFAULT_SCORECARD);
	const [finished, changeFinished] = useState(false);

	const getScore = () => {
		let score = 0;

		scorecard.forEach(entry => {
			const { correct } = entry;

			if (correct) score++;
		});

		return score;
	};

	const renderSprites = () => {
		if (!pokemon || loading) return null;

		return pokemon.map((poke, index) => {
			const { sprite } = poke;

			return <img key={index} alt="pokemon" src={sprite} />;
		});
	};

	useEffect(() => {
		changeLoading(true);

		let randomIds = [];
		const getRandomPokemon = () => {
			let randomId = Math.floor(Math.random() * 898) || 1;

			if (randomIds.includes(randomId)) {
				return getRandomPokemon();
			} else {
				randomIds.push(randomId);
				return randomId;
			}
		};

		const shuffleOptions = options => {
			let currentIndex = options.length;
			let randomIndex;

			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;

				[options[currentIndex], options[randomIndex]] = [
					options[randomIndex],
					options[currentIndex]
				];
			}

			return options;
		};

		let requests = new Array(40)
			.fill(null)
			.map(() =>
				axios.get(`${POKIAPI_ENDPOINT}pokemon/${getRandomPokemon()}`)
			);

		axios
			.all(requests)
			.then(
				axios.spread((...responses) => {
					let pokemonResponses = responses.slice(0, 10);
					let optionsResponses = responses.slice(10, 40);

					let pokemon = pokemonResponses.map(
						(pokemonResponse, index) => {
							const { id, name, sprites } = pokemonResponse.data;

							let options = optionsResponses
								.slice(index * 3, index * 3 + 3)
								.map(optionResponse => {
									const { id, name } = optionResponse.data;

									return {
										id,
										name
									};
								});
							options.push({ id, name });

							return {
								id,
								name,
								round: index + 1,
								sprite:
									(sprites && sprites.front_default) || '',
								options: shuffleOptions(options)
							};
						}
					);

					updatePokemon(pokemon);
					changeLoading(false);
				})
			)
			.catch(errors => {
				console.error(errors);
				changeLoading(false);
			});
	}, []);

	if (loading || !pokemon) {
		return (
			<PageLoader>
				<div className="loading-wrapper">
					<p>Loading...</p>
				</div>
			</PageLoader>
		);
	}

	if (finished) {
		return <ScoreLayout score={getScore()} />;
	}

	return (
		<Fragment>
			<ArenaLayout
				round={round}
				changeRound={changeRound}
				currentPokemon={pokemon[round - 1]}
				scorecard={scorecard}
				updateScorecard={updateScorecard}
				changeFinished={changeFinished}
			/>
			<SpriteLoader>{renderSprites()}</SpriteLoader>
		</Fragment>
	);
}

const SpriteLoader = styled.div`
	opacity: 0;
`;

const PageLoader = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 20px;

	.loading-wrapper {
		border: 4px solid black;
		border-left: none;
		border-right: none;
		outline: 10px double black;
		border-radius: 4px;
		padding: 0 20px;
	}
`;

export default GuesserLayout;
