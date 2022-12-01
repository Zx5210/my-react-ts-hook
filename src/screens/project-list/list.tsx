import { Button, Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { User } from './search-panel'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject, useDeleteProject } from 'utils/project'
import { ButtonNOPadding } from 'components/lib'
import { useProjectModal, useProjectsQueryKey } from './util'

export interface Project {
	id: number
	name: string
	ceartNameId: number
	creatTime: number
	pin: number
}

interface ListPriject extends TableProps<Project> {
	list: Project[]
	users: User[]
}
export const List = ({ list, users, ...props }: ListPriject) => {
	const { mutate } = useEditProject(useProjectsQueryKey())
	const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
	const { startEdit } = useProjectModal()

	const pinProject = (project: Project) => (pin: number) =>
		mutate({ ...project, pin })
	const editProject = (id: number) => () => startEdit(id)

	const confirmDeleteProject = (id: number) => {
		Modal.confirm({
			title: '确定删除吗?',
			content: '点击确定删除',
			okText: '确定',
			onOk() {
				deleteProject({ id })
			},
		})
	}

	const columns = [
		{
			title: <Pin checked={true} disabled={true}></Pin>,
			render(value: string, project: Project) {
				return (
					<Pin
						checked={!!project.pin}
						onCheckedChange={pinProject(project)}
					></Pin>
				)
			},
		},
		{
			title: '植物名',
			key: 'name',
			sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
			render(value: string, project: Project) {
				return <Link to={String(project.id)}>{project.name}</Link>
			},
		},
		{
			title: '栽种时间',
			render: (value: string, project: Project) => {
				return (
					<span>
						{project.creatTime
							? dayjs(project.creatTime).format('YYYY-MM-DD HH:mm:ss')
							: null}
					</span>
				)
			},
		},
		{
			title: '栽种人',
			render(value: string, project: Project) {
				return (
					<span>
						{users.find((users: User) => users.id === project.ceartNameId)
							?.name || ''}
					</span>
				)
			},
		},
		{
			title: '操作',
			render(value: string, project: Project) {
				return (
					<Dropdown overlay={menu(project)}>
						<ButtonNOPadding type={'link'}>···</ButtonNOPadding>
					</Dropdown>
				)
			},
		},
	]

	const menu = (project: Project) => (
		<Menu
			items={[
				{
					label: (
						<Button type={'link'} onClick={editProject(project.id)}>
							编辑
						</Button>
					),
					key: 'edit',
				},
				{
					label: (
						<Button
							type={'link'}
							onClick={() => confirmDeleteProject(project.id)}
						>
							删除
						</Button>
					),
					key: 'del',
				},
			]}
		/>
	)

	return (
		<Table
			rowKey={record => record.id}
			columns={columns}
			dataSource={list}
			{...props}
		/>
	)
}
