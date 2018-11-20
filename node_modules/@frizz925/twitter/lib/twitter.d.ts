import { RequestOptions } from 'http';
import { RequestResponse } from 'request';
import { EventEmitter } from 'events';
import Parser from './parser';

interface TwitterOptions {
  consumer_key?: string;
  consumer_secret?: string;
  access_token_key?: string;
  access_token_secret?: string;
  bearer_token?: string;
  rest_base?: 'https://api.twitter.com/1.1';
  stream_base?: 'https://stream.twitter.com/1.1';
  user_stream_base?: 'https://userstream.twitter.com/1.1';
  site_stream_base?: 'https://sitestream.twitter.com/1.1';
  media_base?: 'https://upload.twitter.com/1.1';
  request_options?: RequestOptions;
}

type ResponseCallback = (
  error: any,
  data: object,
  response: RequestResponse
) => void;

type StreamCallback = (stream: Twitter.Stream) => void;

declare class Twitter {
  public options: TwitterOptions;

  public constructor(options: TwitterOptions);

  public get(
    url: string,
    params?: object | ResponseCallback,
    callback?: ResponseCallback
  ): Promise<object> | void;

  public post(
    url: string,
    params?: object | ResponseCallback,
    callback?: ResponseCallback
  ): Promise<object> | void;

  public stream(
    method: string,
    params?: object | string | StreamCallback,
    callback?: StreamCallback
  ): Twitter.Stream | void;

  private __buildEndpoint(path: string, base: string): string;

  private __request(
    method: string,
    path: string,
    params?: object | ResponseCallback,
    callback?: ResponseCallback
  ): Promise<object> | void;
}

declare namespace Twitter {
  export type Stream = Parser;
}
export = Twitter;
