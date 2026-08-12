import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, OnDestroy } from '@angular/core';
import { ITodo } from '../ITodo';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-cd-on-push',
  imports: [],
  templateUrl: './cd-on-push.component.html',
  styleUrl: './cd-on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdOnPushComponent implements DoCheck, OnDestroy {
  
  private http: HttpClient = inject(HttpClient);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  
  count: number = 0;
  private interval!: number;
  
  increment(): void {
    this.count++;
  }
  
  getTodo(): Observable<ITodo> {
    return this.http.get<ITodo>('https://jsonplaceholder.typicode.com/todos/1');
  }
  
  onClickScenario(): void {
    this.increment();
  }
  
  onTimeoutScenario(): void {
    setTimeout(() => {
      this.increment();
    }, 1000);
  }
  
  onPromiseScenario(): void {
    Promise.resolve().then(() => {
      this.increment();
    });
  }
  
  onHttpScenario(): void {
    this.getTodo().pipe(
      tap(() => this.increment())
    ).subscribe();
  }
  
  onIntervalScenario(): void {
    this.interval = setInterval(() => {
      this.increment();
    }, 1000);
  }
  
  onComboScenario(): void {
    this.increment();
    setTimeout(() => this.increment(), 0);
    Promise.resolve().then(() => this.increment());
  }
  
  onTimeoutMarkForCheck(): void {
    setTimeout(() => {
      this.increment();
      this.cdr.markForCheck();
    }, 1000);
  }
  
  onTimeoutDetectChanges(): void {
    setTimeout(() => {
      this.increment();
      this.cdr.detectChanges();
    }, 1000);
  }
  
  onDetachClick(): void {
    this.cdr.detach();
  }
  
  onReattachClick(): void {
    this.cdr.reattach();
  }
  
  ngDoCheck(): void {
    console.log('Change Detection');
  }
  
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  
}


/*
Часть 1. markForCheck()
1. Что произошло после вызова markForCheck()?
Компоненты были помечены как "грязные" — то есть подлежащие проверке привязок на следующем проходе CD.
2. Обновился ли интерфейс сразу?
Нет, не в момент самого вызова markForCheck() — он не запускает проверку немедленно, а лишь ставит флаг. Обновление произошло чуть позже — когда фактически наступил следующий проход tick()
3. Когда фактически произошёл Change Detection?
На втором проходе CD — том, что запустился после завершения setTimeout (Zone.js уведомила о завершении задачи → ApplicationRef.tick() → обход дерева дошёл до этого компонента → раз он помечен "грязным" через markForCheck(), привязки были пересчитаны и DOM обновлён).
4. Почему без markForCheck() интерфейс не обновлялся?
Потому что OnPush-компонент не помечен "грязным" сам по себе при асинхронном изменении данных вне собственного события — обход дерева доходит до него (поэтому ngDoCheck() всё равно вызывается), но пропускает обновление привязок, так как не видит причины считать компонент требующим перерисовки.

Часть 2. detectChanges()
1. Чем поведение отличается от предыдущего сценария?
Внешне (по количеству логов и итоговому результату) — идентично. Разница внутренняя: detectChanges() вызывает проверку сам, напрямую и синхронно, не полагаясь на то, что Angular и так запустит глобальный цикл. markForCheck() лишь "просит" будущий цикл не пропустить компонент.
2. Выполняется ли Change Detection немедленно?
Да — именно в этом ключевое отличие от markForCheck(). detectChanges() синхронно и сразу проверяет компонент в момент своего вызова, а не откладывает до следующего прохода.
3. Какие компоненты были проверены?
Только этот компонент и его потомки (если бы они были) — detectChanges() не идёт вверх к родителям, в отличие от markForCheck(), который помечает предков.
4. В каких случаях detectChanges() предпочтительнее?
Когда нужно гарантированно и немедленно обновить DOM прямо сейчас, не полагаясь на то, что скоро наступит естественный цикл CD. В большинстве обычных случаев markForCheck() — более лёгкий и идиоматичный выбор.

Часть 3. detach()
1. Обновляется ли интерфейс?
Нет, ни одним из четырёх способов — detach() полностью блокирует обновление привязок в шаблоне.
2. Выполняется ли ngDoCheck()?
Да, эмпирически продолжает срабатывать. Важно: даже если хук вызывается, это не приводит к обновлению {{ count }} на экране — обновление привязок и вызов хуков жизненного цикла оказываются разделены.
3. Почему Angular перестал проверять компонент?
С точки зрения видимого результата (обновления DOM) — компонент действительно исключён из автоматического цикла привязок. ChangeDetectorRef.detach() убирает компонент из того набора, для которого Angular автоматически пересчитывает и применяет изменения в шаблоне.
4. Какие способы изменения значения больше не работают?
Ни один из четырёх (click, setTimeout, setInterval, Promise) не приводит к обновлению экрана — данные в памяти (count) реально меняются (метод increment() продолжает выполняться), но визуально это никак не отражается, пока компонент в состоянии detach().

Часть 4. Reattach()
1. Что изменилось после reattach()?
Компонент снова стал частью обычного процесса CD — то есть события внутри самого компонента (клик, промис-микрозадача в контексте события) теперь снова приводят к пересчёту привязок в шаблоне. Но, как и до detach(), OnPush по-прежнему игнорирует чисто асинхронные изменения (setTimeout/setInterval сами по себе), если их не сопровождает markForCheck()/detectChanges() или собственное событие компонента.
2. Когда компонент снова начал участвовать в Change Detection?
Сразу после вызова reattach() — но именно "участвовать" означает вернуться в список компонентов, которые Angular пытается проверить при обходе дерева. Реальное видимое обновление экрана происходит только при следующем легальном для OnPush триггере (в моем случае — клик или промис, инициированный кликом), а не автоматически "сам по себе" сразу после reattach().
3. Нужно ли дополнительно вызывать detectChanges() или markForCheck()?
Нет, если дальнейшие изменения приходят через легальные для OnPush источники (клик, новый @Input, async pipe). Да — если изменения по-прежнему приходят через "слепые" для OnPush источники, как setTimeout/setInterval без сопровождающего вызова.
*/