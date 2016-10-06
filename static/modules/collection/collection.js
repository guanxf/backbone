define(function(require,exports,module){
	// 引入图片模块
	var ImgModel = require('modules/model/img');
	// 创建图片集合
	var ImgCollection = Backbone.Collection.extend({
		// 声明视图模型
		model : ImgModel,
		// 给模块添加id,用作路由,用作选取
		ImgId : 0,
		// 定义获取数据的方法
		FetchData : function(){
			var self = this;
			// ajax获取数据
			$.get('data/imageList.json',function(res){
				// 乱序
				res.data.sort(function(){
					return Math.random() > 0.5 ? 1 : -1;
				});
				// 一次给模型添加id
				res.data.forEach(function(obj){
					obj.id = self.ImgId++;
				})
				// 集合添加数据
				self.add(res.data);
			})
		}

	})
	// 暴露集合的接口
	module.exports = ImgCollection;
	//  var ic = new ImgCollection();
	// ic.FetchData();
	// ic.add({
	// 		"title": "精彩建筑摄影作品",
	// 		"url": "img/01.jpg",
	// 		"type": 1,
	// 		"width": 640,
	// 		"height": 400
	// })
})