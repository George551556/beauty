(function(){
	var $ = function(id){
		return document.getElementById(id);
	};

	var ToBeauty = function(obj){
		var fc = 5;
		var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		window.Miao.Beauty(imgData,fc);
		ctx.putImageData(imgData, 0, 0);
		ctx.globalCompositeOperation="destination-over";
		ctx.drawImage(obj, 0, 0, canvas.width, canvas.height);
	};

	var SetCanvasSize = function(width,height){
		var scale = height / width;
		var defaultScale = defaultHeight / defaultWidth;
		if ( scale > defaultScale && height > defaultHeight ){
			height = defaultHeight;
			width = height / scale;
		}
		if ( scale > defaultScale && width > defaultWidth ){
			width = defaultWidth;
			height = width * scale;
		}
		canvas.width = width;
		canvas.height = height;
	};

	var DrawImage = function(obj){
		new SetCanvasSize(obj.width,obj.height);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(obj, 0, 0, canvas.width, canvas.height);
		new ToBeauty(obj);
	};

	function downloadCanvasImage() {
        console.log('helo download');
        var a = document.createElement("a");
        a.download = "beautified-image.png"; // 设置下载文件的默认名称
        a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 将canvas转换为图片数据URL
        a.click(); // 模拟点击下载
    }

	var canvas        =    $('canvas'),
		drop          =    $('drop'),
		downloadbtn   =    $('downloadBtn'),
		defaultWidth  =    480,
		defaultHeight =    360,
		ctx  		  =    canvas.getContext('2d');

	downloadbtn.addEventListener('click', downloadCanvasImage, false);
	
	drop.addEventListener('drop',function(e){
		e.preventDefault();
		drop.innerHTML = '';
		var file = e.dataTransfer.files[0];
		var reader = new FileReader();
		reader.onload = function(e){
			var image = new Image();
			image.onload = function(){
				new DrawImage(this);
			};
			image.src = e.target.result;
		};
		reader.readAsDataURL(file);
	}, false);
    drop.addEventListener('dragover', function(e){
        e.preventDefault();
    }, false);
    drop.addEventListener('dragenter', function(e){
        e.preventDefault();
    }, false);

}());