import { useCallback } from 'react';
import { produce } from 'immer';

import { CellValue } from '../frames/Cell';
import { PatchState, IState } from './useGameState';

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
		(rowIndex: number, cellIndex: number) => {
			if (cells[rowIndex][cellIndex] || winner) return;

			const freeCells = getFreeCells(cells, rowIndex, cellIndex);

			patchState({
				cells: produce(cells, draft => {
					if (isPvP) {
						draft[rowIndex][cellIndex] = isXTurn ? CellValue.x : CellValue.o;
					} else {
						draft[rowIndex][cellIndex] = CellValue.x;

						const randomCell = freeCells[Math.floor(Math.random() * freeCells.length)];
						if (randomCell) {
							draft[randomCell[0]][randomCell[1]] = CellValue.o;
						}
					}
				}),
				isXTurn: isPvP ? !isXTurn : isXTurn,
				noFreeCells: freeCells.length === 0,
			});
		},
		[cells, isXTurn, winner, isPvP, patchState],
	);

const getFreeCells = (cells: CellValue[][], rowIndex: number, cellIndex: number) => {
	const freeCells: number[][] = [];

	for (const draftRowIndex in cells) {
		for (const draftCellIndex in cells[draftRowIndex]) {
			if (!cells[draftRowIndex][draftCellIndex]) {
				if (+draftRowIndex !== rowIndex || +draftCellIndex !== cellIndex) {
					freeCells.push([+draftRowIndex, +draftCellIndex]);
				}
			}
		}
	}

	return freeCells;
};
