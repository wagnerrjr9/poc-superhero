"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./globals.css";

const ACCESS_TOKEN = "1382ab1e9d6838d6858343a91881184d"; // Substitua pelo seu token válido
const BASE_URL = `https://superheroapi.com/api.php/${ACCESS_TOKEN}/`;

async function fetchHero(id) {
  try {
    const response = await axios.get(`${BASE_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar herói:", error);
    return null;
  }
}

export default function Home() {
  const [heroes, setHeroes] = useState([]);

  // IDs dos heróis a serem buscados
  const heroIDs = [289, 612];

  useEffect(() => {
    async function getHeroes() {
      const results = await Promise.all(heroIDs.map((id) => fetchHero(id)));
      setHeroes(results.filter((hero) => hero !== null));
    }
    getHeroes();
  }, []);

  return (
    <div id="heroes">
      {heroes.map((hero) => (
        <article key={hero.id}>
          <img
            src={hero.image?.url || "https://via.placeholder.com/300x400"}
            alt={hero.name || "Hero Image"}
          />
          <h1>{hero.name || "Unknown Hero"}</h1>
          <p>
            Intelligence:
            <span
              style={{
                width: `${hero.powerstats?.intelligence || 0}%`,
                backgroundColor: "#F9B32F",
                display: "block",
                height: "10px",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            ></span>
          </p>
          <p>
            Strength:
            <span
              style={{
                width: `${hero.powerstats?.strength || 0}%`,
                backgroundColor: "#FF7C6C",
                display: "block",
                height: "10px",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            ></span>
          </p>
        </article>
      ))}
    </div>
  );
}
