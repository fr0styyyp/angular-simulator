import { Component, inject, OnInit } from '@angular/core';
import { IPost } from '../interfaces/IPost';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-post-detail',
  imports: [TranslatePipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);

  post!: IPost;

  ngOnInit(): void {
    this.post = this.route.snapshot.data['post'];
  }

}
