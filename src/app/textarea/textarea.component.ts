import {Component, EventEmitter, Injectable, OnInit, Output} from "@angular/core";


@Injectable()

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  inputValue: string = "";
  @Output() sendInputValue = new EventEmitter<string>();
  top: boolean = false;


  constructor() {
  }

  ngOnInit() {

  }

  focusFunction(isFocused) {

    if (isFocused) {
      this.top = true;
    } else {
      this.top = this.inputValue !== '';
    }
  }

  onChange(value) {

    this.sendInputValue.emit(value);
  }

  clearInput() {
    this.inputValue = '';
  }


}
