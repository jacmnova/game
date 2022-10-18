import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {start} from "repl";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  @Output() start: EventEmitter<any> = new EventEmitter();
  parameters: FormGroup;
  validate = false;
  errorInfo = ''

  constructor( public formBuilder: FormBuilder) {
    this.parameters = formBuilder.group({
      nroCell: [4, Validators.required],
      nroWells: [3, Validators.required],
      nroArrow: [3, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  startGame() {

    if (this.parameters.invalid) {
      this.validate = true
    } else {
      this.validate = false
      if ( this.parameters.value.nroWells > (this.parameters.value.nroCell * this.parameters.value.nroCell )) {
        this.validate = true
        this.errorInfo = 'El numero de pozos no debe ser mayor a ' + ((this.parameters.value.nroCell * this.parameters.value.nroCell ) - 3).toString()
      } else {
        this.goToGame()
      }
    }

  }

  goToGame() {
    this.start.emit(this.parameters.value)
  }


}
