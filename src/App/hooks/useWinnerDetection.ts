import { useMemo } from 'react';

import { Cells } from '../frames/Cell';

export const getWinner = (cells: Cells) => {
	const cellsLengthInRow = Math.sqrt(cells.length);

	const lines = getVerticalLines(cellsLengthInRow)
		.concat(getHorizontalLines(cellsLengthInRow))
		.concat(getDiagonalLines(cellsLengthInRow));

	for (const line of lines) {
		const value = cells[line[0]];

		for (const i in line) {
			const cellIndex = line[i];

			if (!value || cells[cellIndex] !== value) break;

			if (+i === line.length - 1) return value;
		}
	}

	return null;
};

export const useWinnerDetection = (cells: Cells) => useMemo(() => getWinner(cells), [cells]);

const getVerticalLines = (length: number) =>
	getArr(length).map((_, rowIndex) => getArr(length).map((__, colIndex) => colIndex * length + rowIndex));

const getHorizontalLines = (length: number) =>
	getArr(length).map((_, rowIndex) =>
		getArr(length).map((__, colIndex) => rowIndex + colIndex + rowIndex * (length - 1)),
	);

const getDiagonalLines = (length: number) => [
	getArr(length).map((_, index) => index + index * length),
	getArr(length).map((_, index) => length - index - 1 + index * length),
];

const getArr = (length: number) => new Array(length).fill(undefined);
