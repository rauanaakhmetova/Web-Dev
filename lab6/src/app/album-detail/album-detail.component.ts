import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppService, Album } from '../app.service';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  album: Album | null = null;
  loading = true;
  error: string | null = null;
  isSaved = false;
  private originalBodyStyles = {
    backgroundColor: '',
    backgroundImage: '',
    color: ''
  };

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.originalBodyStyles = {
      backgroundColor: document.body.style.backgroundColor,
      backgroundImage: document.body.style.backgroundImage,
      color: document.body.style.color
    };
    
    document.body.style.backgroundColor = '#10002b';
    document.body.style.backgroundImage = 'radial-gradient(circle at top right, #3c096c, #10002b)';
    document.body.style.color = '#f8f9fa';
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAlbum(id);
  }
  
  ngOnDestroy() {
    document.body.style.backgroundColor = this.originalBodyStyles.backgroundColor;
    document.body.style.backgroundImage = this.originalBodyStyles.backgroundImage;
    document.body.style.color = this.originalBodyStyles.color;
  }

  loadAlbum(id: number) {
    this.loading = true;
    this.error = null;
    
    this.appService.getAlbum(id).subscribe({
      next: (data) => {
        this.album = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching album details', err);
        this.error = 'Failed to load album details. Please try again later.';
        this.loading = false;
      }
    });
  }

  save() {
    if (this.album) {
      this.appService.updateAlbum(this.album).subscribe({
        next: () => {
          this.isSaved = true;
          setTimeout(() => {
            this.isSaved = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Error updating album', err);
          alert('Failed to update album. Please try again.');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/albums']);
  }
}
