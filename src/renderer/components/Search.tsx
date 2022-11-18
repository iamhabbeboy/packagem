import PropTypes from 'prop-types';
import { useState, ChangeEvent } from 'react';
import { PackageResponseInterface } from '../data/types';

const { ipcRenderer } = window.electron;
interface SearchProps {
  setData: (data: any) => void;
}
const Search: React.FunctionComponent<SearchProps> = ({ setData }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [packages, setPackages] = useState<PackageResponseInterface[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const fetchPackage = (name: string) => {
    // setLoading(true);
    const payload = {
      url: `https://www.npmjs.com/search/suggestions?q=${name}`,
      body: {
        headers: { 'Content-Type': 'application/json' },
      },
    };
    ipcRenderer.sendMessage('api-request', [payload]);
    ipcRenderer.on('api-response', (response: any) => {
      const json = JSON.parse(response);
      setData(json);
      // setLoading(false);
    });
  };

  const handleShell = () => {
    fetchPackage(input);
  };

  return (
    <div>
      <input
        type="text"
        className="input-field"
        value={input}
        onChange={(e) => handleChange(e)}
        placeholder="search your package"
      />
      <div className="Hello">
        <button type="button" onClick={handleShell}>
          <span role="img" aria-label="books">
            📚
          </span>
          Search
        </button>
        {/* </a> */}
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              👾
            </span>
            Add Project
          </button>
        </a>
      </div>
    </div>
  );
};

export default Search;
