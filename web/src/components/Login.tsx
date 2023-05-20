interface LoginProps {
	onChangePage(page: string): void
}

export function Login({ onChangePage }: LoginProps) {
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h1 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
						Bom Dia 🌞
					</h1>
					<h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
						Faça o login com sua conta!
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action="#" method="POST">
						<div>
							<label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
								Telefone
							</label>
							<div className="mt-2">
								<input
									id="phone"
									name="phone"
									type="tel"
									autoComplete="phone"
									placeholder="(00) 00000-0000"
									pattern="[0-9]{10,11}"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
									Senha
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Login
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Ainda não é um membro?{' '}
						<button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							onClick={() => {
								onChangePage('registro')
							}}>
							Ir para registro!
						</button>
					</p>
				</div>
			</div>
		</>
	)
}
