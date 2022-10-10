import { useAuth } from 'context/auth-context'
import { FormEvent } from 'react'

export const LoginScreen = ({ value }: any) => {
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
	const handleSubmit = (env: FormEvent<HTMLFormElement>) => {
		env.preventDefault()
		const username = (env.currentTarget.elements[0] as HTMLInputElement).value
		const password = (env.currentTarget.elements[1] as HTMLInputElement).value
		login({ username, password })
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">用户名</label>
				<input id={'username'} type="text"></input>
			</div>
			<div>
				<label htmlFor="password">密码</label>
				<input id={'password'} type="password"></input>
			</div>
			<button type={'submit'}>登录</button>
		</form>
	)
}
