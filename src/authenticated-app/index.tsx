/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from '@emotion/styled'
import logo from 'assets/logo.png'
import { Dropdown, Menu } from 'antd'
import { ProjectListScreen } from 'screens/project-list'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { Route, Routes, Navigate } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { restRoute } from 'utils'
import { ProjectModal } from 'components/project-modal'
import { ProjectPopover } from 'components/project-popover'
import { UserPopover } from 'components/user-popover'

export const AuthenticatedApp = () => {
	return (
		<Container>
			<Router>
				<PageHeader />
				{/* <Nav>Nav</Nav> */}

				<Main>
					<Routes>
						<Route
							path="*"
							element={<Navigate to="/projects" replace={true} />}
						/>
						<Route path={'/projects'} element={<ProjectListScreen />} />
						<Route
							path={'/projects/:projectId/*'}
							element={<ProjectScreen />}
						/>
					</Routes>
				</Main>
				{/* <Aside>Aside</Aside> */}
				{/* <Footer>Footer</Footer> */}
				<ProjectModal />
			</Router>
		</Container>
	)
}
const PageHeader = () => {
	const { user, logout } = useAuth()
	const menu = (
		<Menu
			items={[
				{
					label: <a onClick={logout}>登出</a>,
					key: 'logout',
				},
			]}
		/>
	)
	return (
		<Header>
			<HeaderLeft gap={true} between={true} weight={false}>
				<a type={'link'} onClick={restRoute}>
					<Logo>雨林</Logo>
				</a>
				<ProjectPopover />
				<UserPopover />
			</HeaderLeft>
			<HeaderRight>
				<Dropdown overlay={menu}>
					<a onClick={e => e.preventDefault()}>Hi,{user?.name}</a>
				</Dropdown>
			</HeaderRight>
		</Header>
	)
}

const Container = styled.div`
	display: grid;
	height: 100vh;
	overflow: hidden;
	grid-template-rows: 6rem 1fr;
	grid-template-columns: 1fr;
	grid-row-gap: 0.1rem;
	grid-template-areas:
		'header header header'
		'main main main';
	/* 'footer footer footer'; */
`
const HeaderLeft = styled(Row)`
	color: #333;
	span {
		font-size: 2rem;
	}
`
const HeaderRight = styled.div``
const Logo = styled.div`
	color: #fff;
	font-size: 4rem;
	font-weight: bold;
	width: 15rem;
	text-align: center;
	background: url(${logo}) no-repeat center;
	background-size: 100%;
`

const Header = styled.header`
	grid-area: header;
	display: flex;
	padding: 0 3.2rem;
	justify-content: space-between;
	align-items: center;
	box-shadow: rgba(0, 0, 0, 0.1) 0 0.1rem;
`
const Main = styled.main`
	grid-area: main;
	display: flex;
`
// const Nav = styled.nav`
// 	grid-area: nav;
// `
// const Aside = styled.aside`
// 	grid-area: aside;
// `
/* const Footer = styled.footer`
	grid-area: footer;
` */
