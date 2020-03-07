import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'eticket-template',
  templateUrl: './eticket-template.component.html',
  styleUrls: ['./eticket-template.component.scss']
})
export class EticketTemplateComponent implements OnInit {
  @Input() barcodeValue: string = "E021TE45BYZ40TE45";
  @Input() Color: string = "Beyaz";
  @Input() Date: string = "01.30.2020"
  @Input() Size: number = 36;
  constructor() { }

  ngOnInit() {
  }

  changed(){
    console.log("Here")
  }

}
