# 🚀 Card Arena Server

Socket.IO 기반 실시간 멀티플레이 게임 서버

## 📦 설치

```bash
npm install
```

## 🎮 실행

### 개발 모드
```bash
npm start
```

### 프로덕션 모드
```bash
NODE_ENV=production npm start
```

## 🌐 API 엔드포인트

### GET `/`
서버 상태 확인
```json
{
  "status": "online",
  "uptime": 12345,
  "rooms": 5,
  "connections": 10,
  "timestamp": "2026-03-08T12:00:00.000Z"
}
```

### GET `/health`
헬스 체크
```json
{
  "status": "healthy",
  "rooms": ["ABC123", "DEF456"]
}
```

## 🔌 Socket.IO 이벤트

### Client → Server

#### `createRoom`
방 생성
```javascript
socket.emit('createRoom', {
    username: 'Player1'
});
```

#### `joinRoom`
방 입장
```javascript
socket.emit('joinRoom', {
    roomCode: 'ABC123',
    username: 'Player2'
});
```

#### `playerReady`
카드 선택 완료
```javascript
socket.emit('playerReady', {
    roomCode: 'ABC123',
    selectedCards: ['assault', 'shield', 'healer']
});
```

#### `submitActions`
액션 제출
```javascript
socket.emit('submitActions', {
    roomCode: 'ABC123',
    actions: {
        p0: { action: 'attack', target: 'e0', speed: 3 },
        p1: { action: 'defend', target: null, speed: 1 },
        p2: { action: 'special', target: 'e1', speed: 5 }
    }
});
```

#### `leaveRoom`
방 나가기
```javascript
socket.emit('leaveRoom', {
    roomCode: 'ABC123'
});
```

### Server → Client

#### `roomCreated`
방 생성 완료
```javascript
socket.on('roomCreated', (data) => {
    console.log(data.roomCode); // "ABC123"
});
```

#### `roomJoined`
방 입장 완료
```javascript
socket.on('roomJoined', (data) => {
    console.log(data.roomCode, data.opponent);
});
```

#### `opponentJoined`
상대방 입장
```javascript
socket.on('opponentJoined', (data) => {
    console.log(data.username);
});
```

#### `bothPlayersReady`
양쪽 준비 완료
```javascript
socket.on('bothPlayersReady', (data) => {
    console.log(data.hostDeck, data.guestDeck);
});
```

#### `opponentActions`
상대방 액션 수신
```javascript
socket.on('opponentActions', (data) => {
    console.log(data.actions, data.deck);
});
```

#### `opponentLeft`
상대방 퇴장
```javascript
socket.on('opponentLeft', () => {
    console.log('Opponent disconnected');
});
```

#### `error`
에러 발생
```javascript
socket.on('error', (data) => {
    console.error(data.message);
});
```

## 🏗️ 데이터 구조

### Room 객체
```javascript
{
    host: 'socket-id-1',
    hostUsername: 'Player1',
    guest: 'socket-id-2',
    guestUsername: 'Player2',
    hostDeck: ['assault', 'shield', 'healer'],
    guestDeck: ['mage', 'ninja', 'warrior'],
    hostActions: { p0: {...}, p1: {...}, p2: {...} },
    guestActions: { p0: {...}, p1: {...}, p2: {...} },
    createdAt: 1234567890
}
```

## 🔧 환경 변수

```env
PORT=3000
NODE_ENV=production
```

## 📊 로그

서버 실행 시 로그:
```
✅ User connected: abc123
🏠 Room created: ABC123 by Player1
🚪 Player2 joined room: ABC123
✅ Host ready in ABC123
✅ Guest ready in ABC123
🎮 Both players ready in ABC123, starting game!
⚔️ Host submitted actions in ABC123
⚔️ Guest submitted actions in ABC123
💥 Both submitted, executing battle in ABC123
❌ User disconnected: abc123
🗑️ Room deleted: ABC123
```

## 🚀 배포 (Render.com)

1. GitHub repository 생성
2. Render.com → New Web Service
3. 설정:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`

## 🐛 디버깅

### 로컬 테스트
```bash
# 터미널 1: 서버 실행
npm start

# 터미널 2: 연결 테스트
curl http://localhost:3000
```

### 방 상태 확인
```bash
curl http://localhost:3000/health
```

## 📝 주의사항

- 방은 1시간 후 자동 삭제
- 무료 플랜: 15분 idle 후 슬립
- 재연결 시 기존 방 정보 손실

## 🔒 보안

- CORS 설정: 모든 origin 허용 (프로덕션에서는 제한 권장)
- 방 코드: 6자리 랜덤 (충돌 가능성 낮음)
- 세션 관리: Socket ID 기반

## 📈 성능

- 동시 접속: 수천 명 가능
- 방 개수: 무제한 (메모리 허용 범위)
- 레이턴시: < 100ms (일반적)

## 🤝 기여

이슈나 PR은 언제나 환영합니다!

---

Made with ❤️ for Card Arena
