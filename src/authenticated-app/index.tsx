import { Button } from 'antd'
import { logout } from 'auth-provider'
import { ProjectListScreen } from 'screens/project-list'

export const AuthenticatedApp = () => {
	return (
		<div>
			<Button onClick={() => logout()}>登出</Button>
			<ProjectListScreen />
		</div>
	)
}
