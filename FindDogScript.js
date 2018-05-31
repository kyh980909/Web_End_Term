var game = new Object();
game.seeTime = 10;      // 게임 전 강아지를 볼 수 있는 시간
game.leftTime = 20;     // 게임 시작 후 남은 시간
game.leftDogs = 8;      // 남은 수
game.failCnt = 0;       // 실패수
game.state = false;     // 게임 시작 상태

function GameStart() {
    game.state = true;
    var randNum = new Array();  // 받은 난수의를 저장할 배열 생성 - 중복체크하기 위함
    var check;                  // 중복체크 한 변수 선언
    var i = 0;                  // 배열 인덱스용 변수 선언
    
    while(i < 8)
    {      
        check = true;               // true로 초기화

        randNum[i] = Math.floor(Math.random() * 24 + 1);    // 1~24까지의 난수 생성
        
        for(var j=0; j<i; j++)
        {
            if(randNum[j] == randNum[i])   // 각 배열들의 값을 배교해서 같은 값이 있을 경우
            {
                check = false;         // 
                break;
            }
        }
               
        var DogImg = new Image();  // img 객체 생성
        DogImg.src = "강아지.jpg";  // img객체의 소스 변경

        var myDogImg = document.getElementById("egg" + randNum[i]);
        myDogImg.src = DogImg.src;

        if(check)
        i++;
    }

    var timerID = setTimeout(function(){
        for(i=0; i<8; i++)
        {
            var EggImg = new Image();  // img 객체 생성
            EggImg.src = "달걀.jpg";  // img객체의 소스 변경

            var myEggImg = document.getElementById("egg" + randNum[i]);
            myEggImg.src = EggImg.src;
        }
    }, 2000);
    //clearTimeout(timerID);
}

function PrintTime() {
    var LeftGameTimerID = setInterval(LeftGameTime, 1000);

    function LeftGameTime() {
        document.write("시간 " + game.seeTime);
        game.seeTime -= 1;
    }
}