export class Clean {

    cleanAll() : void {
        localStorage.removeItem('auth_token');
    }
}