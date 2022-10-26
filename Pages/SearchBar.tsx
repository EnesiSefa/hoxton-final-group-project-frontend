import React from "react";

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export function SearchBar({ setSearch }: Props) {
  return (
    <div>
      <input
        className=""
        placeholder="Search for a course..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
}
