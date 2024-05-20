export class FileUpload {
    id: string;
    email: string;
    username: string;
    password: string;
    fileData: File;
  
    constructor(id: string, email: string, username: string, password: string, fileData: File) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.fileData = fileData;
    }
}
