/* @jsxImportSource @emotion/react */
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce, useDocumentTitle } from 'utils'
import { Typography } from 'antd'
import { useProject } from 'utils/project'
import { useUser } from 'utils/user'
import styled from '@emotion/styled'
import { useUrlQueryParam } from 'utils/url'

export const ProjectListScreen = () => {
	const [param, setParam] = useUrlQueryParam(['name', 'id'])
	useDocumentTitle('项目列表页', false)
	// 基本类型可以放到依赖里；组件状态可以放；非组件状态的对象不能放进依赖里
	//包裹一层防抖函数，传入修改的数值和防抖时间
	const debouncedParam = useDebounce(param, 500)
	const { isLoading, error, data: list } = useProject(debouncedParam)
	const { data: users } = useUser()

	return (
		<Container>
			<SearchPanel users={users || []} param={param} setParam={setParam} />
			<h2>种植记录</h2>
			{error ? (
				<Typography.Text type={'danger'}>{error.message}</Typography.Text>
			) : null}
			<List loading={isLoading} list={list || []} users={users || []} />
		</Container>
	)
}

const Container = styled.div``
