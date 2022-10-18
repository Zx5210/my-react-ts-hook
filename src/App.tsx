import { AuthenticatedApp } from 'authenticated-app'
import { ErrorBundary } from 'components/error-boundary'
import { FullPageErrorFallback } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { UnauthenticatedApp } from 'unauthenticated-app'
import './App.css'
const App = () => {
	const { user } = useAuth()
	return (
		<ErrorBundary fallbackRender={FullPageErrorFallback}>
			{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</ErrorBundary>
	)
}

export default App
