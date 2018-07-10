export class LoggedUser {
    token;
    userName;
    constructor( token, userName ) {
        this.token = token;
        this.userName = userName;
    }
}