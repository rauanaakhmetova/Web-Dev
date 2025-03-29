import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService, Photo } from '../app.service';
  
@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  loading = true;
  error: string | null = null;
  albumId: number = 0;
  searchTerm: string = '';
  currentView: 'grid' | 'list' = 'grid';

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPhotos();
  }

  loadPhotos() {
    this.loading = true;
    this.error = null;
    
    this.appService.getPhotosByAlbum(this.albumId).subscribe({
      next: (data) => {
        this.photos = data;
        this.filteredPhotos = [...this.photos];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching photos', err);
        this.error = 'Failed to load photos. Please try again later.';
        this.loading = false;
      }
    });
  }

  filterPhotos() {
    if (!this.searchTerm.trim()) {
      this.filteredPhotos = [...this.photos];
      return;
    }
    
    const search = this.searchTerm.toLowerCase().trim();
    this.filteredPhotos = this.photos.filter(photo => 
      photo.title.toLowerCase().includes(search) || 
      String(photo.id).includes(search)
    );
  }

  changeView(view: 'grid' | 'list') {
    this.currentView = view;
  }

  goBack() {
    this.router.navigate(['/albums', this.albumId]);
  }
}
