import { useSearchParams } from 'react-router-dom'
/**
 * 获取url中的搜索字段
 * */
export const useUrlQueryParam = (keys: string[]) => {
	const [searchParams, setSearchParam] = useSearchParams()
	return [
		keys.reduce((prev: { [key: string]: string }, key: string) => {
			return { ...prev, [key]: searchParams.get(key) || '' }
		}, {} as { [key in string]: string }),
		setSearchParam,
	] as const
}
