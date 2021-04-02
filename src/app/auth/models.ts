export class User {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    token: string;

    constructor(user){
        this.pk= user.pk
        this.username = user.username
        this.email = user.email
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.token = user.token
    }
}