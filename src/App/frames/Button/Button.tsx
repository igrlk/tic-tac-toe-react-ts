import React, { FC, memo } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

interface IButton {
	onClick: () => void;
	isActive: boolean;
}

export const Button: FC<IButton> = memo(({ isActive, onClick, children }) => (
	<button type='button' onClick={onClick} className={cn(styles.button, { [styles.buttonActive]: isActive })}>
		{children}
	</button>
));
