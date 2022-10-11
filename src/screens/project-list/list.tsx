import { Table } from 'antd'
import { User } from './search-panel'

interface Project {
	id: string
	name: string
	ceartNameId: string
}
interface ListPriject {
	list: Project[]
	users: User[]
}
export const List = ({ list, users }: ListPriject) => {
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
		},
		{
			title: 'ceartTime',
			dataIndex: 'ceartTime',
			key: 'ceartTime',
		},
		{
			title: 'ceartName',
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
	return <Table columns={columns} dataSource={list} />
}
