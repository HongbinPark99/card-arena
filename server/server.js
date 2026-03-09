// Card Arena Socket.IO Server
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// 방 관리
const rooms = new Map();
const waitingPlayers = [];

// 6자리 방 코드 생성
function generateRoomCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}

io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);
    
    // 방 생성
    socket.on('createRoom', (data) => {
        const roomCode = generateRoomCode();
        
        rooms.set(roomCode, {
            host: socket.id,
            hostUsername: data.username,
            guest: null,
            guestUsername: null,
            hostDeck: null,
            guestDeck: null,
            hostActions: null,
            guestActions: null
        });
        
        socket.join(roomCode);
        socket.roomCode = roomCode;
        
        console.log(`🏠 Room created: ${roomCode} by ${data.username}`);
        
        socket.emit('roomCreated', {
            roomCode: roomCode,
            username: data.username
        });
    });
    
    // 방 입장
    socket.on('joinRoom', (data) => {
        const room = rooms.get(data.roomCode);
        
        if (!room) {
            socket.emit('error', { message: 'Room not found!' });
            console.log(`❌ Room not found: ${data.roomCode}`);
            return;
        }
        
        if (room.guest) {
            socket.emit('error', { message: 'Room is full!' });
            console.log(`❌ Room full: ${data.roomCode}`);
            return;
        }
        
        room.guest = socket.id;
        room.guestUsername = data.username;
        socket.join(data.roomCode);
        socket.roomCode = data.roomCode;
        
        console.log(`🚪 ${data.username} joined room: ${data.roomCode}`);
        
        // 게스트에게 입장 확인
        socket.emit('roomJoined', {
            roomCode: data.roomCode,
            username: data.username
        });
        
        // 호스트에게 게스트 입장 알림
        io.to(room.host).emit('opponentJoined', {
            username: data.username
        });
    });
    
    // 플레이어 준비 (카드 선택 완료)
    socket.on('playerReady', (data) => {
        const room = rooms.get(data.roomCode);
        if (!room) return;
        
        const isHost = room.host === socket.id;
        
        if (isHost) {
            room.hostDeck = data.selectedCards;
            console.log(`✅ Host ready in ${data.roomCode}`);
        } else {
            room.guestDeck = data.selectedCards;
            console.log(`✅ Guest ready in ${data.roomCode}`);
        }
        
        // 양쪽 모두 준비되었는지 확인
        if (room.hostDeck && room.guestDeck) {
            console.log(`🎮 Both players ready in ${data.roomCode}, starting game!`);
            
            // 양쪽에게 게임 시작 알림
            io.to(data.roomCode).emit('bothPlayersReady', {
                hostDeck: room.hostDeck,
                guestDeck: room.guestDeck
            });
        }
    });
    
    // 액션 제출
    socket.on('submitActions', (data) => {
        const room = rooms.get(data.roomCode);
        if (!room) return;
        
        const isHost = room.host === socket.id;
        
        if (isHost) {
            room.hostActions = data.actions;
            console.log(`⚔️ Host submitted actions in ${data.roomCode}`);
        } else {
            room.guestActions = data.actions;
            console.log(`⚔️ Guest submitted actions in ${data.roomCode}`);
        }
        
        // 양쪽 모두 액션 제출했는지 확인
        if (room.hostActions && room.guestActions) {
            console.log(`💥 Both submitted, executing battle in ${data.roomCode}`);
            
            // 호스트에게 게스트 액션 전송
            io.to(room.host).emit('opponentActions', {
                actions: room.guestActions,
                deck: room.guestDeck
            });
            
            // 게스트에게 호스트 액션 전송
            io.to(room.guest).emit('opponentActions', {
                actions: room.hostActions,
                deck: room.hostDeck
            });
            
            // 액션 초기화
            room.hostActions = null;
            room.guestActions = null;
        }
    });
    
    // 방 나가기
    socket.on('leaveRoom', (data) => {
        const room = rooms.get(data.roomCode);
        if (room) {
            // 상대방에게 알림
            socket.to(data.roomCode).emit('opponentLeft');
            rooms.delete(data.roomCode);
            console.log(`🚪 Room closed: ${data.roomCode}`);
        }
    });
    
    // 연결 종료
    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
        
        // 해당 플레이어가 속한 방 찾기
        if (socket.roomCode) {
            const room = rooms.get(socket.roomCode);
            if (room) {
                // 상대방에게 알림
                socket.to(socket.roomCode).emit('opponentLeft');
                rooms.delete(socket.roomCode);
                console.log(`🚪 Room closed due to disconnect: ${socket.roomCode}`);
            }
        }
    });
});

// 상태 확인 엔드포인트
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        rooms: rooms.size,
        connections: io.engine.clientsCount
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        uptime: process.uptime(),
        rooms: rooms.size
    });
});

http.listen(PORT, () => {
    console.log(`🚀 Card Arena Server running on port ${PORT}`);
});
