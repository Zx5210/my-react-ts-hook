import styled from '@emotion/styled'
import { Menu } from 'antd'
import { Route, Routes, Navigate, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { EpicScreen } from 'screens/epic'
import { KanbanScreen } from 'screens/kanban'
const useRouteType = () => {
	const untis = useLocation().pathname.split('/')
	return untis[untis.length - 1]
}
export const ProjectScreen = () => {
	const selectKes = useRouteType()
	return (
		<Container>
			<Aside>
				<Menu
					selectedKeys={[selectKes]}
					mode={'inline'}
					items={[
						{
							label: <Link to={'kanban'}>看板</Link>,
							key: 'kanban',
						},
						{
							label: <Link to={'epic'}>任务组</Link>,
							key: 'epic',
						},
					]}
				/>
			</Aside>
			<Main>
				<Routes>
					<Route path="*" element={<Navigate to={'kanban'} replace={true} />} />
					<Route path={'/kanban'} element={<KanbanScreen />} />
					<Route path={'/epic'} element={<EpicScreen />} />
				</Routes>
			</Main>
		</Container>
	)
}
const Aside = styled.aside`
	background-color: rgb(244, 245, 247);
	display: flex;
`
const Main = styled.div`
	display: flex;
	box-shadow: -5px 0 5px -5px rgb(0, 0, 0, 0.1);
	overflow: hidden;
`
const Container = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: 16rem 1fr;
`
