import { logout } from 'auth-provider'
import { ProjectListScreen } from 'screens/project-list'

export const AuthenticatedApp = () => {
	return (
		<div>
			<div onClick={() => logout()}>登出</div>
			<ProjectListScreen />
		</div>
	)
}
