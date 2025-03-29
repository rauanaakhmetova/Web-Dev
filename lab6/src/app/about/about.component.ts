import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  
  ngAfterViewInit() {
    setTimeout(() => {
      const features = document.querySelector('.features') as HTMLElement;
      const items = document.querySelectorAll('.feature-item');
      
      if (features) {
        features.style.opacity = '0';
        features.style.transform = 'translateY(20px)';
        features.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(() => {
          features.style.opacity = '1';
          features.style.transform = 'translateY(0)';
        }, 300);
      }
      
      items.forEach((item, index) => {
        const element = item as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateX(-10px)';
        element.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
        }, 500 + index * 100);
      });
    }, 100);
  }
}
