import { User } from 'screens/project-list/search-panel'
const apiURL = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
	window.localStorage.setItem(localStorageKey, user.token || '')
	return user
}

export const login = (param: { username: string; password: string }) => {
	return fetch(`${apiURL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(param),
	}).then(async res => {
		if (res.ok) {
			return handleUserResponse(await res.json())
		} else {
			return Promise.reject(param)
		}
	})
}

export const register = (param: { username: string; password: string }) => {
	return fetch(`${apiURL}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(param),
	}).then(async res => {
		if (res.ok) {
			return handleUserResponse(await res.json())
		} else {
			return Promise.reject(param)
		}
	})
}

export const logout = async () => {
	window.localStorage.removeItem(localStorageKey)
}