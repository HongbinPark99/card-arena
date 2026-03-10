# 🎮 Card Arena - Unified Deployment

**턴제 카드 배틀 게임 - Render.com 원클릭 배포**

---

## 🚀 **빠른 배포 (Render.com)**

### **1. GitHub에 업로드**

```bash
git init
git add .
git commit -m "Initial commit: Card Arena Unified"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/card-arena.git
git push -u origin main
```

### **2. Render.com 배포**

1. https://render.com 접속 및 로그인
2. **New +** → **Web Service**
3. **Connect GitHub** → 저장소 선택
4. 설정:
   ```
   Name:              card-arena
   Environment:       Node
   Build Command:     npm install
   Start Command:     npm start
   Root Directory:    (비워둠)
   ```
5. **Create Web Service** 클릭
6. 배포 완료! (2-3분 소요)

### **3. 게임 시작**

배포 완료 후:
```
https://your-app-name.onrender.com
```

접속하면 **바로 게임 화면** 표시! 🎮

---

## 📁 **프로젝트 구조**

```
card-arena-unified/
├── server.js              # Express + Socket.IO 서버
├── package.json           # 의존성
├── .gitignore
├── README.md
│
└── client/                # 게임 클라이언트
    ├── index.html         # 메인 HTML
    ├── css/
    │   └── main.css       # 스타일
    └── js/
        └── app.js         # 게임 로직
```

---

## 🎯 **특징**

### **통합 배포**
- ✅ 서버 + 클라이언트 하나로 통합
- ✅ Render.com 한 번에 배포
- ✅ 별도의 정적 호스팅 불필요

### **자동 연결**
- ✅ 클라이언트가 자동으로 같은 서버에 연결
- ✅ CORS 설정 불필요
- ✅ URL 하드코딩 불필요

---

## 🔧 **로컬 실행**

```bash
# 의존성 설치
npm install

# 서버 실행
npm start

# 브라우저 접속
# http://localhost:10000
```

---

## 🌐 **URL 구조**

배포 후 URL:

```
https://your-app.onrender.com/
├── /              → 게임 화면 (index.html)
├── /css/main.css  → 스타일시트
├── /js/app.js     → 게임 로직
├── /api           → 서버 상태 API
└── /api/health    → 헬스 체크 API
```

---

## 🎮 **게임 기능**

- **로그인/회원가입**: LocalStorage 기반
- **상점**: 카드팩 구매
- **컬렉션**: 보유 카드 확인
- **덱 빌더**: 9장 덱 구성
- **게임 모드**:
  - 🤖 AI 대전
  - 👥 로컬 대전
  - 🌐 온라인 대전

---

## 📋 **Render.com 설정 확인**

배포 성공을 위한 필수 설정:

```
┌─────────────────────────────────────┐
│ Build & Deploy                      │
├─────────────────────────────────────┤
│ Root Directory:    (비워둠)         │
│ Build Command:     npm install      │
│ Start Command:     npm start        │
│ Environment:       Node             │
│ Auto-Deploy:       Yes ✓            │
└─────────────────────────────────────┘
```

---

## 🐛 **문제 해결**

### **1. Build 실패**
```bash
# Logs 확인
# package.json이 있는지 확인
# Root Directory가 비어있는지 확인
```

### **2. 게임 화면 안 나옴**
```bash
# server.js에서 정적 파일 제공 코드 확인
# client 폴더 구조 확인
```

### **3. 온라인 대전 안 됨**
```bash
# F12 → Console 확인
# Socket.IO 연결 상태 확인
# 브라우저 콘솔: console.log(socket.connected)
```

---

## 🔍 **API 엔드포인트**

### **GET `/api`**
서버 상태 확인
```json
{
  "status": "online",
  "uptime": 12345,
  "rooms": 3,
  "connections": 6,
  "timestamp": "2026-03-09T14:00:00.000Z"
}
```

### **GET `/api/health`**
헬스 체크
```json
{
  "status": "healthy",
  "rooms": ["ABC123", "DEF456", "GHI789"]
}
```

---

## 📝 **환경 변수**

Render.com에서 자동 설정:
```
PORT=10000  (자동)
```

추가 환경 변수 불필요!

---

## 🚀 **배포 후 확인**

1. ✅ https://your-app.onrender.com 접속
2. ✅ 게임 로그인 화면 표시
3. ✅ 회원가입 테스트
4. ✅ AI 대전 테스트
5. ✅ 온라인 대전 테스트 (2개 브라우저 탭)

---

## 💡 **장점**

### **통합 배포의 장점:**
- ✅ 하나의 서버로 모든 기능 제공
- ✅ 배포 간단 (Render.com만 필요)
- ✅ 관리 쉬움 (하나의 저장소)
- ✅ 비용 절감 (서버 1개만 사용)

### **분리 배포와 비교:**
```
통합:
  Render.com → 게임 화면 + API
  (1개 서비스)

분리:
  Render.com → API 서버
  Netlify → 게임 화면
  (2개 서비스)
```

---

## 🎉 **완료!**

이제 Render.com에 배포하면 바로 게임이 작동해!

```
https://your-app.onrender.com
```

**접속 → 게임 시작! 🎮**

---

## 📞 **문제가 있나요?**

1. Render.com Logs 확인
2. 브라우저 콘솔 (F12) 확인
3. GitHub Issues에 문의

---

**즐거운 게임 되세요! 🎮**
