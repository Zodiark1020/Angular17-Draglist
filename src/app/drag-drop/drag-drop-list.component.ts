import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, TemplateRef, computed, contentChild, input, model, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'flex flex-column flex-1 overflow-hidden' },
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule
  ]
})

export class DragDropListComponent {
  search = viewChild<ElementRef<HTMLInputElement>>('searchText');
  template = contentChild<TemplateRef<any>>('item');
  header = contentChild<TemplateRef<any>>('header');
  items = model<any[]>();
  editItems = computed(() => structuredClone(this.items()));
  onInternalDrop = input<(event: CdkDragDrop<any[]>) => void>(undefined, { alias: 'onDrop' });
  styleClass = input<string>();
  dropListStyleClass = input<string>();
  disabled = input<boolean>();
  searchable = input<boolean>();
  propertySearch = input<string>("Name");
  enableSelection = input<boolean>(false);
  selectionMode = input<'single' | 'multiple'>('single');
  dataKey = input<string>('Name');
  selection = model<any[]>();

  selectedEls = computed(() => {
    const sel = this.selection();
    return sel?.map(s => s[this.dataKey() || 'Name']) || [];
  })

  dropped = output<any>();

  constructor() {

  }

  cdkDrop(event: CdkDragDrop<any[]>) {
    if (this.onInternalDrop()) {
      this.onInternalDrop()(event);
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    const its = structuredClone(this.editItems());
    this.items.set(its);
  }

  visible(item) {
    if (!this.searchable() || !this.search()) {
      return false;
    }

    const value = this.search().nativeElement.value;

    if (!value) {
      return false;
    }

    const prop = item[this.propertySearch()];
    return !(prop as string).toLocaleLowerCase().includes(value.toLocaleLowerCase());
  }


  onSelect(ev, element) {
    if (!this.enableSelection()) {
      return;
    }


    if (!this.selectedEls().includes(element[this.dataKey()])) {
      if (!this.selection() || this.selectionMode() === 'single') {
        this.selection.set([structuredClone(element)]);
      }
      else {
        this.selection.update(list => [...structuredClone(list), structuredClone(element)]);
      }

      return;
    }

    const idx = this.selectedEls().findIndex(el => el === element[this.dataKey()]);

    this.selection.update(list => {
      const l = structuredClone(list);
      l.splice(idx, 1);

      return l;
    })
  }
}
