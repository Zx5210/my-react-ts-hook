import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { User } from './search-panel'

export interface Project {
	id: string
	name: string
	ceartNameId: string
	creatTime: number
}

interface ListPriject extends TableProps<Project> {
	list: Project[]
	users: User[]
}
export const List = ({ list, users, ...props }: ListPriject) => {
	const columns = [
		{
			title: '植物名',
			dataIndex: 'name',
			key: 'name',
			sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
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
	]
	return (
		<Table
			rowKey={record => record.id}
			columns={columns}
			dataSource={list}
			{...props}
		/>
	)
}
