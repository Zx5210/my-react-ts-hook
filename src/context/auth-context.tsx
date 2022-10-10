import React, { ReactNode, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'

export interface AuthForm {
	username: string
	password: string
	id?: string
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
	const [user, setUser] = useState<User | null>(null)
	// point free
	// .then(user => setUser(user)) 消除参数user
	const login = (form: AuthForm) => auth.login(form).then(setUser)
	const register = (form: AuthForm) => auth.register(form).then(setUser)
	const logout = () => auth.logout().then(() => setUser(null))

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
