import { useMemo } from 'react';

import { Cells } from 'App/frames/Cell';

export const useCellsToRender = (cells: Cells) =>
	useMemo(() => {
		const cellsToRender: Cells[] = [];
		const rawSize = Math.sqrt(cells.length);

		for (const cell of cells) {
			const lastRow = cellsToRender[cellsToRender.length - 1];
			if ((lastRow && lastRow.length === rawSize) || !lastRow) {
				cellsToRender.push([cell]);
			} else {
				lastRow[lastRow.length] = cell;
			}
		}

		return cellsToRender;
	}, [cells]);
