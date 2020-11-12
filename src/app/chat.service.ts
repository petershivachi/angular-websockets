import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { environment } from '../environments/environment'

const CHAT_URL = "ws://echo.websocket.org";

export interface Message{
  author: string,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) { 
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).map(
    (responce: MessageEvent): Message => {
      let data=JSON.parse(responce.data);
      return{
        author: data.author,
        message: data.message
      };
    }
  )
  }
}
