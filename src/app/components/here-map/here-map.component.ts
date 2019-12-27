import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/app.service';
declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HereMapComponent implements OnInit, OnDestroy {

  @Input() places: any;
  @ViewChild("map", { static: true }) public mapElement: ElementRef;

  public lat: number = 40.75185;
  public lng: number = -73.97572;

  private platform: any;
  public map: any;
  private search: any;
  public ui: any;

  constructor(
    private _appService: AppService
  ) {
    this.platform = new H.service.Platform({
      apikey: 'agosy6KoOQ3tnhIsfBpGXHIR-IoNChWvUXDXebl4iY4'
    });
  }

  ngOnInit() {
    this._appService.selectedPlace.subscribe((res: any) => {
      if (res) {
        let position = res.position
        this.map.setCenter({ lat: position[0], lng: position[1] });
        this.map.setZoom(15);
      }
    })
  }

  ngAfterViewInit() {
    let pixelRatio = window.devicePixelRatio || 1;
    let defaultLayers = this.platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320
    });

    this.map = new H.Map(this.mapElement.nativeElement,
      defaultLayers.vector.normal.map, {
      center: new H.geo.Point(50.426467222414374, 6.3054632497803595),
      zoom: 6,
      pixelRatio: pixelRatio || 1
    });
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

    this.map.setZoom(4);
    console.log(this.places)
    if (this.places) {
      this.addInfoBubble(this.map)
    }
  }

  ngOnDestroy() {
    this._appService.selectedPlace.unsubscribe()
  }

  addInfoBubble = map => {
    var group = new H.map.Group();
    map.addObject(group);
    group.addEventListener('tap', (evt) => {
      let bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
        content: evt.target.getData()
      });
      this.ui.getBubbles().forEach(bub => this.ui.removeBubble(bub));
      this.ui.addBubble(bubble);
    }, false);
    this.places.forEach(e => {
      if (e.position) {
        this.map.setCenter({ lat: e.position[0], lng: e.position[1] });
        this.addMarkerToGroup(group, { lat: e.position[0], lng: e.position[1] },
          [
            '<div class="bubble">',
            '<h4 class="bubble-title">', e.title, '</h4>',
            '<p><i class="fas fa-map-marker-alt"></i>', e.vicinity, '</p>',
            '<p><i class="fas fa-clipboard-list"></i>', e.categoryTitle, '</p>',
            '</div>'
          ].join('')
        );
      }
    })
  }

  addMarkerToGroup = (group, coordinate, html) => {
    var parisPngIcon = new H.map.Icon("../../../assets/images/marker.png", { size: { w: 56, h: 56 } });
    var marker = new H.map.Marker(coordinate, { icon: parisPngIcon });
    marker.setData(html);
    group.addObject(marker);
  }

}
