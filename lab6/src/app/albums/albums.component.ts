import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { Album } from '../app.service'; 
 
@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {
  albums: Album[] = [];
  filteredAlbums: Album[] = [];
  loading = true;
  error: string | null = null;
  newAlbumTitle = '';
  searchTerm = '';
  showFullTitles = false;

  constructor(private appService: AppService) {
    this.loadAlbums();
  }

  ngOnInit() {
    this.applyFilter();
  }

  ngDoCheck() {
    // Применяем фильтр при изменении поисковой строки
    this.applyFilter();
  }

  loadAlbums() {
    this.loading = true;
    this.error = null;
    
    this.appService.getAlbums().subscribe({
      next: (data) => {
        this.albums = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching albums', err);
        this.error = 'Failed to load albums. Please try again later.';
        this.loading = false;
      }
    });
  }

  applyFilter() {
    if (!this.searchTerm.trim()) {
      this.filteredAlbums = [...this.albums];
      return;
    }
    
    const search = this.searchTerm.toLowerCase().trim();
    this.filteredAlbums = this.albums.filter(album => 
      album.title.toLowerCase().includes(search) || 
      String(album.id).includes(search)
    );
  }

  createAlbum() {
    if (!this.newAlbumTitle.trim()) return;
    
    const newAlbum: Album = {
      title: this.newAlbumTitle,
      id: 0, // Will be assigned by the server
      userId: 1 // Default user ID
    };
    
    this.appService.createAlbum(newAlbum).subscribe({
      next: (album) => {
        this.albums.unshift(album);
        this.applyFilter();
        this.newAlbumTitle = '';
      },
      error: (err) => {
        console.error('Error creating album', err);
        alert('Failed to create album. Please try again.');
      }
    });
  }

  deleteAlbum(id: number) {
    this.appService.deleteAlbum(id).subscribe({
      next: () => {
        this.albums = this.albums.filter(album => album.id !== id);
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error deleting album', err);
        alert('Failed to delete album. Please try again.');
      }
    });
  }
}
