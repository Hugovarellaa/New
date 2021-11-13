import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionTable() {

  useEffect(()=>{
    api.get("/transactions")
      .then(response => console.log(response.data.lista))
  },[])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento</td>
            <td className="deposit">R$ 6.000,00</td>
            <td>Freelancer</td>
            <td>12/10/2021</td>
          </tr>

          <tr>
            <td>Aluguel</td>
            <td className="withdraw">-R$ 1.500,00</td>
            <td>Casa</td>
            <td>15/10/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
