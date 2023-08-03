import React from 'react';
import {useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PokeballImg from "../assets/pokeball.png"
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import { PokemonDetails } from '../types/types';
import styles from "./pokemons.module.css";
import { fechtPokemon } from '../api/fetchPokemon';


const Pokemon = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState<PokemonDetails>();
    const { name } = useParams ();
    const navigate = useNavigate();

useEffect(() =>{
 async function getPokemon() {
    setIsLoading(true);
    const fetchedPokemon = await fechtPokemon(name as string);
    setPokemon(fetchedPokemon);
    setIsLoading(false)
    }
    getPokemon();
    }, [name]);

    if(isLoading || !pokemon) return <LoadingScreen />

    return <>
      <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
        <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball"  /> Go Back
        </button> 
        <div className={styles.pokemon}>
          <main className={styles.pokemonInfo}>
            <div className={styles.pokemonTitle}>{pokemon?.name?.toUpperCase()}</div>
            <div>Nr. {pokemon?.id}</div>
            <div>
                <img className={styles.pokemonInfoImg} src={pokemon?.imgSrc} alt={pokemon?.name} />
            </div>
            <div>HP: {pokemon?.hp}</div>
            <div>Attack: {pokemon?.attack}</div>
            <div>Defense: {pokemon?.defense}</div>
            
          </main>
        </div>
        <Footer />


    </>
        
    
};

export default Pokemon;