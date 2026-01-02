import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "70px", marginBottom: "10px" }}>404</h1>
      <h2>Page introuvable</h2>
      <p>L’URL que vous avez saisi n'existe pas.</p>

      <Link 
        to="/" 
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#000",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px"
        }}
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
