import styled from '@emotion/styled'
import { Spin } from 'antd'
import { ScreenContainer } from 'components/lib'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useTasks } from 'utils/task'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { TaskModal } from './task-modal'
import {
	useKanbanSearchParams,
	useProjectInUrl,
	useTaskSearchParams,
} from './util'

export const KanbanScreen = () => {
	useDocumentTitle('看板列表')
	const { data: currentProject } = useProjectInUrl()
	const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
		useKanbanSearchParams()
	)

	const { isLoading: taskLoading } = useTasks(useTaskSearchParams())
	const isLioading = taskLoading || kanbanIsLoading
	return (
		<ScreenContainer>
			<h1>{currentProject?.name}看板</h1>
			<SearchPanel />
			{isLioading ? (
				<Spin size={'large'} />
			) : (
				<ColumnsContainer>
					{kanbans?.map(kanban => (
						<KanbanColumn kanban={kanban} key={kanban.id} />
					))}
					<CreateKanban />
				</ColumnsContainer>
			)}
			<TaskModal />
		</ScreenContainer>
	)
}

export const ColumnsContainer = styled.div`
	display: flex;
	overflow-y: auto;
	flex: 1;
`
