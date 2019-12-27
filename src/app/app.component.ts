import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ahmer-test';
  public places: any[] = []
  public loading: boolean = true

  constructor(
    private _appService: AppService
  ) { }

  ngOnInit() {
    this._appService.getPlaces().subscribe((res: any) => {
      console.log(res)
      this.places = res.results
      this.loading = false
    })
  }
}
