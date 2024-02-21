'use strict';
exports.main = async (event, context) => {
	// event为客户端上传的参数
	console.log(event, context, '===========');
	// 连接users表，get()方法，获取表中所有数据
	const db = uniCloud.database(); // 获取 `user` 集合的引用
	const pro_user = db.collection('pro_user');
	
	const result = await pro_user.where({
		"_id": event.id
	}).get()
	//返回数据给客户端
	return result
};
