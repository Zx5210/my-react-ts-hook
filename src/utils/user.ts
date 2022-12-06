import { useEffect } from 'react'
import { User } from "types/user"
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useUsers = () => {
  const { run, ...result } = useAsync<User[]>()
  const client = useHttp()
  useEffect(() => {
    run(client('users'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return result
}
