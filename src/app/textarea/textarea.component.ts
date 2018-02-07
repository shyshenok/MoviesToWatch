import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  inputValue: string = '';
  top:boolean = false;
  constructor() { }

  ngOnInit() {

  }

  focusFunction(isFocused) {
    if(isFocused){
        console.log('top');
        this.top = true;
    } else {
      if (this.inputValue !== '') {
        console.log('top');
        this.top = true;
      } else {
        this.top = false;
        console.log('center');

      }
    }

  }


}
