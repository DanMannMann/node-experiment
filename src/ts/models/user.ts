export class User {
    constructor(id: number, email: string, name: string, phoneNumbers: string[]) { 
        this.id = id;
        this.email = email;
        this.name = name;
        this.phoneNumbers = phoneNumbers;
    }
    id: number;
    email: string;
    name: string;
    status?: string;
    phoneNumbers: string[];
}
