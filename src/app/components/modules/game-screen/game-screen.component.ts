import {Component, Input, OnInit} from '@angular/core';
import {coerceStringArray} from "@angular/cdk/coercion";

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {

  @Input() parameters = null;
  cells = []
  positionActivate = []
  huntPos = []

  historial = []

  constructor() { }

  ngOnInit(): void {
    this.historial.push("--> Comienza el juego")
  }

  ngOnChanges(): void{

    console.log(this.parameters, 'Armando el tablero');
    for(var i=0; i < this.parameters.nroCell; i++) {
      this.cells[i] = new Array(this.parameters.nroCell);
      for (var y=0; y < this.parameters.nroCell; y++) {
        if (this.parameters.nroCell === (i + 1) && y === 0){
          this.positionActivate.push(i)
          this.positionActivate.push(y)
          this.cells[i][y] = {
            exit: true,
            checked: true,
            hunt: false,
            wells: false,
            gold: false,
            pass: false
          }
        } else {
          this.cells[i][y] = {
            exit: false,
            checked: false,
            hunt: false,
            wells: false,
            gold: false,
            pass: false

          }
        }

      }
    }

    this.createHunt()
    this.controlsEnable()
    this.generateWells()
    this.generateGold()


  }

  createHunt() {
    let foundHunt = false
    while (!foundHunt) {
      let y = this.randomPos(0, this.parameters.nroCell)
      let x = this.randomPos(0, this.parameters.nroCell)
      if (y === this.parameters.nroCell - 1 && x === 0) {
        foundHunt = false
      } else {
        foundHunt = true
        this.cells[y][x] = {
          exit: false,
          checked: false,
          hunt: true,
          wells: false,
          gold: false,
          pass: false
        }
      }
    }
  }

  generateWells() {

    let foundWells = false
    let wells = this.parameters.nroWells
    console.log(wells)
    while (wells > 0) {

      let y = this.randomPos(0, this.parameters.nroCell)
      let x = this.randomPos(0, this.parameters.nroCell)
      console.log('generando pozo', y, x)
      if (y === this.parameters.nroCell - 1 && x === 0) {
      } else {
        if (this.cells[y][x].wells === true || this.cells[y][x].hunt === true) {
          continue
        } else {
          this.cells[y][x] = {
            exit: false,
            checked: false,
            hunt: false,
            wells: true,
            gold: false,
            pass: false
          }
          wells = wells - 1
        }

      }
    }
  }

  generateGold() {
    let foundGold = false
    while (foundGold === false) {

      let y = this.randomPos(0, this.parameters.nroCell)
      let x = this.randomPos(0, this.parameters.nroCell)
      console.log('generando oro', y, x)
      if (y === this.parameters.nroCell - 1 && x === 0) {
      } else {
        if (this.cells[y][x].wells === true || this.cells[y][x].hunt === true) {
          continue
        } else {
          this.cells[y][x] = {
            exit: false,
            checked: false,
            hunt: false,
            wells: false,
            gold: true,
            pass: false
          }
          foundGold = true
        }

      }
    }
  }

  randomPos(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  checkStatus(key){
    if (key === 'KeyD') {
      this.historial.push("--> Movimiento a la derecha")
      if (this.cells[this.positionActivate[0]][this.positionActivate[1] + 1]) {
        console.log("CONDICION 1")
        if (this.cells[this.positionActivate[0]][this.positionActivate[1] + 1].wells === true){
          this.historial.push("--> Percibe una brisa")
        }
        if (this.cells[this.positionActivate[0]][this.positionActivate[1] + 1].hunt === true){
          this.historial.push("--> Percibe un olor")
        }

        if (this.cells[this.positionActivate[0]][this.positionActivate[1] + 1].gold === true){
          this.historial.push("--> Percibe un brillo")
        }
      } else {
        this.historial.push("--> PARED")
      }




    }
    if (key === 'KeyA') {
      this.historial.push("--> Movimiento a la izquierda")
    }
    if (key === 'KeyW') {
      this.historial.push("--> Movimiento hacia arriba")
    }
    if (key === 'KeyS') {
      this.historial.push("--> Movimiento hacia abajo")
    }


  }

  controlsEnable(){
    console.log(this.positionActivate)
    document.addEventListener('keyup', (e) => {
      if (e.code === 'KeyD') {
        if (this.positionActivate[1] >= this.parameters.nroCell - 1){
          return
        } else {
          this.cells[this.positionActivate[0]][this.positionActivate[1]].checked = false
          this.cells[this.positionActivate[0]][this.positionActivate[1] + 1].checked = true
          this.cells[this.positionActivate[0]][this.positionActivate[1] + 1].pass = true
          this.positionActivate[0] = this.positionActivate[0]
          this.positionActivate[1] = this.positionActivate[1] + 1
          this.checkStatus('KeyD');
        }

      }
      if (e.code === 'KeyA') {
        if (this.positionActivate[1] - 1 <  0){
          return
        } else {
          this.checkStatus('KeyA');
          this.cells[this.positionActivate[0]][this.positionActivate[1]].checked = false
          this.cells[this.positionActivate[0]][this.positionActivate[1] - 1].checked = true
          this.cells[this.positionActivate[0]][this.positionActivate[1] - 1].pass = true

          this.positionActivate[0] = this.positionActivate[0]
          this.positionActivate[1] = this.positionActivate[1] - 1
        }



      }
      if (e.code === 'KeyW') {
        if (this.positionActivate[0] - 1 <  0){
          return;
        } else {
          this.checkStatus('KeyW');
          this.cells[this.positionActivate[0]][this.positionActivate[1]].checked = false
          this.cells[this.positionActivate[0] - 1][this.positionActivate[1]].checked = true
          this.cells[this.positionActivate[0] - 1][this.positionActivate[1]].pass = true
          this.positionActivate[0] = this.positionActivate[0] - 1
          this.positionActivate[1] = this.positionActivate[1]
        }

      }
      if (e.code === 'KeyS') {
        if (this.positionActivate[0] >= this.parameters.nroCell - 1){
          return;
        } else {
          this.checkStatus('KeyS');
          this.cells[this.positionActivate[0]][this.positionActivate[1]].checked = false
          this.cells[this.positionActivate[0] + 1][this.positionActivate[1]].checked = true
          this.cells[this.positionActivate[0] + 1][this.positionActivate[1]].pass = true
          this.positionActivate[0] = this.positionActivate[0] + 1
          this.positionActivate[1] = this.positionActivate[1]
        }

      }
    });
  }

}
