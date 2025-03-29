import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/${id}`);
  }

  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.apiUrl, album);
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}/${album.id}`, album);
  }

  deleteAlbum(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPhotosByAlbum(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/${albumId}/photos`);
  }
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

 