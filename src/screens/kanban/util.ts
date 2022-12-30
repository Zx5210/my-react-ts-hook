import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router'
import { cleanObject, useDebounce } from 'utils'
import { useProject } from 'utils/project'
import { useTask } from 'utils/task'
import { useUrlQueryParam } from 'utils/url'

export const useProjectIdUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdUrl() })

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTaskSearchParams = () => {
  const [param] = useUrlQueryParam([
    'name', 'typeId', 'processorId', 'tagId'
  ])
  const projectId = useProjectIdUrl()
  const debounsedName = useDebounce(param.name, 200)
  return useMemo(() => ({
    projectId,
    typeId: Number(param.typeId) || undefined,
    processorId: Number(param.processorId) || undefined,
    tagId: Number(param.tagId) || undefined,
    name: debounsedName
  }), [projectId, param, debounsedName])
}

export const useTasksQueryKey = () => ['tasks', cleanObject(useTaskSearchParams())]

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
  const startEdit = useCallback((id: number) => {
    setEditingTaskId({ editingTaskId: id })
  }, [setEditingTaskId])
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: undefined })
  }, [setEditingTaskId])

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  }
}
