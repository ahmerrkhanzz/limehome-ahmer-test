import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss']
})
export class GridCardComponent implements OnInit {
  @Input() places: any
  public selectedPlace: object = null
  constructor(
    private _appService: AppService
  ) { }

  ngOnInit() {
  }

  onLocationClick(place: any) {
    console.log(place)
    this.selectedPlace = place
    this._appService.selectedPlace.next(place)
  }

}
