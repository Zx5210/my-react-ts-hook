import { useState } from 'react'
interface Person {
	name: string
	age: number
}

const App = () => {
	const [persons, setPrsons] = useState([
		{
			name: 'zzj',
			age: 23,
		},
		{
			name: 'ddsd',
			age: 25,
		},
	])
	const useArray = (data: Person[]) => {
		return {
			value: data,
			cealr: () => {
				data = []
				setPrsons(data)
			},
			removeIndex: (index: number) => {
				data.splice(index, 1)
				setPrsons([...data])
			},
			add: (obj: Person) => {
				data.push(obj)
				setPrsons([...data])
			},
		}
	}
	const { value, cealr, removeIndex, add } = useArray(persons)

	return (
		<div>
			<button onClick={() => add({ name: 'zx', age: 12 })}>push zx</button>
			<button onClick={() => removeIndex(0)}>remove index</button>
			<button onClick={() => cealr()}>cealr list</button>
			{value.map((item: Person) => {
				return <div key={item.age}>{item.name}</div>
			})}
		</div>
	)
}

export default App
