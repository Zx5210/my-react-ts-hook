import React from 'react'
type FallbackRender = (props: { error: Error | null }) => React.ReactElement

// 边缘异常捕获
export class ErrorBundary extends React.Component<
	React.PropsWithChildren<{ fallbackRender: FallbackRender }>
> {
	state = { error: null }
	static getDerivedStateFromError(error: Error) {
		return { error }
	}
	render() {
		const { error } = this.state
		const { fallbackRender, children } = this.props
		if (error) {
			return fallbackRender({ error })
		} else {
			return children
		}
	}
}
