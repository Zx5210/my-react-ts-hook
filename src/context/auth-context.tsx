import React, { ReactNode } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageLoading, FullPageErrorFallback } from 'components/lib'

export interface AuthForm {
	username: string
	password: string
	id?: string
}
//初始判断token里面是否有值有的话请求me的接口获取用户消息
const bootstrapUser = async () => {
	let user
	const token = auth.getToken()
	if (token) {
		user = await http('me', { token })
	}
	return user
}

const AuthContext = React.createContext<
	| {
			user: User | null
			login: (form: AuthForm) => Promise<void>
			register: (form: AuthForm) => Promise<void>
			logout: () => Promise<void>
	  }
	| undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

// 指定一个泛型的类型，不是一直为空,使用联合类型
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	// point free
	// .then(user => setUser(user)) 消除参数user
	const login = (form: AuthForm) => auth.login(form).then(setUser)
	const register = (form: AuthForm) => auth.register(form).then(setUser)
	const logout = () => auth.logout().then(() => setUser(null))
	const {
		run,
		isIdle,
		isLoading,
		isError,
		error,
		data: user,
		setData: setUser,
	} = useAsync<User | null>()
	// 初始化请求赋值到用户信息
	useMount(() => {
		run(bootstrapUser())
	})

	if (isIdle || isLoading) {
		return <FullPageLoading />
	}
	console.log(isError, 123)
	if (isError) {
		return <FullPageErrorFallback error={error} />
	}

	return (
		<AuthContext.Provider
			children={children}
			value={{ user, login, register, logout }}
		/>
	)
}

export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth必须在AuthProvider中使用')
	}
	return context
}
