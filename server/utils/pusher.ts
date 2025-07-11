import Pusher from "pusher";
import PusherClient from "pusher-js";
import { config } from "../config";

export const pusher = new Pusher({
  appId: config.pusher.appId,
  key: config.pusher.key,
  secret: config.pusher.secret,
  cluster: config.pusher.cluster,
  useTLS: true,
});

export const pusherClient = new PusherClient(config.pusher.key, {
  cluster: config.pusher.cluster,
});
