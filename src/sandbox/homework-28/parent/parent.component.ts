import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { IUser } from '../IUser';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  
  @ViewChild('childRef') childRef!: ChildComponent;
    
  user: IUser = {
    name: 'Alex',
    age: 20
  };
  
  changeName(): void {
    // интерфейс не обновился по причине того что мы сделали мутацию обьекта и ссылка на обьект осталась той же, а Onpush не реагирует на изменеия просто значения если не поменялась ссылка
    this.user.name = 'Eugene';
    // способ исправления №1
    // this.user = { ...this.user, name: 'Eugene' };
    
    this.childRef.refresh();
  }
  
}
