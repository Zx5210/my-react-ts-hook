import { useEffect, useState } from 'react'

export const SearchPanel = ({ param, setParam }) => {
	const [users, setUsers] = useState([])

	return (
		<form>
			<input
				typ="text"
				value={param.name}
				onChange={ent =>
					setParam({
						...param,
						name: EventTarget.target.value,
					})
				}
			>
				<select
					value={param.personId}
					onChange={evt =>
						setParam({
							...param,
							personId: evt.target.value,
						})
					}
				>
					<option value={''}>负责人</option>
					{users.map(user => (
						<option value={user.id}>{user.name}</option>
					))}
				</select>
			</input>
		</form>
	)
}
