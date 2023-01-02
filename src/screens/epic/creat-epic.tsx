import styled from '@emotion/styled'
import { Button, Drawer, DrawerProps, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ErrorBox } from 'components/lib'
import { useEffect } from 'react'
import { useProjectIdUrl } from 'screens/kanban/util'
import { useAddEpic } from 'utils/epic'
import { useEpicsQueryKey } from './util'

export const CreateEpic = (
	props: Pick<DrawerProps, 'open'> & { onClose: () => void }
) => {
	const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey())
	const [form] = useForm()
	const projectId = useProjectIdUrl()
	const onFinish = async (values: any) => {
		await addEpic({ ...values, projectId })
		props.onClose()
	}

	useEffect(() => {
		form.resetFields()
	}, [form, props.open])

	return (
		<Drawer
			open={props.open}
			onClose={props.onClose}
			forceRender={true}
			width={'100%'}
		>
			<Container>
				{isLoading ? (
					<Spin size={'large'}></Spin>
				) : (
					<Container>
						<h1>创建任务组</h1>
						<ErrorBox error={error} />
						<Form
							form={form}
							layout={'vertical'}
							style={{ width: '40rem' }}
							onFinish={onFinish}
						>
							<Form.Item
								label={'任务名'}
								name={'name'}
								rules={[{ required: true, message: '任务组名称不能为空' }]}
							>
								<Input placeholder={'请输入任务组名称'}></Input>
							</Form.Item>
							<Form.Item style={{ textAlign: 'right' }}>
								<Button
									loading={isLoading}
									type={'primary'}
									htmlType={'submit'}
								>
									提交
								</Button>
							</Form.Item>
						</Form>
					</Container>
				)}
			</Container>
		</Drawer>
	)
}
const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`
