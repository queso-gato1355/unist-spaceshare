import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

// access token 발급
export function generateAccessToken(userId) {
    return jwt.sign({id: userId}, JWT_SECRET, { expiresIn: '1h' });
}

// access token 검증
export function verifyAccessToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

// refresh token 발급
export function generateRefreshToken(userId) {
    return jwt.sign({id: userId}, JWT_SECRET, { expiresIn: '7d' });
}

// refresh token 검증
export function verifyRefreshToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

// refresh token 갱신
export function refreshAccessToken(token) {
    const { id } = verifyRefreshToken(token);
    return generateAccessToken(id);
}

// access token 검증 후 userId 반환
export function getUserId(token) {
    const { id } = verifyAccessToken(token);
    return id;
}

// cookie에 토큰 저장
export function setTokenCookie(token) {
    return `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`;
}

// cookie에서 토큰 삭제
export function removeTokenCookie() {
    return `token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}

// cookie에서 토큰 가져오기
export function getTokenCookie(cookie) {
    return cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
}