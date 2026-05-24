// Rendered inside the locale layout, so Header + Footer are present.
// Kept locale-agnostic (bilingual) to avoid request-locale coupling in the
// not-found boundary; the home link does a plain navigation to "/".
export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-bwt-navy px-6 py-24 text-center text-bwt-ivory">
      <div>
        <p className="font-serif text-7xl font-normal leading-none text-bwt-gold sm:text-8xl">404</p>
        <h1 className="mt-6 font-serif text-2xl font-normal sm:text-3xl">
          Страница не найдена · Sahifa topilmadi
        </h1>
        <p className="mx-auto mt-3 max-w-md font-sans text-bwt-ivory/70">
          Возможно, ссылка устарела или введена с ошибкой. · Havola eskirgan yoki xato kiritilgan
          bo&apos;lishi mumkin.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-btn bg-bwt-gold px-7 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-bwt-navy-dark transition-colors hover:bg-bwt-gold-light"
        >
          На главную · Bosh sahifaga
        </a>
      </div>
    </section>
  );
}
