function getCsv(url){
  //CSVファイルを文字列で取得
  var txt = new XMLHttpRequest();
  txt.open('get', url, false);
  txt.send();

  //改行ごとに配列化
  var arr = txt.responseText.split('\n');

  //1次元配列を2次元配列に変換
  var res = [];
  for(var i = 0; i < arr.length; i++){
    //空白行が出てきた時点で終了
    if(arr[i] == '') break;

    //","ごとに配列化
    res[i] = arr[i].replace("\r","").split(',');

  }

  return res;
}

// 相対パスを取得するもの
var local = window.location;
var dirCount = strCount(local.pathname, '\/');

function strCount(all, part) {
	return (all.match(new RegExp(part, 'g'))||[]).length;
}
function getDir(place, n) {
	return place.pathname.replace(new RegExp('(?:\\\/+[^\\\/]*){0,' + ((n || 0) + 1) + '}$'), '/');
}

// これが必要だった
function getLevel(n) {
  return "../".repeat(n-1)
}

$(function () {
  // ハンバーガーメニューに内容を入れる
  $('#menuicon').append(`<img src="${getLevel(dirCount)}img/menuicon.svg" alt="TSUKUCHIRI" class="root">`);
  $('#menuicon').attr("href", getLevel(dirCount));
  navis = getCsv(getLevel(dirCount)+"csv/menu.csv");
  navis.shift()
  navis.forEach(element => {
    $('#navi').append(`<li><a href="${getLevel(dirCount)+element[2]}">${element[0]}</a><a href="${getLevel(dirCount)+element[2]}">${element[1]}</a></li>`)
  });
  // ハンバーガーメニューを開閉
  $('.menu-btn').on('click', function() {
    $('menu').toggleClass('is-open');
    $('header').toggleClass('is-open');
  });
  // SNS欄にボタンを入れる
  sns = getCsv(getLevel(dirCount)+"csv/sns.csv");
  sns.shift()

  $('.sns').each(function(){
    sns.forEach(service => {
      $(this).append(`<li><a href="${service[2]}" target="_blank"><img src="${getLevel(dirCount)}img/sns/${service[1]}" alt="${service[0]}"></a></li>`);
    });
  });
});