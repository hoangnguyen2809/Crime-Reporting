import { Injectable } from '@angular/core';
import { Crime, Location } from '../Crime';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { map, of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CrimeService {
  private apiUrl =
    'https://272.selfip.net/apps/1ExYc9Fy1j/collections/Reports/documents/';

  private newCrimeSubject = new BehaviorSubject<Crime | null>(null);

  constructor(private http: HttpClient) {}

  getCrimes(): Observable<Crime[]> {
    return this.http.get<Crime[]>(this.apiUrl);
  }

  getExistingLocations(): Observable<Location[]> {
    return this.getCrimes().pipe(
      map((crimes: Crime[]) => this.extractUniqueLocations(crimes))
    );
  }

  private extractUniqueLocations(crimes: Crime[]): Location[] {
    const uniqueLocationsMap: Map<string, Location> = new Map();

    crimes.forEach((crime) => {
      const locationKey = `${crime.data.location.latitude},${crime.data.location.longitude}`;
      if (!uniqueLocationsMap.has(locationKey)) {
        uniqueLocationsMap.set(locationKey, crime.data.location);
      }
    });

    return Array.from(uniqueLocationsMap.values());
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

  addCrime(crime: Crime): Observable<Crime> {
    return this.http.post<Crime>(this.apiUrl, crime, httpOptions).pipe(
      tap((addedCrime: Crime) => {
        // When a crime is successfully added, emit it to subscribers
        this.newCrimeSubject.next(addedCrime);
      })
    );
  }
  getNewlyAddedCrime(): Observable<Crime | null> {
    return this.newCrimeSubject.asObservable();
  }
}
