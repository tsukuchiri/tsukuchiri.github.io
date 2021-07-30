$(function() {

 $(document).ready(function() {
  var hSize = $(window).height();
  var wSize = $(window).width();
  $('body').height(hSize); // アドレスバーを除いたサイズを付与
  $('body').width(wSize); // アドレスバーを除いたサイズを付与
 });

 $(window).resize(function() { // ページをリサイズした時の処理
  var hSize = $(window).height();
  var wSize = $(window).width();
  $('body').height(hSize); // アドレスバーを除いたサイズを付与
  $('body').width(wSize); // アドレスバーを除いたサイズを付与
 });

});

//csv変換装置
function getCsv(url){
  //CSVファイルを文字列で取得。
  var txt = new XMLHttpRequest();
  txt.open('get', url, false);
  txt.overrideMimeType('text/plain; charset=Shift_JIS');
  txt.send();
  console.log(txt);
  //改行ごとに配列化
  var arr = txt.responseText.split('\n');

  //1次元配列を2次元配列に変換
  var res = [];
  for(var i = 0; i < arr.length; i++){
    //空白行が出てきた時点で終了
    if(arr[i] == '') break;

    //","ごとに配列化
    res[i] = arr[i].split(',');
    for(var i2 = 0; i2 < res[i].length; i2++){
      //数字の場合は「"」を削除
      if(res[i][i2].match(/\-?\d+(.\d+)?(e[\+\-]d+)?/)){
        res[i][i2] = parseFloat(res[i][i2].replace('"', ''));
      }
    }
  }

  return res;
}

function init() {
 setTimeout(function() {
  //地図を表示するdiv要素のidを設定
  var map = L.map('mapcontainer');
  //地図の中心とズームレベルを指定
  map.setView([36.0829681, 140.1147268], 9);
  //表示するタイルレイヤのURLとAttributionコントロールの記述を設定して、地図に追加する
  L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
   attribution: "<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>地理院タイル</a>"
  }).addTo(map);
  //スケールコントロールを最大幅200px、右下、m単位で地図に追加
  L.control.scale({
   maxWidth: 200,
   position: 'bottomright',
   imperial: false
  }).addTo(map);
  //マーカーの書式設定
  var dIcon = L.icon({
   iconUrl: '../img/dIcon.svg',
   iconRetinaUrl: '../img/dIcon.svg',
   iconSize: [30, 30],
   iconAnchor: [15, 15],
   popupAnchor: [0, -20],
  });

  //マーカーのリスト
  var markerList = getCsv("markerList.csv");
  console.log(markerList);
  //マーカーを追加
  for (var ml of markerList) {
   L.marker([ml[0], ml[1]], {
    icon: dIcon
   }, {
    title: ml[2]
   }).bindPopup(ml[3]).bindTooltip(ml[2], {
    offset: L.point(20, 0)
   }).addTo(map);
  }

 }, 100);
};
