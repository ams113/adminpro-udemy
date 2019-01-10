import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-nopage',
  templateUrl: './nopage.component.html',
  styles: []
})
export class NopageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
