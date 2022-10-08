import { useEffect, useState } from 'react'

export const isFalsy = val => (val === 0 ? false : !val)

// 判断对象是否有空值，返回一个新对象，不能污染原有对象

// 判断什么时候使用hook什么时候使用函数，看函数里面需不需要使用hook，如果不需要就当函数需要就用hook
export const cleanObject = obj => {
	const result = { ...obj }
	Object.keys(obj).forEach(key => {
		const val = result[key]
		if (isFalsy(val)) {
			delete result[key]
		}
	})
	return result
}

// useMount
export const useMount = callback => {
	useEffect(() => {
		callback()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

// 防抖 在固定时间内，多次触发，时间重新计算，只执行最后一次
// 节流 在固定时间内，多次触发，时间不变，只执行第一次
// debounce
// export const debounce = (func, delay) => {
// 	let timeout
// 	return () => {
// 		if (timeout) {
// 			clearTimeout(timeout)
// 		}
// 		timeout = setTimeout(() => {
// 			func()
// 		}, delay)
// 	}
// }
// 使用hook修改debounce
export const useDebounce = (value, delay) => {
	// 接收参数后创建新的useStata
	const [debouncedValue, setDebouncedValue] = useState(value)
	// 监听value和delay的变化
	useEffect(() => {
		// 每次监听到变化设置一个定时器
		let timeout = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)
		// 清除副作用，在上一个useEffect处理完后运行
		return () => clearTimeout(timeout)
	}, [value, delay])
	return debouncedValue
}
