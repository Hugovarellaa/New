import ReactDOM from "react-dom";
import { App } from "./App";
import { createServer, Model } from "miragejs";

createServer({
  models: {
    tarnsaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      tarnsactions: [
        {
          id: 1,
          title: "Desenvolvimento de Website",
          type: "deposit",
          category: "Dev",
          amount: 6000,
          createAt: new Date("2021-08-08 14:00:00"),
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: 1200,
          createAt: new Date("2021-08-12 18:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("tarnsaction");
    });
    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("tarnsaction", data);
    });
  },
});

ReactDOM.render(<App />, document.getElementById("root"));
