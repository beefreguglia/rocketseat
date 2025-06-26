import { FormEvent, useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import searchSvg from "../assets/search.svg";
import { RefundItem, RefundItemProps } from "../components/RefundItem";
import { Pagination } from "../components/Pagination";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { CATEGORIES } from "../utils/categories";
import { formatCurrency } from "../utils/formatCurrency";

const PER_PAGE = 5;

export function Dashboard() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalOfPages, setTotalOfPages] = useState(0);
  const [refunds, setRefunds] = useState<RefundItemProps[]>([]);

  async function fetchRefunds() {
    try {
      const { data } = await api.get<RefundsPaginationAPIResponse>(
        `/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`
      );
      
      setRefunds(
        data.refunds.map((refund) => ({
          id: refund.id,
          name: refund.user.name,
          description: refund.category,
          amount: formatCurrency(refund.amount),
          categoryImg: CATEGORIES[refund.category].icon,
        }))
      );

      setTotalOfPages(data.pagination.totalPages)

    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar as solicitações");
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    fetchRefunds()
  }

  function handlePagination(action: "next" | "prev") {
    setPage((prevPage) => {
      if (action === "next" && prevPage < totalOfPages) {
        return prevPage + 1;
      }

      if (action === "prev" && prevPage > 1) {
        return prevPage - 1;
      }

      return prevPage;
    });
  }

  useEffect(() => {
    fetchRefunds();
  }, [page]);

  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md: flex-row gap-2 mt-6"
      >
        <Input
          placeholder="Pesquisar pelo nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Button type="submit" variant="icon">
          <img src={searchSvg} alt="Ícone de pesquisar" className="w-5" />
        </Button>
      </form>
      <div className="my-6 flex-col gap-4 max-h-[342px] overflow-y-scroll">
        {refunds.map((refund) => (
          <RefundItem
            key={refund.id}
            item={refund}
            href={`/refund/${refund.id}`}
          />
        ))}
      </div>
      <Pagination
        current={page}
        total={totalOfPages}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("prev")}
      />
    </div>
  );
}
