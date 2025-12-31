import { useQueryTopBranches } from "../top/useTopBranches";

export const useTopB = () => {
  const { data: topBranches } = useQueryTopBranches(5);
  return {
    topBranches: topBranches || [],
  };
};

