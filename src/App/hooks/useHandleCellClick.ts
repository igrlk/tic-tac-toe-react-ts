import { useCallback } from 'react';
import { produce } from 'immer';

import { CellValue } from '../frames/Cell';
import { PatchState, IState } from './useGameState';
import { getWinner } from './useWinnerDetection';
import { getBestTurn } from '../utils/getBestTurn';

export const useHandleCellClick = ({
	state: { cells, isPvP, isXTurn },
	patchState,
	winner,
}: {
	state: IState;
	patchState: PatchState;
	winner: CellValue | null;
}) =>
	useCallback(
		(index: number) => {
			if (cells[index] || winner) return;

			const newCells = produce(cells, draft => {
				if (isPvP) {
					draft[index] = isXTurn ? CellValue.x : CellValue.o;
				} else {
					draft[index] = CellValue.x;
				}
			});

			const freeCells = newCells.filter(cell => cell === CellValue.empty);

			patchState({
				cells: produce(newCells, draft => {
					if (!isPvP && !getWinner(newCells)) {
						const bestTurn = getBestTurn(newCells);

						if (draft[bestTurn] === CellValue.empty) {
							draft[bestTurn] = CellValue.o;
						}
					}
				}),
				isXTurn: isPvP ? !isXTurn : isXTurn,
				noFreeCells: freeCells.length === 0,
			});
		},
		[cells, isXTurn, winner, isPvP, patchState],
	);
