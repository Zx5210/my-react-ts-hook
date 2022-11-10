import React from 'react'
import { useUsers } from 'utils/user'
import { IdSelset } from './id-select'

export const UseSelect = (props: React.ComponentProps<typeof IdSelset>) => {
	const { data: users } = useUsers()
	return <IdSelset options={users || []} {...props} />
}
