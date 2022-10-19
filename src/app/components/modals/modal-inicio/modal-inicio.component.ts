import { Component, OnInit } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-modal-inicio',
  templateUrl: './modal-inicio.component.html',
  styleUrls: ['./modal-inicio.component.scss']
})
export class ModalInicioComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<ModalInicioComponent>) { }

  ngOnInit(): void {
  }

}
