import { EventEmitter } from 'events';

export default class Parser extends EventEmitter {
  readonly END: '\r\n';
  readonly END_LENGTH: 2;
  private buffer: string;
  public receive(buffer: Buffer): void;
  public destroy(): void;
}
