import { DebouncedInput } from "../common/tabla/DebouncedInput";
import { ButtonShopping } from "@/components/Pos/ButtonShopping";

interface Props {
  setSearch: (value: string) => void;
  search: string;
  categories: { id: string; nameCat: string }[];
  category: string | null;
  setCategory: (value: string | null) => void;
  isOpenShopping: boolean;
  setIsOpenShopping: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderPos = (props: Props) => {
  const {
    setSearch,
    search,
    categories,
    category,
    setCategory,
    isOpenShopping,
    setIsOpenShopping,
  } = props;
  return (
    <header className="px-4 py-1 bg-card border-b border-border shadow-sm max-h-scren">
      <div className="w-full mx-auto flex flex-col gap-2 md:gap-2 items-start justify-center">
        <div className="w-full flex justify-between gap-4">
          <DebouncedInput
            onChange={(value) => setSearch(String(value))}
            debounce={300}
            valueDafault={search}
            placeholder="Buscar por nombre o cod. único..."
          />
          <ButtonShopping
            isOpenShopping={isOpenShopping}
            setIsOpenShopping={setIsOpenShopping}
          />
        </div>
        <div className="flex flex-1 gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setCategory(null)}
            className={`px-3 py-1 rounded-full text-sm font-body whitespace-nowrap transition-all cursor-pointer ${
              category === null
                ? "bg-brand text-brand-foreground"
                : "bg-secondary border border-border text-secondary-foreground hover:bg-secondary/80"
            } `}
          >
            Todos
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-sm font-body whitespace-nowrap transition-all cursor-pointer ${
                category === cat.id || (cat.nameCat === "Todos" && !category)
                  ? "bg-brand text-brand-foreground"
                  : "bg-accent border border-border text-accent-foreground hover:bg-accent/80"
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
