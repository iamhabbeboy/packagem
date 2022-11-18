import PropTypes from 'prop-types';
import { PackageResponseInterface } from 'renderer/data/types';

const { ipcRenderer } = window.electron;

interface PackageProps {
  onPackage: PackageResponseInterface;
}

const Package: React.FunctionComponent<PackageProps> = ({ onPackage }) => {
  const handleInstall = (packageName: PackageResponseInterface) => {
    const command = `yarn add ${packageName}`;
    ipcRenderer.sendMessage('send-command', [
      `cd /Users/solomon/Work/test-manager && ${command}`,
    ]);
    ipcRenderer.on('reply', (response: any) => {
      let data = response.error;
      if (data !== null) {
        data = response.stdout;
      }
      data = data.toString();
      // setCli(data);
    });
  };

  return (
    <li className="package">
      <div className="detail">
        <h4>{onPackage.name}</h4>
        <p>{onPackage.version}</p>
        <p>{onPackage.description}</p>
      </div>
      <div>
        <button type="button" onClick={() => handleInstall(onPackage)}>
          <span role="img" aria-label="folded hands">
            💿
          </span>
          Install
        </button>
      </div>
    </li>
  );
};

export default Package;
