import { Input, Select } from 'antd'

export interface User {
	id: string
	name: string
	token: string
}
interface SearchPanelProps {
	users: User[]
	param: { name: string; id: string }
	setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
	const { Option } = Select
	const selectAfter = (
		<Select
			defaultValue={param.id}
			onChange={id =>
				setParam({
					...param,
					id,
				})
			}
		>
			<Option value={''}>负责人</Option>
			{users.map(user => (
				<Option key={user.id} value={user.id}>
					{user.name}
				</Option>
			))}
		</Select>
	)
	return (
		<form>
			<Input
				defaultValue={param.name}
				addonAfter={selectAfter}
				onChange={ent =>
					setParam({
						...param,
						name: ent.target.value,
					})
				}
			/>
		</form>
	)
}
