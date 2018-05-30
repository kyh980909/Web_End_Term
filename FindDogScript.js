function GameStart(obj) {
        var randNum = new Array();  // 받은 난수의를 저장할 배열 생성 - 중복체크하기 위함
        var i = 0;

    while(i<8)
    {      
        randNum[i] = Math.floor(Math.random() * 24 + 1);    // 1~24까지의 난수 생성
        
        for(var j=0; j<i; j++) {
            if(randNum[i] == randNum[j])   //
            i = i -1;
            break;
        }
        
        var img = new Image();  // img 객체 생성
        img.src = "강아지.jpg";  // img객체의 소스 변경

        var myImg = document.getElementById("egg" + randNum[i]);
        myImg.src = img.src;
        
        i++;
    }
}