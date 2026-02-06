import ToDo from './toDoList';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return(<>
      <ToDo/>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
  </>);
}

export default App
