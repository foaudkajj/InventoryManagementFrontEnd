import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-return-component',
  templateUrl: './return-component.component.html',
  styleUrls: ['./return-component.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ReturnComponentComponent implements OnInit {

  constructor(public _translate: TranslateService,) { }

  ngOnInit(): void {
  }

}
