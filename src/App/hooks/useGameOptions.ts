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
});
