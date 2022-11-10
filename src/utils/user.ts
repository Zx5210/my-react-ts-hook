import { useEffect } from 'react'
import { User } from 'screens/project-list/search-panel'
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useUsers = () => {
	const { run, ...result } = useAsync<User[]>()
	const client = useHttp()
	useEffect(() => {
		run(client('users'))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return result
}
