import {User} from "./user";
/**
 * Created by ps3to_000 on 16-Mar-18.
 */
export class Message {
  messageId: number;
  messageContent: string;
  messageAuthor: User;
  creationDate: Date;
  updateDate: Date;
  messageComments: Message[];
  rating: number;
}
