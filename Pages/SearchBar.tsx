import React from "react";

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export function SearchBar({ setSearch }: Props) {
  return (
    <div>
      <input
        className="search"
        placeholder="What do you want to learn?"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
}
