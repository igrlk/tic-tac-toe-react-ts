import React, { Suspense, LazyExoticComponent } from 'react';

export const lazyComponent = (Component: LazyExoticComponent<any>) => () => (
	<Suspense fallback={null}>
		<Component />
	</Suspense>
);
