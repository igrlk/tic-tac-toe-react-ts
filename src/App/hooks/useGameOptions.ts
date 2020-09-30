import { useMemo } from 'react';

import { IState, PatchState } from './useGameState';

export const useGameOptions = ({ state, patchState }: { state: IState; patchState: PatchState }) => ({
	playingMode: useMemo(
		() => [
			{
				text: 'PvP',
				onClick: () => patchState({ isPvP: true }),
				isActive: state.isPvP,
			},
			{
				text: 'PvE',
				onClick: () => patchState({ isPvP: false }),
				isActive: !state.isPvP,
			},
		],
		[state.isPvP, patchState],
	),
	cellsCount: useMemo(
		() => [
			{
				text: '3x3',
				onClick: () => patchState({ cellsCount: 3 }),
				isActive: state.cellsCount === 3,
			},
			{
				text: '4x4',
				onClick: () => patchState({ cellsCount: 4 }),
				isActive: state.cellsCount === 4,
			},
			{
				text: '5x5',
				onClick: () => patchState({ cellsCount: 5 }),
				isActive: state.cellsCount === 5,
			},
		],
		[state.cellsCount, patchState],
	),
});
