import { Component, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropListComponent } from './drag-drop/drag-drop-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DragDropListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drag-list';

  list = model([
    {
      id: 0,
      name: 'ABC'
    },
    {
      id: 1,
      name: 'DEF'
    },
    {
      id: 2,
      name: '123'
    },
    {
      id: 3,
      name: 'ARC'
    },
    {
      id: 4,
      name: 'ABC'
    },
    {
      id: 5,
      name: 'test'
    },
    {
      id: 6,
      name: 'ABC'
    },
    {
      id: 7,
      name: 'test8'
    },
    {
      id: 8,
      name: 'test9'
    },
  ])

  selection = model([]);
  selectionMultiple = model<boolean>(false);

  onChangeSelectionMode() {
    const multiple = this.selectionMultiple();
    this.selectionMultiple.set(!multiple);
  }

  onListOrderChanged(list){

  }
}
