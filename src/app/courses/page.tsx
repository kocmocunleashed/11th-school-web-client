import Link from "next/link";

const sections = [
  {
    id: "clubs",
    title: "Секц, дугуйлан",
    description: "Соёл, спорт, STEAM клубүүдэд хамрагдах боломжууд.",
  },
  {
    id: "calendar",
    title: "Календар",
    description: "Сургалтын хуваарь, амралт болон тэмдэглэлт өдөрүүд.",
  },
  {
    id: "environment",
    title: "Сургалтын орчин",
    description: "Хичээлийн байр, лаборатори, номын сангийн орчин.",
  },
  {
    id: "rules",
    title: "Дүрэм журам",
    description: "Суралцагчийн ёс зүй, сургуулийн дүрэм болон бодлого.",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-primary/10 px-6 py-16 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-3">
          <p className="text-secondary font-semibold tracking-wide uppercase">
            Сургалт
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-background">
            Манай сургалтын бүтцээр аялна уу
          </h1>
          <p className="text-background/80 max-w-2xl mx-auto">
            Таны сонирхож буй сургалтын мэдээлэл, клуб, хуваарь болон дүрмийг
            доорх хэсгүүдээс шууд олж үзээрэй.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="block bg-white/90 border border-secondary/20 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary text-background flex items-center justify-center font-bold text-lg shadow">
                  {section.title[0]}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-secondary">
                    {section.title}
                  </h2>
                  <p className="text-background/80 mt-2">{section.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-white/95 border border-secondary/15 rounded-2xl p-8 shadow-lg scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-1.5 rounded-full bg-secondary" />
                <h2 className="text-2xl md:text-3xl font-bold text-secondary">
                  {section.title}
                </h2>
              </div>
              <p className="text-background/80 mt-4">{section.description}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <h3 className="font-semibold text-secondary mb-2">Товч мэдээлэл</h3>
                  <p className="text-background/80 text-sm">
                    Энд илүү нарийвчилсан мэдээлэл, холбогдох багш, цагийн
                    хуваарийг байрлуулах боломжтой.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
                  <h3 className="font-semibold text-secondary mb-2">Үйлдэл</h3>
                  <p className="text-background/80 text-sm">
                    Нэмэлт линк, баримт бичиг эсвэл бүртгэлийн товчыг энд
                    холбоно.
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
