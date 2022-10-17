import { useState } from 'react'

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

	const setData = (data: D) =>
		setState({
			data,
			stat: 'success',
			error: null,
		})

	const setError = (error: Error) =>
		setState({
			error,
			stat: 'error',
			data: null,
		})

	const run = (promise: Promise<D>) => {
		if (!promise || !promise.then) {
			throw new Error('请传入一个Promise')
		}
		setState({ ...state, stat: 'loading' })
		return promise
			.then(data => {
				setData(data)
				return data
			})
			.catch(error => {
				// cath会消耗异常导致外部的try捕获不到
				setError(error)
				if (config.throwOnError) return Promise.reject(error)
				return error
			})
	}
	console.log(state)

	return {
		isIdle: state.stat === 'idle',
		isLoading: state.stat === 'loading',
		isError: state.stat === 'error',
		isSuccess: state.stat === 'success',
		run,
		setData,
		setError,
		...state,
	}
}
