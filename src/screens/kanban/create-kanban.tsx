import Input from 'antd/lib/input/Input'
import { useState } from 'react'
import { useAddKanban } from 'utils/kanban'
import { Container } from './kanban-column'
import { useKanbansQueryKey, useProjectIdUrl } from './util'

export const CreateKanban = () => {
	const [name, setName] = useState('')
	const projectId = useProjectIdUrl()
	const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey())

	const submit = async () => {
		await addKanban({ name, projectId })
		setName('')
	}
	return (
		<Container>
			<Input
				size={'large'}
				placeholder={'新建看板名称'}
				onPressEnter={submit}
				value={name}
				onChange={evt => setName(evt.target.value)}
			/>
		</Container>
	)
}
