import { useCallback, useState } from 'react'
import { useMounteRef } from 'utils'

interface State<D> {
	data: D
	error: Error | null
	stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
	data: null,
	error: null,
	stat: 'idle',
}

const defaultConfig = {
	throwOnError: false,
}

export const useAsync = <D>(
	initialState?: State<D>,
	initialConfig?: typeof defaultConfig
) => {
	const config = { ...defaultConfig, ...initialConfig }

	const [state, setState] = useState({
		...defaultInitialState,
		...initialState,
	})

	const setData = useCallback(
		(data: D) =>
			setState({
				data,
				stat: 'success',
				error: null,
			}),
		[]
	)

	const setError = useCallback(
		(error: Error) =>
			setState({
				error,
				stat: 'error',
				data: null,
			}),
		[]
	)
	const [retry, setRetry] = useState(() => () => {})
	const mounteRef = useMounteRef()
	const run = useCallback(
		(promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
			if (!promise || !promise.then) {
				throw new Error('请传入一个Promise')
			}
			setRetry(() => () => {
				if (runConfig?.retry) run(runConfig?.retry(), runConfig)
			})
			setState(prevState => ({ ...prevState, stat: 'loading' }))
			return promise
				.then(data => {
					if (mounteRef.current) setData(data)
					return data
				})
				.catch(error => {
					// cath会消耗异常导致外部的try捕获不到
					setError(error)
					if (config.throwOnError) return Promise.reject(error)
					return error
				})
		},
		[config.throwOnError, mounteRef, setData, setError]
	)

	return {
		isIdle: state.stat === 'idle',
		isLoading: state.stat === 'loading',
		isError: state.stat === 'error',
		isSuccess: state.stat === 'success',
		run,
		retry,
		setData,
		setError,
		...state,
	}
}
