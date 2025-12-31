///import useQueryTopProducts
import { useQueryTopProducts } from "@/reports/hooks/top/useTopProducts";

interface Props {
  currentBranch: string | null;
}

export const useTop = ({ currentBranch }: Props) => {
  //use useQueryTopProducts
  const { data: topProducts } = useQueryTopProducts(currentBranch, 5);
  return {
    topProducts: topProducts || [],
  };
};

