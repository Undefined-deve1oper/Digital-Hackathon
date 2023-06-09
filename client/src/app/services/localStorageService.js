const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USER_ID_KEY = "user-local-id";

export function setTokens({
    userId,
    accessToken,
    refreshToken,
    expiresIn = 3600
}) {
    const expiresDate = (new Date().getTime() + expiresIn * 1000).toString();

    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(USER_ID_KEY, userId);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
    return localStorage.getItem(USER_ID_KEY);
}

export function removeAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(USER_ID_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData
};

export default localStorageService;
