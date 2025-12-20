import { DebouncedInput } from "../common/tabla/DebouncedInput";

interface Props {
  setSearch: (value: string) => void;
  search: string;
  categories: { id: string; nameCat: string }[];
  category: string | null;
  setCategory: (value: string | null) => void;
}

export const HeaderPos = (props: Props) => {
  const { setSearch, search, categories, category, setCategory } = props;
  return (
    <header className="px-4 py-1 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        <DebouncedInput
          onChange={(value) => setSearch(String(value))}
          debounce={300}
          valueDafault={search}
          placeholder="Buscar por nombre o cod. único..."
        />
        <div className="flex flex-1 gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setCategory(null)}
            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              category === null
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
            } `}
          >
            Todos
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                category === cat.id || (cat.nameCat === "Todos" && !category)
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              {cat.nameCat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
