import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ChangeEvent, useState } from 'react';

const { ipcRenderer } = window.electron;

interface PackageResponseInterface {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: Array<string>;
  date: string;
  links: object;
  author: object;
  publisher: object;
  maintainers: Array<object>;
}

const MainApp = () => {
  const [input, setInput] = useState('');
  const [cli, setCli] = useState();
  const [packages, setPackages] = useState<PackageResponseInterface[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const fetchPackage = (name: string) => {
    const payload = {
      url: `https://www.npmjs.com/search/suggestions?q=${name}`,
      body: {
        headers: { 'Content-Type': 'application/json' },
      },
    };
    ipcRenderer.sendMessage('api-request', [payload]);
    ipcRenderer.on('api-response', (response: any) => {
      const json = JSON.parse(response);
      setPackages(json);
    });
  };

  const handleInstall = (resp: PackageResponseInterface) => {
    const command = `yarn add ${resp.name}`;
    // console.log(command);
    ipcRenderer.sendMessage('send-command', [
      `cd /Users/solomon/Work/test-manager && ${command}`,
    ]);
    ipcRenderer.on('reply', (response: any) => {
      let data = response.error;
      if (data !== null) {
        data = response.stdout;
      }
      data = data.toString();
      // console.log(data);
      setCli(data);
    });
  };

  const handleShell = () => {
    fetchPackage(input);
  };

  return (
    <div className="layout">
      <h1>Search your package</h1>
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
      <div className="list-package">
        <h3>Packages: {packages.length}</h3>
        {packages.map((value) => (
          <li className="package">
            <div>
              <h4>{value.name}</h4>
              {/* <p>{value.author.name}</p> */}
              <p>{value.version}</p>
              <p>{value.description}</p>
            </div>
            <div>
              <button type="button" onClick={() => handleInstall(value)}>
                <span role="img" aria-label="folded hands">
                  💿
                </span>
                Install
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}
