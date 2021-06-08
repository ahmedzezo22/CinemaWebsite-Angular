import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovModel } from '../models/GetMovieModel';
import { HomeService } from '../services/home.service';
import * as $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-get-movie',
  templateUrl: './get-movie.component.html',
  styleUrls: ['./get-movie.component.css']
})
export class GetMovieComponent implements OnInit {
  constructor(private homeService:HomeService,private activateRoute:ActivatedRoute,private sanitizer: DomSanitizer,private router:Router) { }
  model: MovModel = null;
  film: File = null;

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(param => {
      var movieId = +param.get('id');
      if (movieId) {
        this.homeService.getMovieById(movieId).subscribe(movie => {
          this.model = movie;
          for (let i = 0; i < this.model.movieLinks.length; i++) {
            const link = this.model.movieLinks[i].movLink;

            if (link !== null && link !== '' && !link.startsWith('http')) {
              const urlImage = 'assets/videos/' + link;
              fetch(urlImage).then(res => res.blob()).then(blob => {
                var file = new File([blob], link);
                this.film = file;
                var id = $('#mov');
                id[0].src = URL.createObjectURL(this.film);
                id.parent()[0].load();
              })
            }
          }

        }, ex => {
          console.log(ex);
        })

      }
    })
  }

  getEmbedLink(strLink: string) {
    if (strLink !== null && strLink !== '') {
      if (strLink.includes('watch?v=')) {
        var link = strLink.replace('watch?v=', 'embed/');
        return this.sanitizer.bypassSecurityTrustResourceUrl(link);
      } else if (strLink.includes('youtu.be')) {
        var link = strLink.replace('youtu.be', 'youtube.com/embed/');
        return this.sanitizer.bypassSecurityTrustResourceUrl(link);
      }
    }
    return strLink;
  }

  GetMovieByActors(id: number) {
    this.router.navigate(['/home', id]);
  }

  DownloadVideo(link: string) {
    if (link) {
      if (link.startsWith('http')) {
        window.location.href = link;
      } else {
        window.location.href = 'assets/videos/' + link;
      }
    }

}
}
