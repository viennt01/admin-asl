import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';

export enum WSS_EVENTS {
  NOTIFICATION = 'check-notifcation',
}

class AppWebsocket {
  _socket: WebSocket;
  _eventHandler: Record<WSS_EVENTS | any, (data: unknown) => void> = {};
  constructor(url: string) {
    // const token = appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN);

    const socket = new WebSocket(url);
    // const socket = new WebSocket(url, {
    //   headers: {
    //     accessToken: token,
    //   },
    // });
    this._socket = socket;
    this.onmMessage();
  }
  addEventListener(event: WSS_EVENTS, listener: (data: unknown) => void) {
    this._eventHandler[event] = listener;
  }
  removeEventListener(event: WSS_EVENTS) {
    delete this._eventHandler[event];
  }
  onopen(listener: (data: unknown) => void) {
    this._socket.onopen = listener;
    console.log(1);
    // const token = appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN);

    // const message = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    // this._socket.send(JSON.stringify(message));
  }
  onmMessage() {
    this._socket.onmessage = (response) => {
      const { event, data }: { event: WSS_EVENTS; data: unknown } = JSON.parse(
        response.data
      );
      if (this._eventHandler[event]) {
        this._eventHandler[event](data);
      }
    };
  }

  onError(listener: (ev: unknown) => void) {
    this._socket.onerror = listener;
  }

  sendMesssage(event: string, data?: string) {
    const sendData: { [key: string]: string } = { event };
    if (data) sendData.data = data;
    console.log(sendData);

    // this._socket?.send(JSON.stringify(sendData));
  }

  // close() {
  //   this._socket.close();
  // }

  logout(callback: () => void) {
    appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
    if (callback) {
      callback();
    }
  }
}

export default AppWebsocket;
