export const SearchPanel = ({ users, param, setParam }) => {
	return (
		<form>
			<input
				typ="text"
				value={param.name}
				onChange={ent =>
					setParam({
						...param,
						name: ent.target.value,
					})
				}
			/>
			<select
				value={param.id}
				onChange={evt =>
					setParam({
						...param,
						id: evt.target.value,
					})
				}
			>
				<option value={''}>负责人</option>
				{users.map(user => (
					<option key={user.id} value={user.id}>
						{user.name}
					</option>
				))}
			</select>
		</form>
	)
}
