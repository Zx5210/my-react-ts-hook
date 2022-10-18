/* @jsxImportSource @emotion/react */
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useState } from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import { Typography } from 'antd'
import { useProject } from 'utils/project'
import { useUser } from 'utils/user'
import styled from '@emotion/styled'

export const ProjectListScreen = () => {
	const [param, setParam] = useState({
		name: '',
		id: '',
	})
	useDocumentTitle('项目列表页', false)
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
