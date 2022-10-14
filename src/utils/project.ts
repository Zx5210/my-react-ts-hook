import { useEffect } from 'react'
import { Project } from 'screens/project-list/list'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useProject = (param?: Partial<Project>) => {
	const { run, ...result } = useAsync<Project[]>()
	const client = useHttp()
	useEffect(() => {
		const { id, name } = cleanObject(param || {})
		run(client('projects', { data: { ceartNameId: id, name } }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param])
	return result
}
