import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import type { Country } from "../types/Country";
import './home.css'



export default function Home() {

    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [input, setInput] = useState("");
    const [region, setRegion] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const countriesPage = 10;

    useEffect(() => {
        fetchCountries();
    }, [])

    async function fetchCountries() {
        setLoading(true)
        try {
            const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,capital,population,languages");
            if (!res.ok) throw new Error("Erro ao buscar países");
            const data: Country[] = await res.json();
            setCountries(data);

        } catch (erro) {
            setError((erro as Error).message);

        } finally {
            setLoading(false);
        }
    }

    function buscarCountries() {

        let filtered = countries;

        if (input.trim()) {
            filtered = filtered.filter((country) =>
                country.name.common.toLowerCase().includes(input.toLowerCase())
            );
        }

        if (region) {
            filtered = filtered.filter((country) => country.region === region);
        }

        
        
        return filtered;
    }

    const filteredCountries = buscarCountries();

    const totalPages = Math.ceil(filteredCountries.length / countriesPage);
    const indexOfLast = currentPage * countriesPage;
    const indexOfFirst = indexOfLast - countriesPage;
    const currentCountries = filteredCountries.slice(indexOfFirst, indexOfLast);

    function goToPage(page: number) {
        if (page < 1 || page > totalPages) return
        
        setCurrentPage(page);
        window.scroll({ top: 0, behavior: "smooth" });
    }


    if (loading) return <p>Carregando países...</p>
    if (error) return <p>Erro: {error}</p>


    return (
        <div style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%"
        }}>
            <h1 className="title">🌍 Lista de Países</h1>
            <div className="containerHeader" style={{justifyContent: "center" }}>
                <input className="input"
                    type="text"
                    placeholder="Buscar..."
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value)
                        setCurrentPage(1)
                    }}
                />

                <select className="select"
                    value={region}
                    onChange={(e) => {
                        setRegion(e.target.value)
                        setCurrentPage(1);
                    }}
                    style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginRight: "0.5rem",
                    }}
                >
                    <option value="">Todas as regiões</option>
                    <option value="Africa">África</option>
                    <option value="Americas">Américas</option>
                    <option value="Asia">Ásia</option>
                    <option value="Europe">Europa</option>
                    <option value="Oceania">Oceania</option>
                </select>

                <button className="button"
                    onClick={() => {
                        setInput("");
                        setRegion("");
                        fetchCountries();
                    }}
                >
                    Buscar
                </button>
                <div style={{display: "flex", gap: "10px", alignItems: "center" }}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => goToPage(currentPage - 1)}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "5px",
                            border: "none",
                            background: "#007BFF",
                            color: "#fff",
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        }}
                    >
                        ← Anterior
                    </button>

                    <span>
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => goToPage(currentPage + 1)}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "5px",
                            border: "none",
                            background: "#007BFF",
                            color: "#fff",
                            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                        }}
                    >
                        Próxima →
                    </button>
                </div>
            </div>
            <div className="countries-grid">
                {currentCountries.map((country) => (
                    <Link
                        key={country.cca3}
                        to={`/detail/${country.cca3}`}
                        className="country-card"
                    >
                        <img
                            src={country.flags.png}
                            alt={country.flags.alt || `Bandeira de ${country.name.common}`}
                        />
                        <h2>{country.name.common}</h2>
                        <p>🌎 Região: {country.region}</p>
                        <p>🏙️ Capital: {country.capital ? country.capital[0] : "N/A"}</p>
                        <p>👥 População: {country.population.toLocaleString("pt-BR")}</p>
                    </Link>
                ))}
            </div>
        </div>

    )
}