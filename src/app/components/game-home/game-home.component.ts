import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.scss']
})
export class GameHomeComponent implements OnInit {
  parametersGame = null
  startApp = false
  constructor() { }

  ngOnInit(): void {
  }

  startMenu () {
    //Components
    var hunt = document.getElementById("logoPlay");
    var header = document.getElementById("header");
    var welcomeText = document.getElementById("welcome-text");
    var dividerText = document.getElementById("divider-text");
    var btnStart = document.getElementById("play-section");
    var panel = document.getElementById("section-start");




    // Hunt
    // hunt.classList.add("logoPlay-hidden");
    // hunt.classList.remove("logoPlay");

    // header
    header.classList.add("upHeader");
    welcomeText.classList.add("hiddenText");
    dividerText.classList.add("hiddenHR");

    //playBtn
    btnStart.classList.add("hiddenBtn");
    panel.classList.add("show-card-panel")


    setTimeout(() => {
      panel.classList.add("scale-0");
      panel.classList.remove("scale-1");

    }, 1200);


    //TimeOut
    setTimeout(() => {
      // hunt.classList.add("hidden-animation");
      // welcomeText.classList.add("hidden-animation");
      // dividerText.classList.add("hidden-animation");
      btnStart.classList.add("hidden-animation");

      }, 3200);
  }

  startGame(event) {
    this.parametersGame = event;
    var panel = document.getElementById("section-start");
    var game = document.getElementById("section-game");
    //closed Card
    panel.classList.add("closedParametersCard");
    game.classList.add("openGame");
    game.classList.remove("closedGame");
    this.startApp = true
    // panel.classList.remove("show-card-panel");
  }

}
