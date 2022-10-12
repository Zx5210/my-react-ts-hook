import { Form, Input } from 'antd'
import { AuthForm, useAuth } from 'context/auth-context'
import { LongButton } from 'unauthenticated-app'

export const RegisterScreen = () => {
	const { register } = useAuth()

	// HTMLFormElement extends Element
	const handleSubmit = (values: AuthForm) => {
		register(values)
	}

	return (
		<Form size="large" onFinish={handleSubmit}>
			<div>
				<Form.Item
					name="username"
					rules={[{ required: true, message: '请输入用户名!' }]}
				>
					<Input placeholder="用户名" />
				</Form.Item>
			</div>
			<div>
				<Form.Item
					name="password"
					rules={[{ required: true, message: '请输入密码!' }]}
				>
					<Input.Password placeholder="密码" />
				</Form.Item>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<LongButton size="large" htmlType="submit" type={'primary'}>
					注册
				</LongButton>
			</div>
		</Form>
	)
}
