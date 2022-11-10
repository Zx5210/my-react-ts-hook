import styled from '@emotion/styled'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { useProjectModal } from 'screens/project-list/util'
import { useAddProject, useEditProject } from 'utils/project'
import { ErrorBox } from './lib'
import { UseSelect } from './user-select'

export const ProjectModal = () => {
	const { projectMoadlOpen, close, editingProject, projectCreate, isLoading } =
		useProjectModal()

	const title = editingProject ? '编辑' : '种植植物'
	const useMutateProject = editingProject ? useEditProject : useAddProject
	const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()

	const [form] = useForm()
	const onFinish = (formValue: any) => {
		mutateAsync({ ...editingProject, ...formValue }).then(() => {
			form.resetFields()
			close()
		})
	}

	// 当editingProject,form发生改变的时候重新刷新form
	useEffect(() => {
		form.setFieldsValue(editingProject)
		return () => form.resetFields()
	}, [editingProject, form, projectCreate])

	return (
		<Drawer
			forceRender={true}
			width={'100%'}
			open={projectMoadlOpen}
			onClose={close}
		>
			{isLoading ? (
				<Spin size={'large'}></Spin>
			) : (
				<Container>
					<h1>{title}</h1>
					<ErrorBox error={error} />
					<Form
						form={form}
						layout={'vertical'}
						style={{ width: '40rem' }}
						onFinish={onFinish}
					>
						<Form.Item
							label={'植物名'}
							name={'name'}
							rules={[{ required: true, message: '植物名称不能为空' }]}
						>
							<Input placeholder={'请输入植物名称'}></Input>
						</Form.Item>
						<Form.Item label={'栽种人'} name={'ceartNameId'}>
							<UseSelect defaultOptionName={'负责人'}></UseSelect>
						</Form.Item>
						<Form.Item style={{ textAlign: 'right' }}>
							<Button
								loading={mutateLoading}
								type={'primary'}
								htmlType={'submit'}
							>
								提交
							</Button>
						</Form.Item>
					</Form>
				</Container>
			)}
		</Drawer>
	)
}
const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`
