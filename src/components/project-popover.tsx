import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { useProject } from 'utils/project'
import { useProjectModal } from 'utils/url'
import { ButtonNOPadding } from './lib'

export const ProjectPopover = () => {
	const { data: project } = useProject()
	const pinnedProjects = project?.filter(i => i.pin)
	const { open } = useProjectModal()
	const content = (
		<ContentContainer>
			<Typography.Text type={'secondary'}>记录种植</Typography.Text>
			<List>
				{pinnedProjects?.map(i => (
					<List.Item key={i.id}>
						<List.Item.Meta title={i.name} />
					</List.Item>
				))}
			</List>
			<Divider />
			<ButtonNOPadding type={'link'} onClick={open}>
				创建项目
			</ButtonNOPadding>
		</ContentContainer>
	)
	return (
		<Popover content={content} placement={'bottom'}>
			<span>花园</span>
		</Popover>
	)
}
const ContentContainer = styled.div`
	width: 30rem;
`
