import { useState, useEffect, useCallback } from 'react';

import { CellValue, Cells } from '../frames/Cell';

export interface IState {
	isPvP: boolean;
	isXTurn: boolean;
	cells: CellValue[];
	winningCounts: {
		[CellValue.x]: number;
		[CellValue.o]: number;
	};
	noFreeCells: boolean;
}
export type PatchState = (fields: Partial<IState>) => void;

export const useGameState = () => {
	const [state, setState] = useState<IState>({
		isPvP: true,
		isXTurn: true,
		cells: getCells(),
		winningCounts: {
			[CellValue.x]: 0,
			[CellValue.o]: 0,
		},
		noFreeCells: false,
	});

	const patchState: PatchState = useCallback(
		fields =>
			setState({
				...state,
				...fields,
			}),
		[state],
	);

	useEffect(() => {
		patchState({
			cells: getCells(),
			winningCounts: {
				[CellValue.x]: 0,
				[CellValue.o]: 0,
			},
			isXTurn: true,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.isPvP]);

	const playAgain = useCallback(() => {
		patchState({
			isXTurn: true,
			cells: getCells(),
			noFreeCells: false,
		});
	}, [patchState]);

	return {
		state,
		patchState,
		playAgain,
	};
};

const getCells = (): Cells => new Array(9).fill(CellValue.empty);
