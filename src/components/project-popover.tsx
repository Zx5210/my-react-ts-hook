import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { Project } from 'screens/project-list/list'
import { useProjectModal } from 'screens/project-list/util'
import { useProjects } from 'utils/project'

import { ButtonNOPadding } from './lib'

export const ProjectPopover = () => {
	const { data: project } = useProjects()
	const pinnedProjects = project?.filter((i: Project) => i.pin)
	const { open } = useProjectModal()
	const content = (
		<ContentContainer>
			<Typography.Text type={'secondary'}>记录种植</Typography.Text>
			<List>
				{pinnedProjects?.map((i: Project) => (
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
