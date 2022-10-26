import { useMemo } from 'react'
import { useUrlQueryParam } from 'utils/url'

export const useProjectsSearchParams = () => {
	const [param, setParam] = useUrlQueryParam(['name', 'id'])
	return [
		useMemo(() => ({ ...param, id: Number(param.id) || undefined }), [param]),
		setParam,
	] as const
}
