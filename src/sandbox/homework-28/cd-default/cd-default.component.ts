import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, inject, OnDestroy } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITodo } from '../ITodo';

@Component({
  selector: 'app-cd-default',
  imports: [],
  templateUrl: './cd-default.component.html',
  styleUrl: './cd-default.component.scss',
})
export class CdDefaultComponent implements DoCheck, OnDestroy {
  
  private http: HttpClient = inject(HttpClient);
  
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
  
  ngDoCheck(): void {
    console.log('Change Detection');
  }
  
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  
}


/* 
Разбор Сценария 1:
Обновился ли интерфейс автоматически? Да
Сколько раз ngDoCheck()? 1 раз на 1 клик
Понадобился ли ChangeDetectorRef? Нет
Что стало причиной запуска CD? Клик — это DOM-событие в шаблоне ((click)).

Разбор Сценария 2:
Обновился ли интерфейс автоматически? Да, но с задержкой в 1000мс (не сразу после клика)
Сколько раз ngDoCheck()? 2 раза за один клик (сразу + через секунду)
Понадобился ли ChangeDetectorRef? Нет — Zone.js сам поймал завершение setTimeout
Что стало причиной запуска CD? Два отдельных триггера: (1) сам клик как DOM-событие, (2) завершение асинхронной операции setTimeout, перехваченной Zone.js

Разбор Сценария 3:
Обновился ли интерфейс автоматически? Да
Сколько раз ngDoCheck()? 1 раз — потому что микрозадача (Promise) укладывается в ту же "задачу" Zone.js, что и сам клик; не два отдельных прохода, как с setTimeout, а один
ChangeDetectorRef? Не понадобился
Причина: клик как DOM-событие — но важно, что к моменту, когда этот единственный проход CD случился, промис уже успел разрешиться, поэтому count уже был обновлён в этом же проходе

Разбор Сценария 4:
Обновился ли интерфейс автоматически? Да
Сколько раз ngDoCheck()? 3 раза за один клик: (1) сам клик, (2) завершение preflight-запроса (OPTIONS), (3) завершение основного запроса (GET)
ChangeDetectorRef? Не понадобился
Причина запуска CD: клик (DOM-событие) + два отдельных сетевых обмена — CORS preflight и сам HTTP-запрос, каждый из которых Zone.js отслеживает как самостоятельную асинхронную задачу

Разбор Сценария 5:
Обновился ли интерфейс автоматически? Да — сразу после клика (0 изменений, но проход CD случился), и затем каждую секунду цифра растёт сама, без дополнительных кликов
Сколько раз ngDoCheck()? 1 раз сразу на клик, и далее бесконечно, по одному разу на каждое срабатывание интервала — то есть до тех пор, пока: компонент не будет уничтожен (сработает ngOnDestroy() → clearInterval())
ChangeDetectorRef? Не понадобился
Причина запуска CD: клик + периодические срабатывания setInterval, каждое из которых Zone.js перехватывает как отдельное завершение асинхронной задачи

Разбор Сценария 6:
Обновился ли интерфейс? Да, count вырос на 3
Сколько раз ngDoCheck()? 2 раза, а не 3 — клик и промис попали в один проход (микрозадачи вычищаются в той же задаче, что и синхронный код), а setTimeout — отдельная макрозадача, дала второй, отдельный проход
ChangeDetectorRef? Не понадобился — все триггеры отследил Zone.js сам
Причина CD: 2 триггера — (1) клик+промис как одна задача, (2) setTimeout как отдельная задача
*/