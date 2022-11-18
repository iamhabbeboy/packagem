import { useState } from 'react';
import Search from './components/Search';
import Package from './components/Package';
import { PackageResponseInterface } from './data/types';

const Main = () => {
  const [cli, setCli] = useState();
  const [packages, setPackages] = useState<PackageResponseInterface[]>([]);

  return (
    <div className="layout">
      <h1>Search your package</h1>
      <Search setData={setPackages} />
      <h3>Total Result Found: {packages.length}</h3>
      <div className="list-package">
        {packages.map((value) => (
          <Package onPackage={value} />
        ))}
      </div>
    </div>
  );
};
// const propTypes = {
//   title: propTypes.string.isRequired,
// };

// Main.prototype = propTypes;
export default Main;
