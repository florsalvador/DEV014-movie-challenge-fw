import "../styles/ListOptions.css";

interface ListOptionsProps {
  selectType: string,
  options: { value: string, label: string }[],
  selectedOption: {value: string, label: string} | null,
  onChange(e: string): void,
  onClear(e?: string): void
}

function ListOptions({selectType, options, selectedOption, onChange, onClear}: ListOptionsProps) {
  const optionElements = options.map(option => 
    <option data-testid={option.value} key={option.value} value={option.value}>{option.label}</option>
  );
  return (
    <>
      <form>
        <select name="select" data-testid="select" defaultValue={selectedOption?.value} onChange={e => onChange(e.target.value)}>
          <option value="">{selectType}</option>
          {optionElements}
        </select>
        <button title="Clear selection" className="button-clear-select" type="reset" onClick={() => onClear()}>&#8635;</button>
      </form>
    </>
  )
}

export default ListOptions
