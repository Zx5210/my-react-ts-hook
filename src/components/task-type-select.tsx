import React from 'react'
import { useTaskTypes } from 'utils/task-type'
import { IdSelset } from './id-select'

export const TaskTypeSelect = (
	props: React.ComponentProps<typeof IdSelset>
) => {
	const { data: taskTypes } = useTaskTypes()
	return <IdSelset options={taskTypes || []} {...props} />
}
