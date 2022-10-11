import { AuthenticatedApp } from 'authenticated-app'
import { useAuth } from 'context/auth-context'
import { UnauthenticatedApp } from 'unauthenticated-app'
import './App.css'
const App = () => {
	const { user } = useAuth()
	return <div>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>
}

export default App
