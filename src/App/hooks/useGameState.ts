import { useState, useEffect, useCallback } from 'react';

import { CellValue, Cells } from '../frames/Cell';

export interface IState {
	cellsCount: number;
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
		cellsCount: 3,
		isPvP: false,
		isXTurn: true,
		cells: getCells(3),
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
			cells: getCells(state.cellsCount),
			winningCounts: {
				[CellValue.x]: 0,
				[CellValue.o]: 0,
			},
			isXTurn: true,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.isPvP, state.cellsCount]);

	const playAgain = useCallback(() => {
		patchState({
			isXTurn: true,
			cells: getCells(state.cellsCount),
			noFreeCells: false,
		});
	}, [state.cellsCount, patchState]);

	return {
		state,
		patchState,
		playAgain,
	};
};

const getCells = (cellsCount: number): Cells => new Array(cellsCount ** 2).fill(CellValue.empty);
