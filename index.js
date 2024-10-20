const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // 파일 시스템 모듈 추가
const crypto = require('crypto'); // 암호화 모듈 추가
const app = express();
const PORT = process.env.PORT || 3000;
const rankingsFile = 'rankings.json'; // 랭킹 데이터를 저장할 파일 이름
const usersFile = 'users.json'; // 사용자 데이터를 저장할 파일 이름

let rankings = []; // 랭킹 데이터를 저장할 배열
let users = []; // 사용자 데이터를 저장할 배열

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // public 폴더의 정적 파일 제공

// 서버 시작 시 랭킹 데이터를 불러오는 함수
function loadRankings() {
  try {
    const data = fs.readFileSync(rankingsFile, 'utf8');
    rankings = JSON.parse(data);
  } catch (err) {
    console.error('랭킹 데이터 로딩 오류:', err);
    rankings = []; // 파일이 없으면 빈 배열로 초기화
  }
}

// 랭킹 데이터를 파일에 저장하는 함수
function saveRankings() {
  try {
    fs.writeFileSync(rankingsFile, JSON.stringify(rankings), 'utf8');
  } catch (err) {
    console.error('랭킹 데이터 저장 오류:', err);
  }
}

// 서버 시작 시 사용자 데이터를 불러오는 함수
function loadUsers() {
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.error('사용자 데이터 로딩 오류:', err);
    users = []; // 파일이 없으면 빈 배열로 초기화
  }
}

// 사용자 데이터를 파일에 저장하는 함수
function saveUsers() {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users), 'utf8');
  } catch (err) {
    console.error('사용자 데이터 저장 오류:', err);
  }
}

// 비밀번호 해싱 함수
function hashPassword(password) {
  return crypto.scryptSync(password, 'salt', 32).toString('hex'); // 'salt'를 조정할 수 있습니다.
}

// 서버 시작 시 랭킹 및 사용자 데이터를 불러옵니다.
loadRankings();
loadUsers();

app.post('/api/ranking', (req, res) => {
  const { nickname, score, totalQuestions } = req.body;
  rankings.push({ nickname, score, totalQuestions });
  saveRankings(); // 랭킹 데이터를 파일에 저장
  res.json({ message: "랭킹이 저장되었습니다." });
});

app.get('/api/ranking', (req, res) => {
  res.json(rankings);
});

// 사용자 등록 API 엔드포인트
app.post('/api/register', (req, res) => {
  const { email, username, password } = req.body;

  // 이메일이 이미 존재하는지 확인
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: '이메일이 이미 존재합니다.' });
  }

  // 비밀번호 해싱
  const hashedPassword = hashPassword(password);

  // 새로운 사용자를 users 배열에 추가
  users.push({ email, username, password: hashedPassword });
  saveUsers(); // 사용자 데이터를 파일에 저장

  res.json({ message: '사용자 등록 성공' });
});

// 사용자 로그인 API 엔드포인트
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // 이메일로 사용자 검색
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ error: '잘못된 이메일 또는 비밀번호' });
  }

  // 제공된 비밀번호와 해싱된 비밀번호 비교
  const isValidPassword = crypto.timingSafeEqual(
    Buffer.from(user.password, 'hex'),
    Buffer.from(hashPassword(password), 'hex')
  );

  if (!isValidPassword) {
    return res.status(401).json({ error: '잘못된 이메일 또는 비밀번호' });
  }

  // 세션 설정 (세션 관리 라이브러리가 필요합니다)
  // (예: Express 세션 또는 유사한 라이브러리 사용)
  // res.session.user = user; 

  res.json({ message: '로그인 성공' });
});

// 사용자 로그아웃 API 엔드포인트
app.get('/api/logout', (req, res) => {
  // 세션 삭제
  // req.session.destroy();

  res.json({ message: '로그아웃' });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
