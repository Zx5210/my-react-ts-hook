/* @jsxImportSource @emotion/react */
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useDebounce, useDocumentTitle } from 'utils'
import { Button } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import styled from '@emotion/styled'
import { useProjectModal, useProjectsSearchParams } from './util'
import { ErrorBox, Row } from 'components/lib'

export const ProjectListScreen = () => {
	useDocumentTitle('项目列表页', false)
	const { open } = useProjectModal()
	const [param, setParam] = useProjectsSearchParams()
	// 基本类型可以放到依赖里；组件状态可以放；非组件状态的对象不能放进依赖里
	//包裹一层防抖函数，传入修改的数值和防抖时间
	const {
		isLoading,
		error,
		data: list,
	} = useProjects(cleanObject(useDebounce(param, 500)))
	const { data: users } = useUsers()

	return (
		<Container>
			<h2>种植记录</h2>
			<Row between={true} bottom={true}>
				<SearchPanel users={users || []} param={param} setParam={setParam} />
				<Button onClick={open}>种植</Button>
			</Row>
			{error ? <ErrorBox error={error} /> : null}
			<List loading={isLoading} list={list || []} users={users || []} />
		</Container>
	)
}

const Container = styled.div``
