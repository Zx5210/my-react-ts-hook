import { Button, Form, Input } from 'antd'
import { AuthForm, useAuth } from 'context/auth-context'

export const LoginScreen = ({ value, setIsRegister, isRegister }: any) => {
	const { login } = useAuth()
	//这种使用 请求方式 + 请求的url地址的这种pathinfo模式形成的api，通常都叫做RESTFull风格的接口api。
	//不符合RESTFull规范的api
	// const login = (param: { username: string; password: string }) => {
	// 	fetch(`${apiURL}/login`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(param),
	// 	}).then(async res => {
	// 		if (res.ok) {
	// 		}
	// 	})
	// }

	// HTMLFormElement extends Element
	const handleSubmit = (values: AuthForm) => {
		login(values)
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
					登录
				</Button>
				<Button onClick={() => setIsRegister(!isRegister)}>
					{isRegister ? '去登录' : '去注册'}
				</Button>
			</div>
		</Form>
	)
}
