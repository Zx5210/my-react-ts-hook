import { Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

export const RegisterScreen = ({
	onError,
}: {
	onError: (error: Error) => void
}) => {
	const { register } = useAuth()
	const { run } = useAsync(undefined, { throwOnError: true })

	const handleSubmit = async ({
		cpassword,
		...values
	}: {
		cpassword: string
		username: string
		password: string
	}) => {
		if (cpassword !== values.password) {
			onError(new Error('两次输入的密码不一致!'))
			return
		}
		try {
			await run(register(values))
		} catch (e) {
			onError(e as Error)
		}
	}

	return (
		<Form size="large" onFinish={handleSubmit}>
			<Form.Item
				name="username"
				rules={[{ required: true, message: '请输入用户名!' }]}
			>
				<Input placeholder="用户名" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: '请输入密码!' }]}
			>
				<Input.Password placeholder="密码" />
			</Form.Item>
			<Form.Item
				name="cpassword"
				rules={[{ required: true, message: '请确认密码!' }]}
			>
				<Input.Password placeholder="确认密码" />
			</Form.Item>
			<LongButton size="large" htmlType="submit" type={'primary'}>
				注册
			</LongButton>
		</Form>
	)
}
