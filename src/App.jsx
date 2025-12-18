import PaginatedTable from "./Component/PaginatedTable";
import ScrollPagination from "./Component/ScrollPagination";
import StopWatch from "./Component/StopWatch";
import Counter from "./Component/HOC/Counter";
import OnHover from "./Component/HOC/OnHover";
import Translate from "./Component/Translate";
import DataFetcher from "./ReduxThunk/DataFetcher";

const App = () => {
  return (
    <div>
      <p>App</p>
      <DataFetcher />
      <PaginatedTable />
      <ScrollPagination />
      <StopWatch />
      <br /> <br />
      <Counter />
      <br />
      <br />
      <OnHover />
      <br />
      <br />
      {/* <Translate /> */}
    </div>
  );
};

export default App;

// function AgeCalculator() {
//   return (
//     <div className="conatiner">
//       <h2 className="title"></h2>
//       <label className="label"></label>
//       <input id="birthdate" type="date" className="input-date" />
//       <button className="btn-calc">Calculate Age</button>
//       <p className="error-msg"></p>
//       <p className="age-result"></p>
//     </div>
//   );
// }

// export default AgeCalculator;
