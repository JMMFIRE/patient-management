// Establish API mocking before all tests.
import {server} from './mock/api/server'
// Since Jest runs tests in the node.js environment, and we test the code meant to run in the browser,
// the browser globals like fetch / Headers / Request are not available there.
// We need to add these polyfills to fix it.
import 'cross-fetch/polyfill'

beforeAll(() => {
    console.log('Setting up test server')
    server.listen()
})


// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
    server.resetHandlers()
})

// Clean up after the tests are finished.
afterAll(() => server.close())
