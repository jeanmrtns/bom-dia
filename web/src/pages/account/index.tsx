import Header from '@/components/Header'

export default function Account() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-8">
        <form className="space-y-6" action="#" method="POST">
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
                name="name"
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
                name="phone"
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
                name="image-theme"
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
                name="sentence-theme"
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
              className="flex w-full lg:max-w-xs justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Editar perfil
            </button>
          </div>
        </form>
      </main>
    </>
  )
}
