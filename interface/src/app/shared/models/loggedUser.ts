export class LoggedUser {
    token;
    username;
    constructor( username, token ) {
        this.token = token;
        this.username = username;
    }
}