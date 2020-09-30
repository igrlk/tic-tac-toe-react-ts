import React, { FC, useEffect } from 'react';
import { produce } from 'immer';

import 'resources/styles/reset.scss';

import { Cell, CellValue } from './frames/Cell';
import { OptionsSection } from './frames/OptionsSection';
import { useWinnerDetection } from './hooks/useWinnerDetection';
import { useHandleCellClick } from './hooks/useHandleCellClick';

import styles from './App.module.scss';
import { useGameState } from './hooks/useGameState';
import { useGameOptions } from './hooks/useGameOptions';
import { Button } from './frames/Button';

export const App: FC = () => {
	const { state, patchState, playAgain } = useGameState();

	const winner = useWinnerDetection(state.cells);
	useEffect(() => {
		if (winner) {
			patchState({
				winningCounts: produce(state.winningCounts, draft => {
					draft[winner] = +draft[winner] + 1;
				}),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [winner]);

	const handleCellClick = useHandleCellClick({ state, patchState, winner });
	const options = useGameOptions({ state, patchState });

	return (
		<div className={styles.container}>
			<div className={styles.options}>
				<OptionsSection title='Playing mode:' options={options.playingMode} />
				<OptionsSection title='Number of cells:' options={options.cellsCount} />
			</div>

			<h2 className={styles.title}>Tic-Tac-Toe</h2>

			<div className={styles.cellsContainer}>
				{state.cells.map((row, rowIndex) => (
					<div key={rowIndex} className={styles.row}>
						{row.map((cell, cellIndex) => (
							<Cell key={cellIndex} value={cell} onClick={() => handleCellClick(rowIndex, cellIndex)} />
						))}
					</div>
				))}
			</div>

			{(winner || state.noFreeCells) && (
				<div className={styles.winner}>
					{winner && <div className={styles.winnerText}>Player {winner} won!</div>}
					<Button onClick={playAgain} isActive>
						Play again
					</Button>
				</div>
			)}

			<div className={styles.stats}>
				<div className={styles.statsTitle}>Stats:</div>
				<div className={styles.statsValue}>
					Player {CellValue.x}: <span className={styles.statsValueCounter}>{state.winningCounts.X}</span>
				</div>
				<div className={styles.statsValue}>
					Player {CellValue.o}: <span className={styles.statsValueCounter}>{state.winningCounts.O}</span>
				</div>
			</div>
		</div>
	);
};
