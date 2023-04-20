import {rest} from 'msw'

const testUser = {
    userId: 1,
    email: 'massottoj@envisionpharma.com',
    password: 'test',
    firstName: 'Jacob',
    lastName: 'Massotto',
    role: 'General Doctor'
}
type LoginRequestBody = {
    email: string,
    password: string
}

export const handlers = [
    rest.post<LoginRequestBody>('http://localhost:8080/users/login', (req, res, ctx) => {
        const { email, password } = req.body

        if (email === testUser.email && password === testUser.password) {
            return res(ctx.status(200), ctx.json(testUser))
        }
        else {
            return res(ctx.status(500))
        }
    })
]
