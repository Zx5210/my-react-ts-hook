import { Drawer } from 'antd'

export const ProjectModal = (props: {
	projectMoadlOpen: boolean
	onClose: () => void
}) => {
	return (
		<Drawer
			width={'100%'}
			open={props.projectMoadlOpen}
			onClose={props.onClose}
		>
			<h2>记录</h2>
		</Drawer>
	)
}
