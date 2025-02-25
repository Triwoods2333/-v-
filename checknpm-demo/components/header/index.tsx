import { Button } from "@/components/ui/button";

export default function () {
  return (
    <header>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-row items-center px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
            <a
              href="/"
              className="flex-1 text-xl font-medium flex items-center"
            >
              {/* <img
                src="/logo.png"
                className="w-10 h-10 rounded-full mr-3"
                alt="logo"
              /> */}
              <span className="font-bold text-primary text-2xl">Malicious Package Check</span>
            </a>

            <div className="flex flex-row items-center lg:flex lg:flex-row lg:space-x-3">
              <div className="hidden md:block mr-8"></div>
            </div>
            <a href="#" className="absolute right-5 lg:hidden"></a>
          </div>
        </nav>
      </div>
    </header>
  );
}
