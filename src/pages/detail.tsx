import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import type { Country } from "../types/Country";


export default function Detail() {

    const { cca3 } = useParams<{ cca3: string }>();
    const [country, setCountry] = useState<Country | null>(null);
    const [loding, setLoading] = useState(true);

    useEffect(() => {
        if (!cca3) return;

        async function fetchCountry() {
            try {
                const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`)
                const data: Country[] = await res.json();
                setCountry(data[0]);

            } catch (erro) {
                console.log(`Erro ao buscar país ${erro}`);

            } finally {
                setLoading(false);
            }
        }
        fetchCountry();
    }, [cca3]);

    if (loding) return <p>Carregando Detalhes...</p>
    if (!country) return <p>País não encontrado.</p>;

    return (

        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", margin: "20px", overflow: "hidden" }}>
            <Link 
            style={{ 
                textDecoration: "none",
                background: "#8acbe9",
                padding: "10px",
                borderRadius: "5px"
            }} to="/">⬅️ Voltar</Link>

            <div
                style={{
                    marginTop: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "#d6d6d6",
                    padding: "20px",
                    width: "500px",
                    borderRadius: "10px"
                }}
            >
                <img
                    src={country.flags.png}
                    alt={country.flags.alt || `Bandeira de ${country.name.common}`}
                    style={{ width: "200px", borderRadius: "10px" }}
                />
                <h1>{country.name.common}</h1>
                <h3>{country.name.official}</h3>
                <p>🌍 Região: {country.region}</p>
                <p>🏙️ Capital: {country.capital ? country.capital[0] : "N/A"}</p>
                <p>👥 População: {country.population.toLocaleString("pt-BR")}</p>
                {country.languages && (
                    <p>
                        🗣️ Idiomas: {Object.values(country.languages).join(", ")}
                    </p>
                )}
            </div>
        </div>

    )
}