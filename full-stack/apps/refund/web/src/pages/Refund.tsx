import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/select";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router";
import fileSvg from "../assets/file.svg";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";

const refundSchema = z.object({
  name: z.string().trim().min(3, "Informe um nome claro para sua solicitação"),
  amount: z.coerce
    .number()
    .positive("Informe um valor válido e superior a zero")
    .min(1, "Informe um valor válido"),
  category: z.string().min(1, "Informe a categoria"),
});

export function Refund() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileURL, setFileURL] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (id) {
      return navigate(-1);
    }

    try {
      setIsLoading(true);

      if (!file) {
        return alert("Selecione um arquivo de comprovante");
      }

      const fileUploadForm = new FormData();
      fileUploadForm.append("file", file);

      const response = await api.post("/uploads", fileUploadForm);

      const data = refundSchema.parse({
        name,
        category,
        amount: amount.replace(",", "."),
      });

      await api.post("/refunds", {
        ...data,
        filename: response.data.filename,
      });

      navigate("/confirm", { state: { fromSubmit: true } });
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível realizar a solicitação!");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchRefound(id: string) {
    try {
      const { data } = await api.get<RefundAPIResponse>(`/refunds/${id}`)

      setName(data.name);
      setCategory(data.category);
      setAmount(formatCurrency(data.amount));
      setFileURL(data.filename)
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar os dados da solicitação");
    }
  }

  useEffect(() => {
    if (id) {
      fetchRefound(id);
    }
  }, [id]);

  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados da despesa para solicitar reembolso.
        </p>
      </header>
      <Input
        required
        legend="Nome da solicitação"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!!id}
      />
      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!id}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option key={category} value={category}>
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>
        <Input
          required
          legend="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!!id}
        />
      </div>
      {(id && fileURL) ? (
        <a
          href={`http://localhost:3333/uploads/${fileURL}`}
          target="_blank"
          className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear"
        >
          <img src={fileSvg} alt="Ícone de arquivo" />
          Abrir comprovante
        </a>
      ) : (
        <Upload
          filename={file && file.name}
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
        />
      )}

      <Button type="submit" isLoading={isLoading}>
        {id ? "Voltar" : "Enviar"}
      </Button>
    </form>
  );
}
