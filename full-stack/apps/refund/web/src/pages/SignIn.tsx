import { useActionState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().trim().min(6, "Senha deve ter pelo menos 6 dígitos"),
});

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, null);

  const { save } = useAuth();

  async function signIn(_: any, formData: FormData) {
    try {
      const { email, password } = signInSchema.parse({
        email: formData.get("email")!,
        password: formData.get("password"),
      });

      const { data } = await api.post("/sessions", { email, password });
      save(data);

      return { email, password };
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }

      return { message: "Não foi possível entrar no sistema!" };
    }
  }

  return (
    <form className="w-full flex flex-col gap-4" action={formAction}>
      <Input
        name="email"
        required
        legend="E-mail"
        type="email"
        placeholder="seu@email.com"
        defaultValue={state?.email ? String(state.email) : ""}
      />
      <Input
        name="password"
        required
        legend="Senha"
        type="password"
        placeholder="Digite sua senha"
        defaultValue={state?.password ? String(state.password) : ""}
      />
      {state?.message && (
        <p className="text-sm text-red-600 my-4 font-medium">
          {state?.message}
        </p>
      )}
      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>
      <a
        href="/signup"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
  );
}
