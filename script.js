const homeTab = document.getElementById('home-tab');
const quizTab = document.getElementById('quiz-tab');
const rankingTab = document.getElementById('ranking-tab');
const registrationTab = document.getElementById('registration-tab');
const loginTab = document.getElementById('login-tab');
const questionCountSelect = document.getElementById('question-count');
const startQuizButton = document.getElementById('start-quiz');
const quizQuestionsContainer = document.getElementById('quiz-questions');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitAnswerButton = document.getElementById('submit-answer');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const backToHomeButton = document.getElementById('back-to-home');
const rankingContainer = document.getElementById('ranking-container');
const rankingElement = document.getElementById('ranking');
const backToHomeFromRankingButton = document.getElementById('back-to-home-from-ranking');
const registerUserButton = document.getElementById('register-user');
const loginUserButton = document.getElementById('login-user');
const logoutUserButton = document.getElementById('logout-user'); // 로그아웃 버튼 추가
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');

let nickname = null;
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let currentQuestion = null; // 현재 문제를 저장할 변수
let isLoggedIn = false; // 로그인 상태 추적

// 퀴즈 데이터 (예시)
const quizData = [
        { question: '설명할 시간 없어!', answers: ['쉘리', '쉘리'] },
        { question: '야성미 폭발', answers: ['니타', '니타'] },
        { question: '얼굴 천재', answers: ['콜트', '콜트'] },
        { question: '불도저!', answers: ['불', '불'] },
        { question: '춤신춤왕', answers: ['브록', '브록'] },
        { question: '엘 루차도르', answers: ['엘 프리모', '앨 프리모'] },
        { question: '맛 좀 봐라!', answers: ['발리', '발리'] },
        { question: '엘 마리아치', answers: ['포코', '포코'] },
        { question: '식물은 내 친구', answers: ['로사', '로사'] },
        { question: '엔지니어', answers: ['제시', '재시'] },
        { question: '버디 버디 버디!', answers: ['다이너마이크', '다이너마이크'] },
        { question: '내 머리 내놔', answers: ['틱', '틱'] },
        { question: '사랑꾼', answers: ['리코', '리코'] },
        { question: '해적왕', answers: ['대릴', '데릴'] },
        { question: '바다의 악동', answers: ['페니', '패니'] },
        { question: '광산카트 라이더', answers: ['칼', '칼'] },
        { question: '#@%**', answers: ['재키', '제키'] },
        { question: '미아', answers: ['거스', '거스'] },
        { question: '깨달은 자', answers: ['보', '보'] },
        { question: '#맞팔', answers: ['엠즈', '앰즈'] },
        { question: '쇼 타임!', answers: ['스튜', '스투'] },
        { question: '스나이퍼', answers: ['파이퍼', '파이퍼'] },
        { question: '든든한 엄마', answers: ['팸', '펨'] },
        { question: '체력만점', answers: ['프랭크', '프렝크'] },
        { question: '걸크러쉬', answers: ['비비', '비비'] },
        { question: '여왕벌', answers: ['비', '비'] },
        { question: '꼼꼼왕', answers: ['나니', '나니'] },
        { question: '브롤스타즈의 CEO', answers: ['에드거', '애드거'] },
        { question: '욕심쟁이', answers: ['그리프', '그리프'] },
        { question: '공포의 팔뚝', answers: ['그롬', '그롬'] },
        { question: '사고뭉치', answers: ['보니', '보니'] },
        { question: '싹쓸이', answers: ['게일', '개일'] },
        { question: '수집광', answers: ['콜레트', '콜래트'] },
        { question: '스타', answers: ['벨', '밸'] },
        { question: '쓰레기 티어', answers: ['애쉬', '에쉬'] },
        { question: '드라마 퀸', answers: ['롤라', '롤라'] },
        { question: '대담한 카운터', answers: ['샘', '셈','쌤'] },
        { question: '말괄량이', answers: ['맨디', '멘디'] },
        { question: '재앙의 마스터', answers: ['메이지', '매이지'] },
        { question: '안녕하새우!', answers: ['행크', '헹크'] },
        { question: '내가 구워줄게!', answers: ['펄', '펄'] },
        { question: '내가 곧 법이야!', answers: ['래리 & 로리', '레리 & 로리','래리로리','래리&로리','레리&로리'] },
        { question: '피가 모자라', answers: ['안젤로', '안잴로'] },
        { question: '유니콘', answers: ['베리', '배리'] },
        { question: '밤의 제왕', answers: ['모티스', '모티스'] },
        { question: '타로 마스터', answers: ['타라', '타라'] },
        { question: '매콤한 손맛', answers: ['진', '진'] },
        { question: '전광석화', answers: ['맥스', '멕스'] },
        { question: '보스', answers: ['미스터 P', '미스터 P','미스터P','미스터피'] },
        { question: '새싹이', answers: ['스프라우트', '스프라우트'] },
        { question: '센세이셔널', answers: ['바이런', '바이런'] },
        { question: '앗, 실수!', answers: ['스퀴크', '스퀴크'] },
        { question: '빙수의 달인', answers: ['루', '루'] },
        { question: '대령', answers: ['러프스', '러프스'] },
        { question: '타고난 악동', answers: ['버즈', '버즈'] },
        { question: '무술 고수', answers: ['팽', '펭'] },
        { question: '시대의 어머니상', answers: ['이브', '이브'] },
        { question: '로켓걸', answers: ['자넷', '자냇'] },
        { question: '예술가', answers: ['오티스', '오티스'] },
        { question: '블록버스터', answers: ['버스터', '버스터'] },
        { question: '마임 아티스트', answers: ['그레이', '그래이'] },
        { question: '감시자', answers: ['R-T', 'R-T','알티','RT',] },
        { question: '마인드 컨트롤', answers: ['윌로우', '윌로우'] },
        { question: '킹소시지', answers: ['더그', '더그'] },
        { question: '마에스트로', answers: ['척', '척'] },
        { question: '어메이징', answers: ['찰리', '찰리'] },
        { question: '내가 우습니?', answers: ['미코', '미코'] },
        { question: '피어리스', answers: ['멜로디', '맬로디'] },
        { question: '뒤통수 조심', answers: ['릴리', '릴리'] },
        { question: '셸 쇼크', answers: ['클랜시', '클랜시'] },
        { question: '치즈 러버', answers: ['모', '모'] },
        { question: '유일무이', answers: ['스파이크', '스파이크'] },
        { question: '까악까악!', answers: ['크로우', '크로우'] },
        { question: '은신의 귀재', answers: ['레온', '래온'] },
        { question: '잠꾸러기', answers: ['샌디', '센디'] },
        { question: '불의 전사', answers: ['앰버', '엠버'] },
        { question: '기술 지원 2.0', answers: ['메그', '매그'] },
        { question: '로봇 형님', answers: ['서지', '서지'] },
        { question: '만능 재주꾼', answers: ['체스터', '채스터'] },
        { question: '중독 주의', answers: ['코델리우스', '코댈리우스'] },
        { question: '야옹', answers: ['키트', '키트'] },
        { question: '던전 마스터', answers: ['드라코', '드라코'] },
        { question: '사무라이', answers: ['켄지', '캔지'] }
];

const askedQuestions = []; // 퀴즈 질문을 담을 배열 (순서대로)

// 탭 전환 기능
homeTab.addEventListener('click', () => {
    showTab('home-container');
});

quizTab.addEventListener('click', () => {
    showTab('quiz-container');
});

rankingTab.addEventListener('click', () => {
    showTab('ranking-container');
});

registrationTab.addEventListener('click', () => {
  showTab('registration-container');
});

loginTab.addEventListener('click', () => {
  showTab('login-container');
});

// 퀴즈 시작
startQuizButton.addEventListener('click', () => {
    if (!isLoggedIn) {
        alert('퀴즈를 시작하려면 로그인해주세요.');
        showTab('login-container');
        return;
    }

    totalQuestions = parseInt(questionCountSelect.value);
    currentQuestionIndex = 0;
    score = 0;

    // 퀴즈 질문 생성
    nextQuestion();

    // 퀴즈 시작 화면 숨기기
    showTab('quiz-questions');
});

// 답변 제출
submitAnswerButton.addEventListener('click', () => {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswers = currentQuestion.answers || [currentQuestion.answer]; 
  let isCorrect = false;

  if (userAnswer === "") {
      alert("답변을 입력해주세요!");
      return; // 답변이 비어있으면 다음 문제로 넘어가지 않고 함수 종료
  }

  for (let i = 0; i < correctAnswers.length; i++) {
    if (userAnswer === correctAnswers[i].toLowerCase()) {
      isCorrect = true;
      break;
    }
  }

  if (isCorrect) {
    score++;
    alert("정답입니다! 🎉"); // 정답 알림
  } else {
    alert("오답입니다! 정답은 " + correctAnswers.join(', ') + " 입니다."); // 오답 알림
  }

  currentQuestionIndex++; // Move to the next question regardless of correct/incorrect

  if (currentQuestionIndex < totalQuestions) {
    // 다음 문제로 이동
    nextQuestion();
  } else {
    // 퀴즈 종료
    showResult();
  }
});

// 결과 화면 표시
backToHomeButton.addEventListener('click', () => {
    showTab('home-container');
});

// 랭킹 화면 표시
backToHomeFromRankingButton.addEventListener('click', () => {
    showTab('home-container');
});

// 사용자 등록 처리
registerUserButton.addEventListener('click', async () => {
  const email = emailInput.value;
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (email === "" || username === "" || password === "") {
    alert("모든 필드를 입력해주세요!");
    return; 
  }

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username, password })
    });

    if (response.ok) {
      // 등록 성공 처리
      alert('회원가입 성공!');
      showTab('login-container'); // 회원가입 후 로그인 화면으로 이동
    } else {
      const errorData = await response.json();
      alert('회원가입 오류:', errorData.error);
    }
  } catch (error) {
    console.error('회원가입 오류:', error);
  }
});

// 사용자 로그인 처리
loginUserButton.addEventListener('click', async () => {
  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  if (email === "" || password === "") {
    alert("이메일과 비밀번호를 입력해주세요!");
    return;
  }

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      // 로그인 성공 처리
      isLoggedIn = true; // 로그인 상태 업데이트
      alert('로그인 성공!');
      showTab('quiz-container'); // 로그인 후 퀴즈 화면으로 이동
      quizTab.style.display = 'inline-block';
      logoutUserButton.style.display = 'inline-block';
    } else {
      const errorData = await response.json();
      alert('로그인 오류:', errorData.error);
    }
  } catch (error) {
    console.error('로그인 오류:', error);
  }
});

// 사용자 로그아웃 처리
logoutUserButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'GET' 
    });

    if (response.ok) {
      // 로그아웃 성공 처리
      isLoggedIn = false; // 로그아웃 상태 업데이트
      alert('로그아웃 성공!');
      showTab('home-container'); // 로그아웃 후 홈 화면으로 이동
      quizTab.style.display = 'none';
      logoutUserButton.style.display = 'none';
    } else {
      const errorData = await response.json();
      console.error('로그아웃 오류:', errorData.error);
    }
  } catch (error) {
    console.error('로그아웃 오류:', error);
  }
});

// 다음 문제로 이동
function nextQuestion() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quizData.length);
  } while (askedQuestions.includes(randomIndex));

  askedQuestions.push(randomIndex);
  currentQuestion = quizData[randomIndex];
  questionElement.textContent = currentQuestion.question;
  answerInput.value = "";
}

// 결과 화면 표시 함수
function showResult() {
    resultElement.textContent = "퀴즈 결과: " + score + " / " + totalQuestions + "\n\n"; // 결과 텍스트 추가
    showTab('result-container');

    // 랭킹 데이터 업데이트 (서버로 전송)
    fetch('/api/ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, score, totalQuestions })
    })
    .then(response => response.json())
    .then(data => {
        console.log('랭킹 데이터 전송 성공:', data.message);
    })
    .catch(error => {
        console.error('랭킹 데이터 전송 오류:', error);
    });

    // 퀴즈 문제 출력
    let output = '';
    for (let i = 0; i < askedQuestions.length; i++) {
        const questionIndex = askedQuestions[i];
        const question = quizData[questionIndex];
        output += `\n${i + 1}. ${question.question}(${question.answers.join(', ')})\n\n`; // 줄 바꿈 추가
    }
    resultElement.textContent += output; // resultElement에 출력
}

// 탭 전환 함수
function showTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });

    document.getElementById(tabId).style.display = 'block';
}

// 랭킹 데이터 가져오기 (서버에서 가져오는 로직 구현)
fetch('/api/ranking')
    .then(response => response.json())
    .then(data => {
        // 서버에서 받은 랭킹 데이터를 사용하여 랭킹 정보를 표시
        rankingElement.textContent = ""; // 랭킹 정보 초기화

        if (data.length === 0) {
            rankingElement.textContent = "아직 랭킹 정보가 없습니다.";
            return;
        }

        // 랭킹 정보 표시 (순위 추가)
        data.sort((a, b) => b.score - a.score); // 점수 기준 내림차순 정렬
        for (let i = 0; i < data.length; i++) {
            rankingElement.textContent += `${i + 1}. ${data[i].nickname}: ${data[i].score}점 (총 ${data[i].totalQuestions}문제)\n`;
        }

        showTab('ranking-container');
    })
    .catch(error => {
        console.error('랭킹 데이터 가져오기 오류:', error);
    });
