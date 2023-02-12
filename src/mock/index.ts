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
const token = Random.string('upper', 32, 32);

const userList: UserModel[] = [
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

const useMock = () => {
  Mock.mock('/mock/login', {
      code:'200',
      message:'登录成功',
      token
  })
    Mock.mock('/mock/user',userList )
}

export default useMock
