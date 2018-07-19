let checkLogin = function () {
  return new Promise(function (resolve,reject) {
    let flag = document.cookie.indexOf("userId")>-1?true:false;

    if(flag=true){
      resolve({
        status:0,
        result:true
      })
    }else{
      reject("error");
    }


  })
};

let getUserInfo = ()=>{
  return new Promise((resolve,reject)=>{
    let userInfo = {
      userId:"101"
    }
    resolve(userInfo);
  });
}

checkLogin().then((res)=>{
  if(res.status==0){
    console.log("login success");
    return getUserInfo();
  }
}).catch((error)=>{
  console.log(`errrs:${error}`)
}).then((res2)=>{
  console.log(`userId:${res2.userId}`)
});

Promise.all([checkLogin(),getUserInfo()]).then(([res1,res2])=>{
  console.log(`result1:${res1.result},result2:${res2.userId}`)
})
