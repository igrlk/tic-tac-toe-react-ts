import { CellValue, Cells } from 'App/frames/Cell';
import { getWinner } from '../hooks/useWinnerDetection';

export const getBestTurn = (cells: Cells) => {
	let bestMoveValue = -Infinity;
	let move = 0;

	for (let i = 0; i < cells.length; i++) {
		const newBoard = makeTurn(i, CellValue.o, cells);
		if (newBoard) {
			const predictedMoveValue = minMoveValue(newBoard);

			if (predictedMoveValue > bestMoveValue) {
				bestMoveValue = predictedMoveValue;
				move = i;
			}
		}
	}

	return move;
};

const minMoveValue = (cells: Cells) => {
	const winner = getWinner(cells);
	if (winner === CellValue.o) return Infinity;
	if (winner === CellValue.x) return -Infinity;
	if (isTie(cells)) return 0;

	let bestMoveValue = Infinity;

	for (let i = 0; i < cells.length; i++) {
		const newBoard = makeTurn(i, CellValue.x, cells);
		if (newBoard) {
			const predictedMoveValue = maxMoveValue(newBoard);
			if (predictedMoveValue < bestMoveValue) bestMoveValue = predictedMoveValue;
		}
	}

	return bestMoveValue;
};

const maxMoveValue = (cells: Cells) => {
	const winner = getWinner(cells);
	if (winner === CellValue.o) return Infinity;
	if (winner === CellValue.x) return -Infinity;
	if (isTie(cells)) return 0;

	let bestMoveValue = -Infinity;

	for (let i = 0; i < cells.length; i++) {
		const newBoard = makeTurn(i, CellValue.o, cells);
		if (newBoard) {
			const predictedMoveValue = minMoveValue(newBoard);
			if (predictedMoveValue > bestMoveValue) bestMoveValue = predictedMoveValue;
		}
	}

	return bestMoveValue;
};

const makeTurn = (cellIndex: number, player: CellValue, cells: Cells) => {
	const newBoard = [...cells];

	if (newBoard[cellIndex] === CellValue.empty) {
		newBoard[cellIndex] = player;

		return newBoard;
	}

	return;
};

const isTie = (cells: Cells) => !cells.some(x => x === CellValue.empty);
