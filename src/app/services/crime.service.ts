import { Injectable } from '@angular/core';
import { Crime } from '../Crime';
import { CRIMES } from '../mock-crimes';
import { Observable } from 'rxjs/internal/Observable';
import { map, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CrimeService {
  private apiUrl =
    'https://272.selfip.net/apps/1ExYc9Fy1j/collections/Reports/documents/';
  constructor(private http: HttpClient) {}

  getCrimes(): Observable<Crime[]> {
    return this.http.get<Crime[]>(this.apiUrl);
  }

  deleteCrime(crime: Crime): Observable<Crime> {
    const url = `${this.apiUrl}/${crime.key}`; // Assuming the key is used for deletion
    return this.http.delete<Crime>(url);
  }

  verifyPassword(password: string): Observable<boolean> {
    return this.http
      .get<Object>('https://api.hashify.net/hash/md5/hex?value=' + password)
      .pipe(
        map((data: any) => {
          const hashedPassword = data.Digest;
          return hashedPassword === 'fcab0453879a2b2281bc5073e3f5fe54';
        })
      );
  }
}
