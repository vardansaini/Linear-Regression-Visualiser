import { useSelector } from "react-redux";

import { RootState } from "./store/store";

import "./App.css";

// Components:
import Input from "./Components/Input";
import Output from "./Components/Output";
import Loading from "./Components/Loading";

interface Props {}

const App = (props: Props) => {
  const showLoading = useSelector(
    (state: RootState) => state.AppState.showLoading
  );

  return (
    <div>
      <Input />
      <Output />
      {showLoading ? <Loading /> : <div />}
    </div>
  );
};

export default App;
