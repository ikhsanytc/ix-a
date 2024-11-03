import { Fragment } from "react";

type EachUtilsProps<T> = {
  of: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

const EachUtils = <T,>({ of, renderItem }: EachUtilsProps<T>) => {
  return (
    <>
      {of.map((item, index) => (
        <Fragment key={index}>{renderItem(item, index)}</Fragment>
      ))}
    </>
  );
};

export default EachUtils;
