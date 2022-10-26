/* @jsxImportSource @emotion/react */
import { Form, Input } from 'antd'
import { UseSelect } from 'components/user-select'
import { Project } from './list'

export interface User {
	id: number
	name: string
	token: string
}
// Pick引入Project类型接口取nama和id给param
interface SearchPanelProps {
	users: User[]
	param: Partial<Pick<Project, 'name' | 'id'>>
	setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
	const selectAfter = (
		<UseSelect
			defaultOptionName={'负责人'}
			options={users}
			value={users.length ? param.id : undefined}
			onChange={id =>
				setParam({
					...param,
					id,
				})
			}
		></UseSelect>
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
