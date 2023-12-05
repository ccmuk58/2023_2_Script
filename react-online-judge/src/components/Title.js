export default function Title() {
	return (
	  <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
		<div className="container px-4 md:px-6">
		  <div className="grid gap-6 items-center">
			<div className="flex flex-col justify-center space-y-4 text-center">
			  <div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
				  React-Online-Judge
				</h1>
				<p className="max-w-[700px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
				  This is a web application that provides a coding test environment.
				</p>
			  </div>
			  <div className="w-full max-w-full space-y-2 mx-auto">
				<div className="grid grid-cols-3 gap-6">
				  <div className="flex flex-col space-y-2">
					<h2 className="text-xl font-bold text-white">Feature 1</h2>
					<p className="text-zinc-200 dark:text-zinc-100">어쩌고 저쩌고	</p>
				  </div>
				  <div className="flex flex-col space-y-2">
					<h2 className="text-xl font-bold text-white">Feature 2</h2>
					<p className="text-zinc-200 dark:text-zinc-100">
					  어쩌고 저쩌고 2
					</p>
				  </div>
				  <div className="flex flex-col space-y-2">
					<h2 className="text-xl font-bold text-white">Feature 3</h2>
					<p className="text-zinc-200 dark:text-zinc-100">어쩌고 저쩌고 3</p>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </section>
	)
  }