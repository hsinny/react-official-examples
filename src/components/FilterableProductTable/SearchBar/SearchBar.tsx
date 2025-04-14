import './SearchBar.css';

export default function SearchBar({ 
  filterTxt, 
  isStockOnly,
  onFilterChange, 
  onIsStockOnlyChange, 
}: {
  filterTxt: string;
  isStockOnly: boolean;
  onFilterChange: (value: string) => void;
  onIsStockOnlyChange: (value: boolean) => void;
}) {
  return (
    <div className="searchbar">
      <input 
        type="text" 
        name="keyword" 
        placeholder="Search..." 
        value={filterTxt} 
        onChange={(e) => onFilterChange(e.target.value)}
      />
      <div>
        <input 
          id="isInStock" 
          type="checkbox" 
          name="isInStock" 
          checked={isStockOnly}
          onChange={(e) => onIsStockOnlyChange(e.target.checked)}
        />
        <label htmlFor="isInStock">Only show products in stock</label>
      </div>
    </div>
  )
}