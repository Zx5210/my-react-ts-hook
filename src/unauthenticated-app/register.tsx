import { useAuth } from 'context/auth-context'
import { FormEvent } from 'react'

export const RegisterScreen = ({ value }: any) => {
	const { register } = useAuth()

	// HTMLFormElement extends Element
	const handleSubmit = (env: FormEvent<HTMLFormElement>) => {
		env.preventDefault()
		const username = (env.currentTarget.elements[0] as HTMLInputElement).value
		const password = (env.currentTarget.elements[1] as HTMLInputElement).value
		register({ username, password, id: username })
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
			<button type={'submit'}>注册</button>
		</form>
	)
}
