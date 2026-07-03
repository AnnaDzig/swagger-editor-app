import { CircleAlert } from 'lucide-react';

interface NoEndpointsProps {
  searchingTag: string;
  onClearSearchField: () => void;
  onSetActiveTag: (activeTag: string | null) => void;
}

const NoEndpoints = ({
  searchingTag,
  onClearSearchField,
  onSetActiveTag,
}: NoEndpointsProps) => {
  const resetFilters = () => {
    onClearSearchField();
    onSetActiveTag(null);
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#0B0E14] pt-[9vh]">
      <CircleAlert size={16} color="#252B32" />
      <p className="text-[#252B32] mt-[1vh]">
        No endpoints match: {searchingTag}
      </p>
      <button
        className="flex justify-center items-center  w-[90] h-[28] text-sm text-[#7A84EA] bg-[#101322] border border-[#202348] rounded-md"
        type="button"
        onClick={resetFilters}
      >
        Clear filters
      </button>
    </div>
  );
};

export default NoEndpoints;
