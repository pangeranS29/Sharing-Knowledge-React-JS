import RequestHandler from "../request-handler";
import { ENDPOINT } from "../endpoint";

class PostApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.TODO);
  }
}

export default new PostApi();
