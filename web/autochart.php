<?php
	header('Cache-Control: post-check=0, pre-check=0');
	header('Content-type: text/javascript');  


	// get接收内容与回调函数
	// 返回json 或者callback格式
	

	// $rand = rand(0, 15);
	function random_str(){
	    //生成一个包含 大写英文字母, 小写英文字母, 数字 的数组
	    $arr = array_merge(range(0, 9), range('a', 'z'), range('A', 'Z'));
	    $str = '';
	    $arr_len = count($arr);
	    $length = rand(5, 50);
	    for ($i = 0; $i < $length; $i++)
	    {
	        $rand = mt_rand(0, $arr_len-1);
	        $str.=$arr[$rand];
	    }
	    return $str;
	}

	// $res->x  = 'fuck';
	$res = array();


	if(empty($_GET["msg"])){

		if(rand(0, 15)>14){
			$res['type'] = 'server';
			$res['value'] = '随机'.random_str();
		}else{
			$res['type'] = 'emp';
			$res['value'] = '空值';
		}

	}else{
		// $res['type'] = 'msg';
		$res['type'] = 'server';
		$res['value'] = 'server返回'.$_GET["msg"];
	}


	if(empty($_GET['callback'])){
		echo 'eval('.json_encode($res).');';
		// echo '{abc:"abc"}';
	}else{
		echo $_GET['callback'].'('.json_encode($res).');';
	}


	



?>