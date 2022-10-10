import { List } from './list'
import { SearchPanel } from './search-panel'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'

export const ProjectListScreen = () => {
	const [users, setUsers] = useState([])
	const [param, setParam] = useState({
		name: '',
		id: '',
	})
	const [list, setList] = useState([])
	//包裹一层防抖函数，传入修改的数值和防抖时间
	const debouncedParam = useDebounce(param, 500)
	const client = useHttp()

	useEffect(() => {
		client('projects', cleanObject(debouncedParam)).then(setList)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedParam])

	// 只执行一次，相当于初始化执行
	useMount(() => {
		client('users').then(setUsers)
	})

	return (
		<div>
			<SearchPanel users={users} param={param} setParam={setParam} />
			<List list={list} />
		</div>
	)
}
