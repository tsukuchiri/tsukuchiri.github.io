// ニュースに関してのスクリプトを置いておきます

$(function () {
    // 更新情報の読み込み
    updates = getCsv(getLevel(dirCount)+"csv/update.csv");
    updates.shift()
    for (let i = 0; i < updates.length; i++) {
        const update = updates[i];
        const date = update[0].split('/');
        if (update[2] == '') {
            $('#newsTbody').append(`<tr><td>${date[0]}/${('0'+date[1]).slice(-2)}/${('0'+date[2]).slice(-2)}</td><td>${update[1]}</td></tr>`);
        }else{
            $('#newsTbody').append(`<tr><td>${date[0]}/${('0'+date[1]).slice(-2)}/${('0'+date[2]).slice(-2)}</td><td><a href="${getLevel(dirCount)+update[2]}">${update[1]}</a></td></tr>`);
        }
    }
});