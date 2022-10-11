import { Card } from 'antd'
import { useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'

export const UnauthenticatedApp = () => {
	const [isRegister, setIsRegister] = useState(false)
	return (
		<Card style={{ width: '300px', left: 'calc(50% - 150px)', top: '100px' }}>
			{isRegister ? (
				<RegisterScreen setIsRegister={setIsRegister} isRegister={isRegister} />
			) : (
				<LoginScreen setIsRegister={setIsRegister} isRegister={isRegister} />
			)}
		</Card>
	)
}
