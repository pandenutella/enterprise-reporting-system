import React, { Suspense, useMemo } from "react";

const DynamicIcon = ({ name, color }) => {
  const type = color ? "TwoTone" : "Outlined";

  const Icon = useMemo(() => {
    return React.lazy(() =>
      import(`@ant-design/icons/es/icons/${name}${type}.js`)
    );
  }, [name]);

  return (
    <Suspense fallback={<></>}>
      <Icon twoToneColor={color} />
    </Suspense>
  );
};

export default DynamicIcon;
