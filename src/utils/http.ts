import { logout } from 'auth-provider'
import { useAuth } from 'context/auth-context'
import qs from 'qs'

interface Config extends RequestInit {
	token?: string
	data?: object
}
const apiURL = process.env.REACT_APP_API_URL

export const http = async (
	endpoint: string,
	{ data, token, headers, ...customConfig }: Config = {}
) => {
	const config = {
		method: 'GET',
		headers: {
			Authorization: token ? `Bearer${token}` : '',
			'Content-Type': data ? 'appl;ication/json' : '',
		},
		...customConfig,
	}
	if (config.method.toUpperCase() === 'GET') {
		endpoint += `?${qs.stringify(data)}`
	} else {
		config.body = JSON.stringify(data || {})
	}

	//fetch与axios不同
	//fetch请求不为2XX异常不会抛出异常需要手动抛出，只要当断网等异常才会抛出
	return window.fetch(`${apiURL}/${endpoint}`, config).then(async res => {
		if (res.status === 401) {
			await logout()
			window.location.reload()
			return Promise.reject({ msg: '请重新登录！' })
		}
		const data = await res.json()
		if (res.ok) {
			return data
		} else {
			return Promise.reject(data)
		}
	})
}

//需要使用hook就需要把自己也变化hook
//Parameters类型别名 Utility type 工具类型
export const useHttp = () => {
	const { user } = useAuth()
	return (...[endpoint, config]: Parameters<typeof http>) =>
		http(endpoint, { ...config, token: user?.token })
}
