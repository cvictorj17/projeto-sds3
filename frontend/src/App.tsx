import NavBar from "components/navbar";
import Footer from "components/footer";
import DataTable from "components/dataTable";
function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="text-primary">Olá mundo!</h1>

        <DataTable />
      </div>
      <Footer />
    </>
  );
}

export default App;
