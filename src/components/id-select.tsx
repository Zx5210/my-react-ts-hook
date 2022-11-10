import { Select } from 'antd'
import { Raw } from 'types'

type SelectProps = React.ComponentProps<typeof Select>

// Omit删除SelectProps里面和自定义冲突的类型并返回新的类型
interface IdSelectProps
	extends Omit<
		SelectProps,
		'value' | 'onChange' | 'defaultOptionName' | 'options'
	> {
	value?: Raw | null | undefined
	onChange?: (value?: number) => void
	defaultOptionName?: string
	options?: { name: string; id: number }[]
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))

/**
 * Numder类型的select组件
 * value 可以传入多种类型的值
 * onChange只返回unmder和undefined类型
 * @param props
 * @constructor
 */
export const IdSelset = (props: IdSelectProps) => {
	const { value, onChange, defaultOptionName, options } = props
	return (
		<Select
			value={toNumber(value)}
			onChange={value => onChange?.(toNumber(value) || undefined)}
		>
			{defaultOptionName ? (
				<Select.Option value={0}>{defaultOptionName}</Select.Option>
			) : null}
			{options?.map(option => (
				<Select.Option value={option.id} key={option.id}>
					{option.name}
				</Select.Option>
			))}
		</Select>
	)
}
