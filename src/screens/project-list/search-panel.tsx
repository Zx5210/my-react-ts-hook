/* @jsxImportSource @emotion/react */
import { Form, Input } from 'antd'
import { UseSelect } from 'components/user-select'
import { Project } from 'types/project'
import { User } from 'types/user'

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
		<Form css={{ width: '30rem' }}>
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
