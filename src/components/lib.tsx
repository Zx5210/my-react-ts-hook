import styled from '@emotion/styled'
import { Spin, Typography } from 'antd'

export const Row = styled.div<{
	gap: number | boolean
	between: boolean
	weight: boolean
}>`
	display: flex;
	align-items: center;
	justify-content: ${props => (props.between ? 'space-between' : undefined)};
	> * {
		font-weight: ${props => (props.weight ? 'bold' : undefined)};
		margin-top: 0 !important;
		margin-bottom: 0 !important;
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
		<Typography.Text type={'danger'}>
			{error?.message || '系统错误！请联系管理员！'}
		</Typography.Text>
	</FullPage>
)
