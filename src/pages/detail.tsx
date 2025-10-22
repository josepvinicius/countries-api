import { useEffect, useState } from "react"
import type { Country } from "../types/Country"
import { data } from "react-router-dom";


export default function Detail() {

    const [countries, setCountries] = useState<Country[]>([]);
    const [loding, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,capital,population,languages")
            .then((res) => res.json())
            .then((data) => setCountries(data))
            .finally(() => setLoading(false));
    }, [])

    if(loding) return <p>Carregando País...</p>


    return (

        {countries.map((country)) =>
            (
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
        )}
        
    )
}