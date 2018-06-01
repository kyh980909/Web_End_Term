var game = new Object();
game.seeTime = 10;      // 게임 전 강아지를 볼 수 있는 시간
game.leftTime = 20;     // 게임 시작 후 남은 시간
game.leftDogs = 8;      // 남은 수
game.failCnt = 0;       // 실패수
game.state = false;     // 게임 시작 상태

var DogImg = new Image();  // img 객체 생성
DogImg.src = "강아지.jpg";  // img객체의 소스 변경

var EggImg = new Image();  // img 객체 생성
EggImg.src = "달걀.jpg";  // img객체의 소스 변경

function GameStart() {
    HideStartBt();
    SetDogs(); 
    SeeTime();
    var Delay = setTimeout(LeftTime, 10000);
    ChangeInfoText();
}

function SetRandArr() {         // 난수 생성한 후 반환
    var randNum = new Array(8);  // 받은 난수의를 저장할 배열 생성 - 중복체크하기 위함
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
                check = false;             // check를 거짓으로 바꾼후 for문을 탈출
                break;
            }
        }    
        if(check)                          // check가 참이면 i를 증가하고 check가 거짓이면 i를 증가 안하고 다시 난수를 받음
            i++;
    }

    return randNum;
}

function SetDogs() {        // 강아지 위치 설정  

    var randNum = new Array(8);

    randNum = SetRandArr(); // 난수 생성 함수를 호출 해서 randNum 배열에 저장

    for(var k=0; k<8; k++)
    {
        var myDogImg = document.getElementById("egg" + randNum[k]);
        myDogImg.src = DogImg.src;
    }

    var timerID = setTimeout(function(){
        for(i=0; i<8; i++)
        {
            var myEggImg = document.getElementById("egg" + randNum[i]);
            myEggImg.src = EggImg.src;
        }
    }, 10000);
}

function SeeTime() {  // 게임 시작전 강아지의 위치를 보여줄 수 있는 남은 시간의 변화를 보여주는 함수
    var LeftSeeTimerID = setInterval(LeftSeeTime, 1000);

    function LeftSeeTime() {
        if(game.seeTime < 2)
            clearInterval(LeftSeeTimerID);
        game.seeTime -= 1;
        document.getElementById('time').innerHTML="시간 " + game.seeTime;       
    }
}

function LeftTime() {  // 게임 시작후 남은 시간의 변화를 보여주는 함수
    var LeftGameTimerID = setInterval(LeftGameTime, 1000);

    function LeftGameTime() {
        if(game.leftTime < 2)
            clearInterval(LeftGameTimerID);
        game.leftTime -= 1;
        document.getElementById('time').innerHTML="시간 " + game.leftTime;       
    }
}

function ChangeInfoText() { // infoText 변경 함수
    document.getElementById('infoText').innerHTML="숨은 그림을 보세요";
}

function HideStartBt() {    // 게임시작을 한 후 게임시작 버튼을 숨기는 함수
    document.getElementById('gameBt').innerHTML="";
}