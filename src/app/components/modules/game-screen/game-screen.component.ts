import {Component, Input, OnInit} from '@angular/core';
import {coerceStringArray} from "@angular/cdk/coercion";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ModalInicioComponent} from "../../modals/modal-inicio/modal-inicio.component";

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {
  modalIncio: MdbModalRef<ModalInicioComponent> | null = null;
  @Input() parameters = null;
  @Input() starApp = false;
  cells = []
  positionActivate = []
  huntPos = []
  historial = []

  //Timmer
  time: number = 0;
  interval;

  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void{
    if (this.starApp === true) {
      this.modalIncio = this.modalService.open(ModalInicioComponent)
      this.modalIncio.onClose.subscribe((message: any) => {
        this.loadGame()
      });
    }

  }

  loadGame() {
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
    this.historial.push("Comienza el juego")
    this.pauseTimer()
    this.startTimer()
    this.time = 0;
    this.historial = []
    this.checkData()
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

  checkDead() {
    if (this.cells[this.positionActivate[0]][this.positionActivate[1]].hunt === true) {
      this.historial.push("HUNT PERDISTE")
      this.pauseTimer();
    }

    if (this.cells[this.positionActivate[0]][this.positionActivate[1]].wells === true) {
      this.historial.push("WELLS PERDISTE")
      this.pauseTimer();
    }

    if (this.cells[this.positionActivate[0]][this.positionActivate[1]].gold === true) {
      this.historial.push("GOLD Regresa")
      this.pauseTimer();
    }
  }

  checkData() {
    console.log(this.positionActivate[0], 'POSITION 0')
    console.log(this.positionActivate[1], 'POSITION 1')
    console.log(this.parameters.nroCell - 1, 'CELLS')

    let position0 = this.positionActivate[0]
    let position1 = this.positionActivate[1]
    let cells = this.parameters.nroCell - 1

    let olor = false
    let brisa = false
    let resplandor = false
    let pared = false

    console.log(position1 + 1 < cells, 'DERECHA')
    console.log(position0 - 1 < cells, 'ARRIBA')
    console.log(position0 + 1 < cells, 'ABAJO')
    console.log(position1 -  1 >= 0, 'IZQUIERDA')

    if (position1 + 1 <= cells) {
      //Cuadrante Derecha
      if (this.cells[this.positionActivate[0]][this.positionActivate[1] + 1].hunt === true) {
        olor = true
      }

      if (this.cells[this.positionActivate[0]][this.positionActivate[1] + 1].wells === true) {
        brisa = true
      }

      if (this.cells[this.positionActivate[0]][this.positionActivate[1] + 1].gold === true) {
        resplandor = true
      }
    }


    if (position0 - 1 < cells) {
      //Cuadrante Arriba
      if (this.cells[this.positionActivate[0] - 1][this.positionActivate[1]].hunt === true) {
        olor = true
      }

      if (this.cells[this.positionActivate[0] - 1][this.positionActivate[1]].wells === true) {
        brisa = true
      }

      if (this.cells[this.positionActivate[0] - 1][this.positionActivate[1]].gold === true) {
        resplandor = true
      }
    }


    if (position0 + 1 < cells) {
      //Cuadrante Abajo
      if (this.cells[this.positionActivate[0] + 1][this.positionActivate[1]].hunt === true) {
        olor = true
      }

      if (this.cells[this.positionActivate[0] + 1][this.positionActivate[1]].wells === true) {
        brisa = true
      }

      if (this.cells[this.positionActivate[0] + 1][this.positionActivate[1]].gold === true) {
        resplandor = true
      }
    }


    if (position1 -  1 >= 0) {
      //Cuadrante Izquierda
      if (this.cells[this.positionActivate[0]][this.positionActivate[1] - 1].hunt === true) {
        olor = true
      }

      if (this.cells[this.positionActivate[0]][this.positionActivate[1] - 1].wells === true) {
        brisa = true
      }

      if (this.cells[this.positionActivate[0]][this.positionActivate[1] - 1].gold === true) {
        resplandor = true
      }
    }



    if (olor) {
      this.historial.push("Siente un olor")
    }
    if (brisa) {
      this.historial.push("Siente una brisa")
    }
    if (resplandor) {
      this.historial.push("Ve un resplandor")
    }
    if (pared) {
      this.historial.push("Hay un muro")
    }
  }

  checkStatus(key){
    if (key === 'KeyD') {
      this.historial.push("Movimiento a la derecha")
      this.checkDead()
      this.checkData()
    }
    if (key === 'KeyA') {
      this.historial.push("Movimiento a la izquierda")
      this.checkDead()
      this.checkData()
    }
    if (key === 'KeyW') {
      this.historial.push("Movimiento hacia arriba")
      this.checkDead()
      this.checkData()
    }
    if (key === 'KeyS') {
      this.historial.push("Movimiento hacia abajo")
      this.checkDead()
      this.checkData()
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

          this.cells[this.positionActivate[0]][this.positionActivate[1]].checked = false
          this.cells[this.positionActivate[0]][this.positionActivate[1] - 1].checked = true
          this.cells[this.positionActivate[0]][this.positionActivate[1] - 1].pass = true

          this.positionActivate[0] = this.positionActivate[0]
          this.positionActivate[1] = this.positionActivate[1] - 1
          this.checkStatus('KeyA');
        }



      }
      if (e.code === 'KeyW') {
        if (this.positionActivate[0] - 1 <  0){
          return;
        } else {

          this.cells[this.positionActivate[0]][this.positionActivate[1]].checked = false
          this.cells[this.positionActivate[0] - 1][this.positionActivate[1]].checked = true
          this.cells[this.positionActivate[0] - 1][this.positionActivate[1]].pass = true
          this.positionActivate[0] = this.positionActivate[0] - 1
          this.positionActivate[1] = this.positionActivate[1]
          this.checkStatus('KeyW');
        }

      }
      if (e.code === 'KeyS') {
        if (this.positionActivate[0] >= this.parameters.nroCell - 1){
          return;
        } else {

          this.cells[this.positionActivate[0]][this.positionActivate[1]].checked = false
          this.cells[this.positionActivate[0] + 1][this.positionActivate[1]].checked = true
          this.cells[this.positionActivate[0] + 1][this.positionActivate[1]].pass = true
          this.positionActivate[0] = this.positionActivate[0] + 1
          this.positionActivate[1] = this.positionActivate[1]
          this.checkStatus('KeyS');
        }

      }

    });
  }

  async startTimer() {
    setTimeout(() => {
      this.interval = setInterval(() => {
        this.time++
        var terminal = document.getElementById("terminal");

        terminal.animate({ scrollTop: 99999999}, 1)
      },1000)
    }, 500000000000000000000000000000000);

  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}
