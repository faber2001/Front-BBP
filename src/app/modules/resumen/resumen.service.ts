import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  private apiUrl = 'http://192.168.2.11:5500/api/v1/hojadevida/guardar';

  constructor(private http: HttpClient) {}

  sendFormDataAsJson(formData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, formData, { headers });
  }
}
