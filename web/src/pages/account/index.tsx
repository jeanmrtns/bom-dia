import Header from '@/components/Header'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/api'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

const updateAccountSchema = z.object({
  name: z.string().min(6),
  phone: z.string().min(6),
  pictureTheme: z.string().min(6),
  phraseTheme: z.string().min(6),
})

interface updateAccountResponse {
  id: number
  name: string
  phone: string
  phraseTheme: string
  pictureTheme: string
}

type updateAccountData = z.infer<typeof updateAccountSchema>

export default function Account() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<updateAccountData>({
    resolver: zodResolver(updateAccountSchema),
  })

  const { data: userData } = useQuery(['userData'], async () => {
    const response = await api.get<updateAccountResponse>('/user-by-token')
    const data = response.data
    setValue('name', data.name)
    setValue('phone', data.phone)
    setValue('phraseTheme', data.phraseTheme)
    setValue('pictureTheme', data.pictureTheme)

    return data
  })

  async function onSubmit(data: updateAccountData) {
    if (userData) {
      await api.put(`/user/${userData.id}`, data)
      toast.success('Preferencias atualizadas!')
    }
  }

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome
            </label>
            <div className="mt-2">
              <input
                id="name"
                {...register('name')}
                type="text"
                autoComplete="name"
                placeholder="Fulano de Tal"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Telefone
            </label>
            <div className="mt-2">
              <input
                id="phone"
                {...register('phone')}
                type="tel"
                autoComplete="phone"
                placeholder="(00)00000-0000"
                pattern="[0-9]{10,11}"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="image-theme"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tema da imagem
            </label>
            <div className="mt-2">
              <select
                id="image-theme"
                {...register('pictureTheme')}
                autoComplete="image-theme"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>Paisagem</option>
                <option>Flores</option>
                <option>Livros</option>
                <option>Pássaros</option>
                <option>Nascer do Sol</option>
                <option>Espaço Sideral</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="sentence-theme"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tema da frase
            </label>
            <div className="mt-2">
              <select
                id="sentence-theme"
                {...register('phraseTheme')}
                autoComplete="sentence-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>Frases da Bíblia</option>
                <option>Frases motivacionais</option>
                <option>Frases sobre amizade</option>
                <option>Frases sobre autocrítica</option>
                <option>Pensamentos filosóficos</option>
                <option>Citações famosas</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full lg:max-w-xs justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-zinc-500 disabled:cursor-not-allowed disabled:hover:bg-zinc-500"
            >
              Editar perfil
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = parseCookies(context)

  if (!cookies) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  api.defaults.headers.common.authorization = cookies['@bomdia:token']

  return {
    props: {}, // Will be passed to the page component as props
  }
}
