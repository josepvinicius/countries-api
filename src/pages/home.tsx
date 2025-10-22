import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import type { Country } from "../types/Country";



export default function Home() {

    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetCountries();
    }, [])

    async function fetCountries() {
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


    if (loading) return <p>Carregando países...</p>
    if (error) return <p>Erro: {error}</p>


    function BuscarCountries() {
        if (!input.trim()) {
            fetCountries();
        }
    }


    return (
        <div style={{ padding: "2rem" }}>
            <h1>🌍 Lista de Países</h1>
            <div>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    onClick={BuscarCountries}>
                    Buscar
                </button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "1rem",
                }}
            >
                {countries.map((country) => (
                    <Link
                        key={country.cca3}
                        to={`/detail/${country.cca3}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                                padding: "1rem",
                                textAlign: "center",
                                background: "#f8f8f8",
                            }}
                        >
                            <img
                                src={country.flags.png}
                                alt={country.flags.alt || `Bandeira de ${country.name.common}`}
                                style={{ width: "100px", borderRadius: "5px" }}
                            />
                            <h2>{country.name.common}</h2>
                            <p>🌎 Região: {country.region}</p>
                            <p>🏙️ Capital: {country.capital ? country.capital[0] : "N/A"}</p>
                            <p>👥 População: {country.population.toLocaleString("pt-BR")}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}