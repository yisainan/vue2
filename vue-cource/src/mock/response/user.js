import Mock from 'mockjs'

const Random = Mock.Random

export const getUserInfo = (options) => {
  const template = {
    'str|2-4': 'lison',
    'name|5': 'lison',
    'age|+2': 18,
    'num|4-10': 0,
    'float|3-10.2-5': 0,
    'bool|1': true,
    'bool2|1-9': true, // min/(min+max)
    'obj|2': {
      a: 'aa',
      b: 'bb',
      c: 'cc'
    },
    'obj2|1-2': {
      a: 'aa',
      b: 'bb',
      c: 'cc'
    },
    'arr|2-4': [1, 2, 3],
    'arr2|2': ['a', 'b'],
    'func': () => {
      return 'this is created by function'
    },
    'reg': /[1-9][a-z]/,
    email: Mock.mock('@email'),
    range: Random.range(3, 10, 2),
    date: Random.date('yyyy-MM-dd'),
    time: Random.time('hh:mm'),
    datetime: Random.datetime('yyyy-MM-dd hh:mm'),
    now: Random.now('hour', 'yyyy-MM-dd a hh:mm'),
    img: Random.image('100x200', '#00ff00', '#ffffff', 'png', 'Lison'),
    img_base64: Random.dataImage(),
    color: Random.color(),
    cword: Random.cword('玩儿螺丝刀', 2, 5),
    cname: Random.cname(),
    email2: Random.email('lison.com'),
    region: Random.region(),
    province: Random.province(),
    city: Random.city(true),
    county: Random.county(true),
    zip: Random.zip(),
    upperFirstLetter: Random.capitalize('lison'),
    pick: Random.pick([1, 2, 3, 4]),
    shuffle: Random.shuffle([1, 2, 3, 4]),
    guid: Random.guid(),
    fruit: Random.fruit(),
    fruit2: '@fruit'
  }
  return Mock.mock(template)
}

export const login = () => {
  return {
    code: 200,
    data: {
      token: 'xxx'
    },
    mes: ''
  }
}

export const authorization = () => {
  return {
    code: 200,
    data: {
      token: 'xxx',
      rules: {
        page: {
          home: true,
          home_index: true,
          about: true,
          argu: true,
          count_to: true,
          menu_page: true,
          upload: true,
          form: false,
          folder_tree: true,
          table_page: true,
          params: true,
          component: true,
          render_page: true,
          split_pane: true,
          parent: true,
          child: true,
          named_view: true,
          store: true,
          main: true
        },
        component: {
          edit_button: true,
          publish_button: false
        }
      }
    },
    mes: ''
  }
}
