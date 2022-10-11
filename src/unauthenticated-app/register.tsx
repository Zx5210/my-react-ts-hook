import { Button, Form, Input } from 'antd'
import { AuthForm, useAuth } from 'context/auth-context'

export const RegisterScreen = ({ value, setIsRegister, isRegister }: any) => {
	const { register } = useAuth()

	// HTMLFormElement extends Element
	const handleSubmit = (values: AuthForm) => {
		register(values)
	}

	return (
		<Form onFinish={handleSubmit}>
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
				<Button htmlType="submit" type={'primary'}>
					注册
				</Button>
				<Button onClick={() => setIsRegister(!isRegister)}>
					{isRegister ? '去登录' : '去注册'}
				</Button>
			</div>
		</Form>
	)
}
