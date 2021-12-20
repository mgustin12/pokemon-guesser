import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router';

import LandingPage from './LandingPage';
import { GuesserLayout } from '../../guesser/components';

function MainLayout() {
	return (
		<StyledMainLayout>
			<Routes>
				<Route exact path="/" element={<LandingPage />} />
				<Route exact path="/guesser" element={<GuesserLayout />} />
			</Routes>
		</StyledMainLayout>
	);
}

const StyledMainLayout = styled.div`
	height: 100%;
`;

export default MainLayout;
