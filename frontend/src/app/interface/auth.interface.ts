export interface AuthResponseData {
    userID: string,
    userEmail: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean;
}
