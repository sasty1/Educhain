export default function Footer() {
  return (
    <footer style={{
      marginTop: "4rem",
      padding: "2rem",
      textAlign: "center",
      borderTop: "1px solid rgba(79, 209, 197, 0.2)",
      color: "#a0aec0",
      fontSize: "0.95rem"
    }}>
      <p>
        Created by{" "}
        <a 
          href="https://twitter.com/iam_sasty" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: "#4fd1c5", 
            textDecoration: "none",
            fontWeight: "bold",
            transition: "color 0.3s"
          }}
          onMouseOver={(e) => e.currentTarget.style.color = "#00e6a0"}
          onMouseOut={(e) => e.currentTarget.style.color = "#4fd1c5"}
        >
          @iam_sasty
        </a>
      </p>
    </footer>
  );
}
