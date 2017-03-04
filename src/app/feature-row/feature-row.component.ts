import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'wm-feature-row',
  templateUrl: './feature-row.component.html',
  styleUrls: ['./feature-row.component.css']
})
export class FeatureRowComponent implements OnInit {

  @Input() rowTitle: String;
  @Input() moviesUrl: String;

  constructor() { }

  ngOnInit() {
  }

}
