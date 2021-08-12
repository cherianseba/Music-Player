import { PlayerListService } from './player-list.service';
import { Component } from '@angular/core';
import { Song } from './player-list';

@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {
  orgSongList: Song[] = [];
  songsList: Song[] = [];
  player = new Audio();
  constructor(private playerListService: PlayerListService) { }

  ngOnInit(): void {
    this.getSongList();
  }

  getSongList() {
    this.playerListService.getSongsList().subscribe(songs => {
      this.orgSongList = songs;
      this.formatSongsData(songs);
    })
  }

  formatSongsData(songs: any) {
    songs.forEach((song: any) => {
      console.log(song)
      this.songsList.push({
        trackId: song.id,
        trackName: song.name,
        previewUrl: song.music_file_path,
        coverImageUrl: song.cover_image_path,
        liked: false
      })
    });
  }

  playSong(audio: any) {
    this.player.src = audio.previewUrl;
    this.player.play();
  }
  pauseSong() {
    this.player.pause();
  }
  likeSong(selectedSong: any) {
    let selectedSongToLike: Song;
    selectedSongToLike = this.orgSongList.filter((song: any) => song.id == selectedSong.trackId)[0];
    this.playerListService.likeSong(selectedSongToLike);
  }
}