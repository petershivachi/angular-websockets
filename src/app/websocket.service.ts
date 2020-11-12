import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  private subject: Rx.Subject <MessageEvent>;

  public connect(url): Rx.Subject <MessageEvent>{
    if(!this.subject){
      this.subject = this.create(url);
      console.log('Connected successsfully: '+url)
    }

    return this.subject;
  }

  public create(url): Rx.Subject <MessageEvent>{
    let ws = new WebSocket(url)

    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onclose = obs.next.bind(obs);
        ws.onclose = obs.next.bind(obs);
        return ws.close.bind(obs);
      });

    let observer = {
      next: (data: Object) => {
        if(ws.readyState  === WebSocket.OPEN){
          ws.send(JSON.stringify(data))
        }
      }
    }
return Rx.Subject.create(observer, observable)
  }
}
