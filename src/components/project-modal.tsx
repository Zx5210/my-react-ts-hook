import { Button, Drawer } from 'antd'
import { useProjectModal } from 'utils/url'

export const ProjectModal = () => {
	const { projectMoadlOpen, close } = useProjectModal()
	return (
		<Drawer width={'100%'} open={projectMoadlOpen} onClose={close}>
			<h2>记录</h2>
			<Button onClick={close}>关闭</Button>
		</Drawer>
	)
}
