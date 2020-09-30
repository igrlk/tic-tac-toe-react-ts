import React, { FC, memo } from 'react';

import { Button } from '../Button';
import styles from './OptionsSection.module.scss';

interface IOptionsSection {
	title: string;
	options: Array<{
		text: string;
		onClick: () => void;
		isActive: boolean;
	}>;
}

export const OptionsSection: FC<IOptionsSection> = memo(({ title, options }) => (
	<div className={styles.container}>
		<div className={styles.title}>{title}</div>
		{options.map(option => (
			<Button key={option.text} onClick={option.onClick} isActive={option.isActive}>
				{option.text}
			</Button>
		))}
	</div>
));
