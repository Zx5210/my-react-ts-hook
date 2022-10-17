/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from '@emotion/styled'
import { Button, Card, Divider, Typography } from 'antd'
import { useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'
import left from 'assets/left1.png'
import right from 'assets/right1.png'
import logo from 'assets/logo.png'
import cardbg from 'assets/cardbg.png'

export const UnauthenticatedApp = () => {
	const [isRegister, setIsRegister] = useState(false)
	const [error, setError] = useState<Error | null>(null)
	return (
		<Container>
			<Header>雨林</Header>
			<Background />
			<ShadowCard>
				<Title>{isRegister ? '请注册' : '请登录'}</Title>
				{error ? (
					<Typography.Text type={'danger'}>{error.message} </Typography.Text>
				) : null}
				{isRegister ? (
					<RegisterScreen onError={setError} />
				) : (
					<LoginScreen onError={setError} />
				)}
				<Divider />
				<a onClick={() => setIsRegister(!isRegister)}>
					{isRegister ? '已经有账号了？去登录' : '还没注册？注册新账号'}
				</a>
			</ShadowCard>
		</Container>
	)
}

export const LongButton = styled(Button)`
	width: 100%;
`
const Title = styled.h2`
	margin-bottom: 2.4rem;
	color: rgb(94, 108, 132);
`
const Background = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: left bottom, right bottom;
	background-size: calc((100vw / 2) - 3.2rem), calc((100vw / 2) - 3.2rem);
	background-image: url(${left}), url(${right});
`
const ShadowCard = styled(Card)`
	width: 45rem;
	min-height: 60rem;
	padding: 3.2rem 4rem;
	border-radius: 0.3rem;
	box-sizing: border-box;
	box-shadow: rgba(0, 0, 0, 0.1) 0 10px 10px;
	text-align: center;
	background: url(${cardbg}) no-repeat bottom;
	background-size: 100%;
`
const Header = styled.header`
	background: url(${logo}) no-repeat center;
	background-size: 18rem;
	width: 100%;
	padding: 5rem 0;
	text-align: center;
	color: #fff;
	font-weight: bold;
	font-size: 5rem;
`
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	min-height: 100vh;
`
