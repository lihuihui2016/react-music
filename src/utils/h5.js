// export function authsOutLogin(){
//     for(var s in auths) {
//         auths[s].logout(function(e) {
//             plus.nativeUI.alert("注销登录认证成功!");
//         }, function(e) {
//             plus.nativeUI.alert("注销登录认证失败: " + JSON.stringify(e));
//         });
//     }
// }

// export function  authLogin(id) {
//     console.log(auths)
//     for(var s in auths) {
//         if(auths[s].id == id) {
//             var obj = auths[s];
//             obj.login(function(e) {
//                 plus.nativeUI.alert("登录认证成功!");
//                 obj.getUserInfo(function(e) {
//                     plus.nativeUI.alert("获取用户信息成功：" + JSON.stringify(aweixin.userInfo));
//                 }, function(e) {
//                     plus.nativeUI.alert("获取用户信息失败： " + JSON.stringify(e));
//                 });
//             }, function(e) {
//                 plus.nativeUI.alert("登录认证失败: " + JSON.stringify(e));
//             });
//         }

//     }
// }