import { List } from './list'
import { SearchPanel } from './search-panel'

export const ProjectListScreen = () => {
	const [param, setParam] = useState({
		name: '',
		personId: '',
	})
	const [list, setList] = useState([])

	useEffect(() => {
		fetch('').then(async res => {
			if (res.ok) {
				setList(await res.json())
			}
		})
	}, [param])

	return (
		<div>
			<SearchPanel param={param} setParam={setParam} />
			<List list={list} />
		</div>
	)
}
