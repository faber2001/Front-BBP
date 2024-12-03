import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SignInService {
    private apiUrl = 'http://192.168.2.11:5500/api/v1/auth/loginActiveDirectory';

    constructor(private http: HttpClient) {}

    sendFormData(data: { sAMAccountName: string; password: string }): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}
