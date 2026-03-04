import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function ErrorLayout() {
  return (
    <div className="home-layout home-layout--bg">
      <Header />
      <ErrorPage />
      <Footer />
    </div>
  );
}