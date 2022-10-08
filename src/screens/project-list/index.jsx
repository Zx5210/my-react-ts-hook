import qs from 'qs'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils'
const apiURL = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
	const [users, setUsers] = useState([])
	const [param, setParam] = useState({
		name: '',
		id: '',
	})
	const [list, setList] = useState([])
	//包裹一层防抖函数，传入修改的数值和防抖时间
	const debouncedParam = useDebounce(param, 1000)
	useEffect(() => {
		fetch(
			`${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`
		).then(async res => {
			if (res.ok) {
				setList(await res.json())
			}
		})
	}, [debouncedParam])

	// 只执行一次，相当于初始化执行
	useMount(() => {
		fetch(`${apiURL}/users`).then(async res => {
			if (res.ok) {
				setUsers(await res.json())
			}
		})
	})

	return (
		<div>
			<SearchPanel users={users} param={param} setParam={setParam} />
			<List users={users} list={list} />
		</div>
	)
}
