import {AfterContentInit, Component, ContentChildren, EventEmitter, OnInit, Output, QueryList} from '@angular/core';
import {TabComponent} from '../tab/tab.component'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})


export class TabsComponent implements OnInit, AfterContentInit {

  @Output() currentTab = new EventEmitter<number>();

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;


  ngOnInit() {}
  constructor() { }

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab)=>tab.active);

    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first, 0);
    }
  }

  selectTab(tab: TabComponent, i: number){
    this.currentTab.emit(i);
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;

  }

}
