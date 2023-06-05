import { defineMock } from 'vite-plugin-mock-dev-server'

import view from './modules/view.mock'
import domainLimit from './modules/domainLimit.mock'

export default defineMock([...view, ...domainLimit])
