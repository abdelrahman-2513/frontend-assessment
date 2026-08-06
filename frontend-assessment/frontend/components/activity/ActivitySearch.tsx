type ActivitySearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ActivitySearch({ value, onChange }: ActivitySearchProps) {
  return (
    <label className="field">
      <span className="field-label">Search</span>
      <input
        className="input"
        type="search"
        placeholder="Search activity"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search activity"
      />
    </label>
  );
}
