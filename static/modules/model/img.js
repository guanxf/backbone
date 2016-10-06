define(function(require,exports,module){
	// 创建图片类
	var ImgModel = Backbone.Model.extend({
		// 构造函数
		initialize : function(){
			// 通过屏幕宽度设置图片的显示宽度
			var w = ($(window).width() - 3*6) / 2;
			// 监听add事件得到模型数据
			this.on('add',function(model){
				// 得到视图中图片的高度
				var h = model.get('height')/ model.get('width') * w;
				// 给模型设置属性,用于给容器添加高度
				model.set({
					viewHeight : h,
					viewWidth : w
				})
			})
		}
		
	})
	// 暴露接口
	module.exports = ImgModel;

	// var ImgCollection = Backbone.Collection.extend({
	// 	model : ImgModel
	// })
	// var ic = new ImgCollection();
	// ic.add({
	// 		"title": "精彩建筑摄影作品",
	// 		"url": "img/01.jpg",
	// 		"type": 1,
	// 		"width": 640,
	// 		"height": 400
	// })
	// console.log(ic)

})