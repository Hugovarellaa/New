import ReactDOM from "react-dom";
import { App } from "./App";
import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";
    this.get("/transactions", () => ({
      lista: [
        {
          id: 1,
          title: "transaction 1",
          amount: 100,
          type: "deposit",
          category: "Food",
          createAt: new Date(),
        },
      ],
    }));
  },
});

ReactDOM.render(<App />, document.getElementById("root"));
