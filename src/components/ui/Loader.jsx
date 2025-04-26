import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <ClipLoader color="#198754" size={50} />
    </div>
  );
};

export default Loader;
