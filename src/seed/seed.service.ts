import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Pokemon} from "../pokemon/entities/pokemon.entity";
import {Model} from "mongoose";
import {PokeResponseInterface} from "./interfaces/poke-response.interface";
import {AxiosAdapter} from "../common/adapters/axios.adapter";


@Injectable()
export class SeedService {

  constructor(

      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
      private readonly http: AxiosAdapter,
  ) {

  }
  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data=await this.http.get<PokeResponseInterface>('https://pokeapi.co/api/v2/pokemon?limit=10');
    const insertPromiseArray=[]
    const pokemtoInsert=[]
    /*for (const {name, url} of data.results) {
      const segments = url.split("/");
      const no:number=+segments[segments.length-2];
      await this.pokemonModel.create({no,name})
    }*/
   /* data.results.forEach(({name,url})=>{
      const segments = url.split("/");
      const no:number=+segments[segments.length-2];
      insertPromiseArray.push(this.pokemonModel.create({no,name}))
    })
    await Promise.all(insertPromiseArray);*/
    data.results.forEach(({name,url})=>{
      const segments = url.split("/");
      const no:number=+segments[segments.length-2];
      pokemtoInsert.push({name,no})
    })
    await this.pokemonModel.insertMany(pokemtoInsert);
    return 'seed executed';
  }



}
