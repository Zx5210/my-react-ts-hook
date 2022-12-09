import { Button, Input } from 'antd'
import { Row } from 'components/lib'
import { TaskTypeSelect } from 'components/task-type-select'
import { UseSelect } from 'components/user-select'
import { useSetUrlSearchParam } from 'utils/url'
import { useTaskSearchParams } from './util'

export const SearchPanel = () => {
	const searchParams = useTaskSearchParams()
	const setSearchParams = useSetUrlSearchParam()
	const reset = () => {
		setSearchParams({
			typeId: undefined,
			processorId: undefined,
			tagId: undefined,
			name: undefined,
		})
	}
	return (
		<Row gap={true} bottom={4}>
			<Input
				style={{ width: '20rem' }}
				placeholder={'任务名'}
				value={searchParams.name}
				onChange={evt => setSearchParams({ name: evt.target.value })}
			/>
			<UseSelect
				defaultOptionName="经办人"
				value={searchParams.processorId}
				onChange={valeu => setSearchParams({ processorId: valeu })}
			/>
			<TaskTypeSelect
				defaultOptionName={'类型'}
				value={searchParams.typeId}
				onChange={value => setSearchParams({ typeId: value })}
			/>
			<Button type="primary" onClick={reset}>
				重置
			</Button>
		</Row>
	)
}
