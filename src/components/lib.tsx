import styled from '@emotion/styled'
import { Button, Spin, Typography } from 'antd'

export const Row = styled.div<{
	gap?: number | boolean
	between?: boolean
	weight?: boolean
	bottom?: number | boolean
}>`
	display: flex;
	align-items: center;
	justify-content: ${props => (props.between ? 'space-between' : undefined)};
	> * {
		font-weight: ${props => (props.weight ? 'bold' : undefined)};
		margin-top: 0 !important;
		margin-bottom: ${props =>
			typeof props.bottom === 'number'
				? props.bottom + 'rem'
				: props.bottom
				? '2rem'
				: undefined};
		margin-right: ${props =>
			typeof props.gap === 'number'
				? props.gap + 'rem'
				: props.gap
				? '2rem'
				: undefined};
	}
`
const FullPage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`
export const FullPageLoading = () => (
	<FullPage>
		<Spin size="large"></Spin>
	</FullPage>
)

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
	<FullPage>
		<ErrorBox error={error} />
	</FullPage>
)

export const ButtonNOPadding = styled(Button)`
	padding: initial;
`

export const ErrorBox = ({ error }: { error: Error | unknown }) => {
	//类型守卫 如果返回值等于true的时候value就是一个Error类型
	const isError = (value: any): value is Error => value?.message

	if (isError(error)) {
		return <Typography.Text type={'danger'}>{error.message}</Typography.Text>
	}
	return null
}
