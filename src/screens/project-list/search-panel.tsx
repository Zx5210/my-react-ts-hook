/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from 'antd'

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
		<Form css={{ width: '30rem', marginBottom: '2rem' }}>
			<Input
				defaultValue={param.name}
				addonAfter={selectAfter}
				placeholder="植物名称"
				allowClear
				onChange={ent =>
					setParam({
						...param,
						name: ent.target.value,
					})
				}
			/>
		</Form>
	)
}
