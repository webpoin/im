<?php

/*
	$file_path="upload/";
	//664权限为文件属主和属组用户可读和写，其他用户只读。
	if(is_dir($file_path)!=TRUE) mkdir($file_path,0664) ;

	//定义允许上传的文件扩展名
	$ext_arr = array("gif", "jpg", "jpeg", "png", "bmp", "txt", "zip", "rar");

	if (!empty($_FILES)) {


	    //判断检查
	    if($_FILES["pic"]["size"] > 2097152){
	        exit("对不起，您上传的照片超过了2M。");
	    }

	    if($_FILES["pic"]["error"] > 0){
	        exit("文件上传发生错误：".$_FILES["pic"]["error"]);
	    }

	    //获得文件扩展名
	    $temp_arr = explode(".", $_FILES["pic"]["name"]);
	    $file_ext = array_pop($temp_arr);
	    $file_ext = trim($file_ext);
	    $file_ext = strtolower($file_ext);


	    //检查扩展名
	    if (in_array($file_ext, $ext_arr) === false) {
	        exit("上传文件扩展名是不允许的扩展名。");
	    }



	    /******************以时间戳重命名文件 大数据请重新命名*************************
	    $new_name = time().".".$file_ext;

	    //将文件移动到存储目录下
	    move_uploaded_file($_FILES["pic"]["tmp_name"],"$file_path" . $new_name);



	    //文件上传成功！ 返回路径名
	    echo $file_path.$new_name;

	    exit;
	} else {
	    echo "无文件上传";
	}

*/


	echo 'fuck';
?>