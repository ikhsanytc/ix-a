import React from "react";

type EachUtilsProps<T> = {
  of: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

const EachUtils = <T,>({ of, renderItem }: EachUtilsProps<T>) => {
  return (
    <>
      {of.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
    </>
  );
};

export default EachUtils;
