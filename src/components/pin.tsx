import { Rate } from 'antd'

interface PinProps extends React.ComponentProps<typeof Rate> {
	checked: boolean
	onCheckedChange?: (pin: number) => void
}

export const Pin = (props: PinProps) => {
	const { checked, onCheckedChange, ...restProps } = props
	return (
		<Rate
			count={1}
			value={checked ? 1 : 0}
			onChange={pin => {
				onCheckedChange?.(pin)
			}}
			{...restProps}
		></Rate>
	)
}
