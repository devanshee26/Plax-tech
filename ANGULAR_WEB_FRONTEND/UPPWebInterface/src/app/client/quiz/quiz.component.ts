import {Component, OnInit} from '@angular/core';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public tiles: Tile[] = [
    {text: 'Login and Reasoning', cols: 3, rows: 1, color: '#f1f1f1'},
    {text: 'Language', cols: 1, rows: 2, color: '#f7f6e7'},
    {text: 'Coding', cols: 1, rows: 1, color: '#f4f5db'},
    {text: 'CS fundamental', cols: 2, rows: 1, color: '#ffe8e8'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
