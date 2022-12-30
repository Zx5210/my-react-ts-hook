import { Button, Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { TaskTypeSelect } from 'components/task-type-select'
import { UseSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useDeleteTask, useEditTask } from 'utils/task'
import { useTasksModal, useTasksQueryKey } from './util'

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
}

export const TaskModal = () => {
	const [form] = useForm()
	const { editingTask, editingTaskId, close } = useTasksModal()
	const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
		useTasksQueryKey()
	)
	const { mutate: delTask } = useDeleteTask(useTasksQueryKey())

	const onCancel = () => {
		close()
		form.resetFields()
	}

	const onOk = async () => {
		await editTask({ ...editingTask, ...form.getFieldsValue() })
		close()
	}

	useEffect(() => {
		form.setFieldsValue(editingTask)
	}, [form, editingTask])

	const dleTaskConfirm = () => {
		close()
		Modal.confirm({
			okText: '确定',
			cancelText: '取消',
			title: '是否删除任务?',
			onOk() {
				delTask({ id: Number(editingTaskId) })
			},
		})
	}

	return (
		<Modal
			forceRender={true}
			onCancel={onCancel}
			onOk={onOk}
			okText={'确认'}
			cancelText={'取消'}
			confirmLoading={editLoading}
			title={'编辑任务'}
			open={!!editingTaskId}
		>
			<Form {...layout} initialValues={editTask} form={form}>
				<Form.Item
					label={'任务名'}
					name={'name'}
					rules={[{ required: true, message: '请输入任务名！' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item label={'经办人'} name={'processorId'}>
					<UseSelect defaultOptionName={'经办人'} />
				</Form.Item>
				<Form.Item label={'类型'} name={'typeId'}>
					<TaskTypeSelect />
				</Form.Item>
			</Form>
			<div style={{ textAlign: 'right' }}>
				<Button type={'link'} onClick={dleTaskConfirm}>
					删除
				</Button>
			</div>
		</Modal>
	)
}
