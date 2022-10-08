export const List = ({ list }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>名称</th>
					<th>负责人</th>
				</tr>
			</thead>
			<tbody>
				{list.map(project => (
					<tr key={project.id}>
						<td>{project.name}</td>
						<td>{project.id}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
