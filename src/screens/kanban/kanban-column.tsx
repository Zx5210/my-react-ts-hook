import { kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import { useTaskSearchParams } from './util'
import collect from 'assets/collect.svg'
import certified from 'assets/certified.svg'
import { useTaskTypes } from 'utils/task-type'
import styled from '@emotion/styled'
import { Card } from 'antd'
import { cleanObject } from 'utils'

const TaskTypeIcon = ({ id }: { id: number }) => {
	const { data: taskTypes } = useTaskTypes()
	const typeObj = taskTypes?.find(taskType => taskType.id === id)
	if (!typeObj?.name) {
		return null
	}
	return <TaskIcon src={typeObj.id === 1 ? collect : certified} />
}

export const KanbanColumn = ({ kanban }: { kanban: kanban }) => {
	const { data: allTasks } = useTasks(cleanObject(useTaskSearchParams()))
	const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

	return (
		<Container>
			<h3>{kanban?.name}</h3>
			<TaskContainer>
				{tasks?.map(task => (
					<Card style={{ marginBottom: '0.5rem' }} key={task.id}>
						<div>{task.name}</div>
						<TaskTypeIcon id={task.typeId} />
					</Card>
				))}
			</TaskContainer>
		</Container>
	)
}

const Container = styled.div`
	min-width: 27rem;
	border-radius: 6px;
	background-color: rgb(244, 245, 247);
	display: flex;
	flex-direction: column;
	padding: 0.7rem 0.7rem 1rem;
	margin-right: 1.5rem;
`
const TaskIcon = styled.img`
	width: 2rem;
`
const TaskContainer = styled.div`
	overflow: scroll;
	flex: 1;
	::-webkit-scrollbar {
		display: none;
	}
`
