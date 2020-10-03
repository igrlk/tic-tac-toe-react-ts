import { useMemo } from 'react';

import { Cells } from '../frames/Cell';

export const getWinner = (cells: Cells) => {
	for (const line of winningLines) {
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

const winningLines = [
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 4, 8],
	[2, 4, 6],
];
