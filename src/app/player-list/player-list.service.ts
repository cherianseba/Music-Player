import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';
import { Song } from './player-list';

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {
  songList: Observable<Song[]>;
  getSongsUrl = 'https://api-stg.jam-community.com/song/trending';
  likeSongUrl = 'https://api-stg.jam-community.com/interact/like/id=?';

  constructor(private http: HttpClient) { }

  getSongsList(): Observable<Song[]> {
    if (!this.songList) {
      this.songList = this.http.get<Song[]>(this.getSongsUrl).pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.songList;
  }

  likeSong(selectedSongToLike: any) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let params: HttpParams = new HttpParams();
    params = params.set('apikey', '___agAFTxkmMIWsmN9zOpM_6l2SkZPPy21LGRlxhYD8');
    const options = {
      headers: headers,
      params: params,
      withCredentials: false
    };
    this.http.post<any>(this.likeSongUrl, selectedSongToLike.id, options);
  }
}
