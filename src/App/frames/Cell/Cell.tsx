import React, { FC, memo } from 'react';
import cn from 'classnames';

import styles from './Cell.module.scss';

export enum CellValue {
	x = 'X',
	o = 'O',
	empty = '',
}

export type Cells = CellValue[];

interface ICell {
	value: CellValue;
	onClick: () => void;
}

export const Cell: FC<ICell> = memo(({ value, onClick }) => (
	<div className={cn(styles.cell, { [styles.cellWithValue]: !!value })} onClick={onClick}>
		{value}
	</div>
));
