import Spinner from "react-bootstrap/esm/Spinner";

const Loading = () => {
  const loadingCss = {
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
  };

  return (
    <>
      <div style={loadingCss}>
        <Spinner animation="grow" size="xl" variant="primary" />
      </div>
    </>
  );
};

export default Loading;
