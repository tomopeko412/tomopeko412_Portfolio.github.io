//画面表示の処理
let showmap = () => {
  let elem = document.querySelector('#screen');
  let chip = map[y][x];
  if (chip == 'G' || chip == 'S') {
    elem.innerHTML = '<img src="img/' + images[chip] + '.png">';
    if (chip == 'S' && gameover_flag == false) {
      postProcessing('行き止まりだ...  Ctrl+Rを押してやり直そう!', 1);
      // addMessage('行き止まりだ...  Ctrl+Rを押してやり直そう!');
      gameover_flag = true;
    } else if (chip == 'G' && gameover_flag == false) {
      postProcessing('出口だ！これでおうちに帰れるぞ(*≧∀≦*)', 1)
      postProcessing('Cntl+Rでもう一度遊べるよ!', 1);
      // addMessage('出口だ！これでおうちに帰れるぞ(*≧∀≦*)');
      // addMessage('Cntl+Rでもう一度遊べるよ!');
      // trajectory.push('出口だ！これでおうちに帰れるぞ(*≧∀≦*)');
      // trajectory.push('Cntl+Rでもう一度遊べるよ!');
      gameover_flag = true;
    }
  }
  else if (chip == 'K') {
    elem.innerHTML = '<img src="img/key.png">';
    keyflag = true
    map[y][x] = '―'
    postProcessing('鍵を拾った！', 1)
    // addMessage('鍵を拾った！')
  } else if (chip == 'D') {
    elem.innerHTML = '<img src ="img/door.png">';
    if (keyflag == true) {
      map[y][x] = '―';
      elem.innerHTML = '<img src="img/left_right.png">' + '<img src="img/boy.png">'
    }
  }
  else {
    elem.innerHTML = '<img src="img/' + images[chip] + '.png"><img src="img/boy.png">';
  }
}

//画面下部のセリフ処理
let addMessage = (mes) => {
  let list = document.querySelector('#dialogue');
  mes = '<li>' + mes + '</li>';
  list.insertAdjacentHTML('afterbegin', mes)
}

//テキストログの追加処理 2022/10/15追加実装 >>>
let addLog = (TextLog) => {
  let list = document.querySelector('#text-log-list');
  TextLog = '<li>' + TextLog + '</li>';
  list.insertAdjacentHTML('beforeend', TextLog)
}
//テキストログの追加処理 2022/10/15追加実装 <<<

//可読性向上のための関数追加 2022/10/15 >>>
//移動時の後処理
let postProcessing = (direction, id) => {
  if (id == 0) {
    direction += 'に進んだ'
  }
  addMessage(direction)
  addLog(direction);
  trajectory.push(direction);
}
//可読性向上のための関数追加 2022/10/15 <<<

let trajectory = ['ここはどこ？', '出口を探さなくっちゃ！'];   //移動ログ表示用の配列
let gameover_flag = false;                                  //ゴールしたかどうかの管理フラグ

showmap();

for (let i of trajectory) {
  addMessage(i);
  addLog(i);
};


document.addEventListener('keyup', (box) => {
  const keyname = box.key;        //どのキーが押されたかを保存する変数
  //チャットログ表示火表示の切り替え 2022/10/15 >>>
  let $sub1 = document.querySelector('.text-log')
  //チャットログ表示火表示の切り替え 2022/10/15 <<<
  // console.log(keyname)
  if ($sub1.classList.contains('is-show') == false) {
    if (gameover_flag == false) {
      let elem = document.querySelector('#history');
      let fname = images[map[y][x]];
      if (keyname === 'ArrowLeft' || keyname === 'a') {
        if (fname.indexOf('left') > -1) {
          x -= 1;
          postProcessing('左', 0)
        }
      } else if (keyname === 'ArrowRight' || keyname === 'd') {
        if (fname.indexOf('right') > -1) {
          x += 1
          postProcessing('右', 0)
        }
      } else if (keyname === 'ArrowUp' || keyname === 'w') {
        if (fname.indexOf('up') > -1) {
          y -= 1
          postProcessing('上', 0)
        }
      } else if (keyname === 'ArrowDown' || keyname === 's') {
        if (fname.indexOf('down') > -1) {
          y += 1
          postProcessing('下', 0)
        }
      }
      showmap();
    }
  } 

  //チャットログ表示火表示の切り替え 2022/10/15 >>>
  if (keyname === 'T' || keyname === 't') {
    $sub1.classList.toggle('is-show')
    // console.log($sub1.classList)
  } else if (keyname === 'Escape') {
    $sub1.classList.remove('is-show')
  }
  if ($sub1.classList.contains('is-show')) { //存在確認
    //マップ機能実相寺現在位置を表示するように 2022/10/15

    //チャットログのスクロールを一番下にする 2022/10/16追記
    let scroll_bottom = document.getElementById('text-log-list')
    let list_height = scroll_bottom.scrollHeight;
    let ul_height = scroll_bottom.offsetHeight;
    // scroll_bottom.scrollIntoView(false);
    scroll_bottom.scrollTo(0, list_height);

    //ulの高さによってスクロールバーの表示非表示を切り替え 2022/10/16 追記
    // let text_height = scroll_bottom.scrollHeight
    if (list_height <= ul_height) {
      // console.log(ul_height)
      let edit_style = document.styleSheets.item(0)//CSSファイルの取得
      for (let css_fname of edit_style.ownerNode.attributes) {
        if (css_fname.nodeValue === 'map.css') {
          console.log(edit_style)
          for (let css_class of edit_style.cssRules) {
            if (css_class.selectorText == '.text-log ul') { //セレクター「.text-log ul」を変更する
              css_class.style.setProperty('overflow', 'hidden')
            }
            // console.log(css_class.selectorText)
          }
        }
      }
    }
    // console.log(list_height);
  }
  //チャットログ表示火表示の切り替え 2022/10/15 <<<

});
