/// <reference types="react-scripts" />

declare type GraphqlMutation<TData, TVars> = (
	options?: MutationFunctionOptions<TData, TVars> | undefined,
) => Promise<ExecutionResult<TData>>;
