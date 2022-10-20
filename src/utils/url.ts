import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
/**
 * 获取url中的搜索字段
 * */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
	const [searchParams, setSearchParam] = useSearchParams()
	return [
		useMemo(
			() =>
				keys.reduce((prev, key) => {
					return { ...prev, [key]: searchParams.get(key) || '' }
				}, {} as { [key in K]: string }),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[searchParams]
		),
		setSearchParam,
	] as const
}
