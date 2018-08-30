//操作localStorage

// goods:  [{goodsId: 1, count: 8},{goodsId: 2, count: 1}] 

//读取localStorage中的商品数据
export function getItems() {
  return JSON.parse( localStorage.getItem('goods') || '[]' )
}

//存储商品数据
export function setItem(json) {
  //获取原来的数据
  let array = getItems();

  //假设 本地存储中没有该商品
  let hasGoods = false;
  array.forEach((item) => {
    if(item.goodsId  === json.goodsId) {
      //如果已经存在该商品  加
      item.count += json.count;
      hasGoods = true;
    }
  })

  //如果本地存储没有该商品，添加
  if(!hasGoods) {
    array.push(json);
  }
 
  //存储
  localStorage.setItem('goods', JSON.stringify(array));
}