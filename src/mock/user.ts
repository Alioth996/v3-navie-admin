import Mock from 'mockjs'

interface AuthModel {
    token: string
    cookie: string
    ip: string
}


interface UserModel extends AuthModel {
    uuid: string
    name: string
    password: string
    username: string
    age: number
}

//随机生成数据的对象
const Random = Mock.Random;

// 模拟token
export const token = Random.string('upper', 32, 32);

export const userList: UserModel[] = [
    {
        uuid: crypto.randomUUID(),
        name: '@cname()',
        password: 'admin',
        username: 'admin',
        age: 18,
        token: '__ADMIN__TOKEN',
        cookie: '__ADMIN_COOKIE',
        ip: '@ip()'
    },
    {
        uuid: crypto.randomUUID(),
        name: '@cname()',
        password: 'admin',
        username: 'admin',
        age: 18,
        token: '__ADMIN__TOKEN',
        cookie: '__ADMIN_COOKIE',
        ip: '@ip()'
    },
    {
        uuid: crypto.randomUUID(),
        name: '@cname()',
        password: 'admin',
        username: 'admin',
        age: 18,
        token: '__ADMIN__TOKEN',
        cookie: '__ADMIN_COOKIE',
        ip: '@ip()'
    },
    {
        uuid: crypto.randomUUID(),
        name: '@cname()',
        password: 'admin',
        username: 'admin',
        age: 18,
        token: '__ADMIN__TOKEN',
        cookie: '__ADMIN_COOKIE',
        ip: '@ip()'
    },
    {
        uuid: crypto.randomUUID(),
        name: '@cname()',
        password: 'admin',
        username: 'admin',
        age: 18,
        token: '__ADMIN__TOKEN',
        cookie: '__ADMIN_COOKIE',
        ip: '@ip()'
    }
]