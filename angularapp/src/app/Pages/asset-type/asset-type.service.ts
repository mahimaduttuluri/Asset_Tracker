import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetType, AssetTypeUpsert } from './asset-type.model';

@Injectable({ providedIn: 'root' })
export class AssetTypeService {
  private http = inject(HttpClient);

  // ✅ Update base URL to match your .NET controller route
  private baseUrl = 'http://localhost:5065/api/AssetType';

  getAll(): Observable<AssetType[]> {
    return this.http.get<AssetType[]>(this.baseUrl);
  }

  create(payload: AssetTypeUpsert): Observable<AssetType> {
    return this.http.post<AssetType>(this.baseUrl, payload);
  }

  update(id: number, payload: AssetTypeUpsert): Observable<AssetType> {
    return this.http.put<AssetType>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}