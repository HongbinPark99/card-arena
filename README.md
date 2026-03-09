# 🎮 Card Arena - 온라인 카드 배틀 게임

턴제 전략 카드 게임 with 실시간 온라인 멀티플레이

## 📁 프로젝트 구조

```
card-arena/
├── client/              # 클라이언트 (프론트엔드)
│   ├── index.html       # 메인 HTML
│   ├── css/
│   │   └── main.css     # 모든 스타일
│   └── js/
│       └── app.js       # 모든 JavaScript 로직
│
├── server/              # 서버 (백엔드)
│   ├── server.js        # Socket.IO 서버
│   ├── package.json     # 의존성
│   └── .gitignore
│
└── README.md            # 이 파일
```

## 🚀 빠른 시작

### 1. 클라이언트 실행

```bash
cd client
# 브라우저로 index.html 열기
# 또는 Live Server 사용
python -m http.server 8000
```

### 2. 서버 실행

```bash
cd server
npm install
npm start
```

서버가 실행되면:
```
🚀 Card Arena Server running on port 3000
```

### 3. 온라인 기능 활성화

`client/js/app.js`에서 서버 URL 수정:

```javascript
// 로컬 테스트
const SOCKET_SERVER = 'http://localhost:3000';

// 배포 후
const SOCKET_SERVER = 'https://your-server.onrender.com';
```

## 🎮 게임 방법

### 1단계: 계정 생성
- 회원가입하면 스타터 덱 (9종 카드) 제공
- 초기 골드: 500

### 2단계: 카드 수집
- **상점**에서 카드팩 구매
  - Basic Pack: 100골드 (3장)
  - Premium Pack: 300골드 (5장)
  - Legendary Pack: 500골드 (5장, 레어 보장)

### 3단계: 덱 구성
- **덱 빌더**에서 정확히 9장 선택
- 각 카드는 보유 수량만큼 추가 가능
- 3개 덱 슬롯 사용 가능

### 4단계: 게임 시작
- **게임 모드 선택:**
  - 🤖 AI 대전: 컴퓨터와 대결
  - 👥 로컬 대전: 같은 기기에서 2인 대전
  - 🌐 온라인 대전: 친구와 실시간 대결

### 5단계: 배틀
1. 덱에서 3장 선택
2. 각 카드의 행동 선택:
   - ⚔️ **공격**: 적 카드 공격
   - 🛡️ **방어**: 방어 태세
   - ✨ **특수**: 고유 능력 사용
3. 양 플레이어 준비 완료 시 배틀 실행
4. 속도 순서대로 행동 진행
5. 2라운드 승리 시 게임 승리!

## 🃏 카드 시스템

### 카드 스탯
- **HP**: 체력
- **ATK**: 공격력
- **Speed**: 행동 속도 (낮을수록 먼저)

### 카드 등급
- ⚪ **Common** (회색): 기본 카드
- 🔵 **Rare** (파랑): 향상된 능력
- 🟣 **Epic** (보라): 강력한 능력
- 🟡 **Legendary** (금색): 최상급 카드

### 특수 능력 종류
- **enemy_single**: 적 1명 타겟
- **auto**: 자동 실행 (적 전체 등)
- **self**: 자신 또는 아군 버프

## 🌐 온라인 멀티플레이

### 방 생성
1. "온라인 대전" 선택
2. "CREATE ROOM" 클릭
3. 6자리 방 코드 표시
4. 친구에게 코드 공유

### 방 입장
1. "온라인 대전" 선택
2. 방 코드 입력
3. "JOIN ROOM" 클릭
4. 자동으로 게임 시작

## 🛠️ 기술 스택

### 프론트엔드
- **HTML5**: 구조
- **CSS3**: 스타일링, 애니메이션
- **Vanilla JavaScript**: 게임 로직
- **LocalStorage**: 사용자 데이터 저장

### 백엔드
- **Node.js**: 서버 런타임
- **Express**: 웹 프레임워크
- **Socket.IO**: 실시간 통신

## 📦 배포

### 서버 (Render.com)

1. GitHub에 push:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/card-arena.git
git push -u origin main
```

2. Render.com에서:
   - New Web Service
   - Connect GitHub repository
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. 배포 완료 후 URL 확인:
```
https://your-app-name.onrender.com
```

### 클라이언트 (Netlify/Vercel)

1. `client` 폴더만 배포
2. `js/app.js`에서 서버 URL 업데이트:
```javascript
const SOCKET_SERVER = 'https://your-server.onrender.com';
```

## 🐛 문제 해결

### 서버 연결 안 됨
- 서버가 실행 중인지 확인
- `SOCKET_SERVER` URL이 정확한지 확인
- CORS 설정 확인
- Render.com 무료 플랜은 15분 idle 후 슬립 (재시작 30초 소요)

### 카드 선택 안 됨
- 브라우저 콘솔(F12) 확인
- LocalStorage 초기화: `localStorage.clear()`
- 페이지 새로고침

### 온라인 매칭 안 됨
- 양쪽 모두 같은 서버에 연결되어 있는지 확인
- 방 코드 정확히 입력
- 네트워크 연결 확인

## 📝 로드맵

- [ ] 더 많은 카드 추가 (50종 이상)
- [ ] 랭킹 시스템
- [ ] 친구 목록
- [ ] 채팅 기능
- [ ] 모바일 앱 (React Native)
- [ ] AI 난이도 조절
- [ ] 토너먼트 모드

## 📄 라이선스

MIT License

## 👤 개발자

HongbinPark99

## 🙏 감사

이 게임을 플레이해주셔서 감사합니다!

---

**문제가 있거나 제안사항이 있으시면 이슈를 남겨주세요!** 🎮
