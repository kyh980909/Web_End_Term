var game = new Object();
game.seeTime = 5;      // 게임 전 강아지를 볼 수 있는 시간
game.leftTime = 20;     // 게임 시작 후 남은 시간
game.leftDogs = 8;      // 남은 수
game.failCnt = 0;       // 실패수
game.state = false;     // 게임 시작 상태
game.DogsPos = SetRandArr(); // 강아지의 랜덤한 위치를 저장 하는 배열
game.success = false;   // 게임 성공 유무
game.result;            // 게임 결과를 1초에 한번씩 확인 하기 위함
game.infoChange = true; // 정보 텍스트를 변경 하는 변수
game.timeStop;          // 시간을 멈추기 위한 변수
game.end = true;               // 게임 끝을 알려주는 변수

var DogImg = new Image();   // img 객체 생성
DogImg.src = "강아지.jpg";  // img객체의 소스 변경

var EggImg = new Image();  // img 객체 생성
EggImg.src = "달걀.jpg";   // img객체의 소스 변경

var audio = new Audio('bgm.mp3');

function GameStart() {
    valueInit();
    HideStartBt();
    audio.play();
    SetDogs(); 
    SeeTime();
    ChangeInfoText();
    var Delay = setTimeout(LeftTime, 5000);
    var Sleep = setTimeout(ChangeInfoText, 5000);
    game.result = setInterval(GameSuccessCheck, 100);
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

    randNum = game.DogsPos; // 난수 생성 함수를 호출 해서 randNum 배열에 저장

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
    }, 5000);
}

function SeeTime() {  // 게임 시작전 강아지의 위치를 보여줄 수 있는 남은 시간의 변화를 보여주는 함수
    var LeftSeeTimerID = setInterval(LeftSeeTime, 1000);

    function LeftSeeTime() {
        game.seeTime -= 1;
        if(game.seeTime < 1)
            clearInterval(LeftSeeTimerID);
        
        document.getElementById('time').innerHTML="시간 : " + game.seeTime;       
    }
}

function LeftTime() {  // 게임 시작후 남은 시간의 변화를 보여주는 함수
    game.state = true;
    game.timeStop = setInterval(LeftGameTime, 1000);

    function LeftGameTime() {
        game.leftTime -= 1;
        if(game.leftTime < 1)
            clearInterval(game.timeStop);
        
        document.getElementById('time').innerHTML="남은 시간 : " + game.leftTime;       
    }
}

function ChangeInfoText() { // infoText 변경 함수
    if(game.infoChange){
        document.getElementById('infoText').innerHTML="숨은 그림을 보세요";
        game.infoChange = false;
    }
    else
        document.getElementById('infoText').innerHTML="강아지를 찾으세요";
}

function HideStartBt() {    // 게임시작을 한 후 게임시작 버튼을 숨기는 함수
    if(game.end)
        document.getElementById('gameBt').innerHTML="";
    else
        document.getElementById('gameBt').innerHTML="게임 시작";
}

function Click(eggNum) {   // 강아지 클릭 이벤트

    var failCheck = true;  // 강아지 찾기 실패 체크
    var randNum = new Array(8);

    if(game.end)               // 게임이 진행중 일때 game.end는 true로 초기화 해놓았기 때문에 사용가능 게임 끝났을 때 game.end에 false를 넣어서 Click이벤트 비활성화
    {
        if(game.state)         // 게임 시작 후에만 클릭 이벤트가 작동
        {
            randNum = game.DogsPos; // 난수 생성 함수를 호출 해서 randNum 배열에 저장

            for(var i=0; i<8; i++)
            {
                if("egg" + randNum[i] == eggNum)
                {
                    var myDogImg = document.getElementById("egg" + randNum[i]);
                    myDogImg.src = DogImg.src;
                    failCheck = false;  // 찾았을 경우 failCheck에 false를 넣어서 failCnt가 올라가지 않게 함
                    game.leftDogs--;
                    document.getElementById("leftDogs").innerHTML="남은수 : " + game.leftDogs;
                    randNum[i] = "egg" + randNum[i];
                }
            }

            if (failCheck)      // 잘못 찾았을 경우에는 failCheck가 true이므로 failCnt 1증가
            {
                game.failCnt++;
                document.getElementById('failCount').innerHTML="실패수 : " + game.failCnt;
            }     
        }
    }
}

function GameSuccessCheck() {   // 게임 성공 유무 체크
    if(game.failCnt > 4 || game.leftTime == 0)       // 5번 실패 하거나 시간이 다 되었을 때
    {
        clearInterval(game.result);
        GameSuccess();          // 게임 종료 후 성공 유무 함수 호출
    }

    if(game.failCnt < 5 && game.leftTime > 0 && game.leftDogs == 0)
    {
        game.success = true;
        clearInterval(game.result);
        GameSuccess();
    }
}

function GameSuccess() {     // 게임 성공 유무에 따른 결과 함수
    if(game.success) // 게임에 성공 했을 때
    {
        clearInterval(game.timeStop);
        game.end = false;
        document.getElementById('GameSuccess').style.display = "flex";
        HideStartBt();
    }
    else    // 게임 실패
    {
        game.end = false;
        clearInterval(game.timeStop);
        document.getElementById('GameOver').style.display = "flex";
        seeDogs();
        HideStartBt();
        //audio.pause();
    }
}

function valueInit() {      // 게임 값들 초기화 함수
    game.seeTime = 5;       // 게임 전 강아지를 볼 수 있는 시간
    game.leftTime = 20;     // 게임 시작 후 남은 시간
    game.leftDogs = 8;      // 남은 수
    game.failCnt = 0;       // 실패수
    game.state = false;     // 게임 시작 상태
    game.DogsPos = SetRandArr(); // 강아지의 랜덤한 위치를 저장 하는 배열
    game.success = false;   // 게임 성공 유무
    game.result;            // 게임 결과를 1초에 한번씩 확인 하기 위함
    game.infoChange = true; // 정보 텍스트를 변경 하는 변수
    game.timeStop;          // 시간을 멈추기 위한 변수
    game.end = true;        // 게임 끝을 알려주는 변수
    imgReset();
    document.getElementById('GameSuccess').style.display = "none";
    document.getElementById('GameOver').style.display = "none"
    document.getElementById('failCount').innerHTML="실패수 : " + game.failCnt;
    document.getElementById("leftDogs").innerHTML="남은수 : " + game.leftDogs;
    
    for(var i=1; i<25; i++)
    {
        document.getElementById("egg" + i).style.border = "none";
        document.getElementById("egg" + i).style.borderColor = "none";   
    }
}

function imgReset() {
    for(i=1; i<25; i++)
    {
        var myEggImg = document.getElementById("egg" + i);
        myEggImg.src = EggImg.src;
    }
}

function seeDogs() { // 실패시 못찾은 강아지 표시
    
    for(var i=0; i<8; i++)
    {
        if(game.DogsPos[i] > 0 && game.DogsPos[i] < 25 )
        {
            var seedogs = document.getElementById("egg" + game.DogsPos[i]);
            seedogs.src = DogImg.src;
            document.getElementById("egg" + game.DogsPos[i]).style.border = "solid";
            document.getElementById("egg" + game.DogsPos[i]).style.borderColor = "red";
        }
    }
}