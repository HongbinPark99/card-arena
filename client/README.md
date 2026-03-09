# 🎨 Card Arena Client

카드 배틀 게임 프론트엔드

## 📁 파일 구조

```
client/
├── index.html      # 메인 HTML (모든 화면)
├── css/
│   └── main.css    # 통합 스타일시트
└── js/
    └── app.js      # 통합 JavaScript
```

## 🚀 실행 방법

### 방법 1: 직접 열기
```bash
# index.html을 브라우저로 드래그 & 드롭
```

### 방법 2: Live Server (VS Code)
```bash
# VS Code에서 index.html 우클릭 → Open with Live Server
```

### 방법 3: Python HTTP Server
```bash
cd client
python -m http.server 8000
# http://localhost:8000 접속
```

### 방법 4: Node.js HTTP Server
```bash
npx http-server -p 8000
```

## 🔌 서버 연결 설정

`js/app.js` 파일에서 서버 URL 수정:

```javascript
// 로컬 개발
const SOCKET_SERVER = 'http://localhost:3000';

// 배포 환경
const SOCKET_SERVER = 'https://your-app.onrender.com';
```

위치: `js/app.js` 파일 상단 (약 6500번째 줄)

## 🎨 CSS 구조

`css/main.css` 파일은 다음 섹션으로 구성:

1. **CSS Variables** - 색상, 폰트 정의
2. **Base Styles** - Reset, body, 기본 레이아웃
3. **Components** - 버튼, 카드, 모달, 알림
4. **Screens** - 로그인, 메뉴, 상점, 컬렉션, 덱빌더
5. **Battle** - 배틀 화면, 애니메이션, HP 바
6. **Responsive** - 모바일 반응형

## 💻 JavaScript 구조

`js/app.js` 파일 구성:

1. **Data** - 카드 데이터, 상수
2. **State** - currentUser, gameState
3. **Auth** - 로그인, 회원가입, 로그아웃
4. **UI** - 화면 전환, 알림, 업데이트
5. **Shop** - 팩 구매, 오픈
6. **Collection** - 컬렉션 화면
7. **Deck Builder** - 덱 생성, 수정
8. **Game** - 게임 시작, 모드 선택
9. **Battle** - 배틀 시스템, AI
10. **Online** - Socket.IO 연결, 멀티플레이

## 🎮 주요 기능

### LocalStorage 사용
- 사용자 데이터
- 덱 정보
- 카드 컬렉션

### 데이터 구조
```javascript
currentUser = {
    username: 'Player1',
    gold: 500,
    cards: {
        'assault': { count: 2 },
        'shield': { count: 1 }
    },
    decks: {
        1: {
            name: 'My Deck',
            cards: ['assault', 'shield', ...]
        }
    },
    stats: {
        wins: 5,
        losses: 2,
        gamesPlayed: 7
    }
}
```

## 🐛 디버깅

### 브라우저 콘솔 (F12)
```javascript
// 현재 사용자 확인
console.log(currentUser);

// 게임 상태 확인
console.log(gameState);

// LocalStorage 초기화
localStorage.clear();

// 특정 데이터 확인
console.log(localStorage.getItem('currentUser'));
```

### 일반적인 문제

**로그인 안 됨**
```javascript
// LocalStorage 확인
console.log(localStorage.getItem('cardArenaUsers'));

// 데이터 초기화
localStorage.clear();
location.reload();
```

**카드가 안 보임**
```javascript
// 카드 데이터 확인
console.log(CARD_DATA);
console.log(currentUser.cards);
```

**온라인 연결 안 됨**
```javascript
// 소켓 상태 확인
console.log(socket);
console.log(socket.connected);

// 서버 URL 확인
console.log(SOCKET_SERVER);
```

## 📱 모바일 지원

- 반응형 디자인
- 터치 이벤트 지원
- 768px 이하: 태블릿 레이아웃
- 480px 이하: 모바일 레이아웃

## 🎨 커스터마이징

### 색상 변경
`css/main.css`의 `:root` 섹션:
```css
:root {
    --accent-gold: #your-color;
    --accent-orange: #your-color;
    /* ... */
}
```

### 카드 추가
`js/app.js`의 `CARD_DATA` 객체:
```javascript
const CARD_DATA = {
    'new_card': {
        name: '새 카드',
        hp: 10,
        atk: 5,
        // ...
    }
};
```

## 🚀 배포

### Netlify
```bash
# client 폴더 드래그 & 드롭
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```bash
# Repository Settings → Pages
# Source: main branch, /client folder
```

## 📝 TODO

- [ ] CSS 파일 분리 (variables, base, components, screens, battle)
- [ ] JS 파일 분리 (data, auth, shop, deck, game, battle, online)
- [ ] TypeScript 전환
- [ ] 번들러 도입 (Webpack, Vite)
- [ ] PWA 지원

## 🤝 기여

버그 리포트나 기능 제안은 환영합니다!

---

즐거운 게임 되세요! 🎮
