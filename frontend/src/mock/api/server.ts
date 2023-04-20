import {setupServer} from 'msw/node'
import { handlers as tasksHandlers } from './handlers/tasks-api-handler'
import { handlers as authorizationHandlers } from './handlers/authorization-api-handler'
import { handlers as patientsHandlers } from './handlers/patients-api-handler'

export const server = setupServer(
    ...tasksHandlers,
    ...patientsHandlers,
    ...authorizationHandlers
)
