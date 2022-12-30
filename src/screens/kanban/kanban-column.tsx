import { kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import { useKanbansQueryKey, useTaskSearchParams, useTasksModal } from './util'
import collect from 'assets/collect.svg'
import certified from 'assets/certified.svg'
import { useTaskTypes } from 'utils/task-type'
import styled from '@emotion/styled'
import { Button, Card, Dropdown, Menu, Modal } from 'antd'
import { cleanObject } from 'utils'
import { CreaeTask } from './creat-task'
import { Task } from 'types/task'
import { Mark } from './mark'
import { ButtonNOPadding, Row } from 'components/lib'
import { useDeleteKanban } from 'utils/kanban'

const TaskTypeIcon = ({ id }: { id: number }) => {
	const { data: taskTypes } = useTaskTypes()
	const typeObj = taskTypes?.find(taskType => taskType.id === id)
	if (!typeObj?.name) {
		return null
	}
	return <TaskIcon src={typeObj.id === 1 ? collect : certified} />
}

const TaskCard = ({ task }: { task: Task }) => {
	const { startEdit } = useTasksModal()
	const { name: keyWord } = useTaskSearchParams()
	return (
		<Card
			onClick={() => startEdit(task.id)}
			style={{ cursor: 'pointer', marginBottom: '0.5rem' }}
			key={task.id}
		>
			<p>
				<Mark keyWord={keyWord} name={task.name} />
			</p>
			<TaskTypeIcon id={task.typeId} />
		</Card>
	)
}

const More = ({ kanban }: { kanban: kanban }) => {
	const { mutateAsync: delKanban } = useDeleteKanban(useKanbansQueryKey())
	const dleKanbanConfirm = () => {
		Modal.confirm({
			okText: '确定',
			cancelText: '取消',
			title: '是否删除看板?',
			onOk() {
				delKanban({ id: kanban.id })
			},
		})
	}
	const menu = () => (
		<Menu
			items={[
				{
					label: (
						<Button type={'link'} onClick={dleKanbanConfirm}>
							删除
						</Button>
					),
					key: 'del',
				},
			]}
		/>
	)
	return (
		<Dropdown overlay={menu}>
			<ButtonNOPadding type={'link'}>···</ButtonNOPadding>
		</Dropdown>
	)
}

export const KanbanColumn = ({ kanban }: { kanban: kanban }) => {
	const { data: allTasks } = useTasks(cleanObject(useTaskSearchParams()))
	const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

	return (
		<Container>
			<Row between={true}>
				<h3>{kanban?.name}</h3>
				<More kanban={kanban} />
			</Row>

			<TaskContainer>
				{tasks?.map(task => (
					<TaskCard key={task.name} task={task} />
				))}
				<CreaeTask kanbanId={kanban.id} />
			</TaskContainer>
		</Container>
	)
}

export const Container = styled.div`
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
	height: 40rem;
	::-webkit-scrollbar {
		display: none;
	}
`
