import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import {Pokemon} from "./entities/pokemon.entity";
import {isValidObjectId, Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class PokemonService {
  constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
  ) {
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const Pokemon = await this.pokemonModel.create(createPokemonDto);
    }catch (e) {
        this.handleExceptions(e)
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

 async findOne(term: string) {
    let pokemon: Pokemon;
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no: +term});
    }
    else if(!pokemon && isValidObjectId(term)){
        pokemon = await this.pokemonModel.findById(term);
    }
    else if(!pokemon){
     pokemon=await this.pokemonModel.findOne({name: term.toLowerCase().trim()});
    }
    if(!pokemon) throw new NotFoundException (`Pokemon not found, name or number is wrong "${term}"`);
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    //await pokemon.updateOne(updatePokemonDto);
      // return { ...pokemon.toJSON(), ...updatePokemonDto}
      try{
    const alt=await this.pokemonModel.findByIdAndUpdate(pokemon, updatePokemonDto, {new: true});
    return alt;
      }catch (e) {
      this.handleExceptions(e)
      }
  }

  async remove(id: string) {
    /*const pokemon = await this.findOne(id);
    await pokemon.deleteOne();*/
      //const res= await this.pokemonModel.findByIdAndRemove(id);
      const {deletedCount}=await this.pokemonModel.deleteOne({_id: id});
      if(deletedCount===0){
          throw new BadRequestException(`Pokemon not found, id is wrong "${id}"`);
      }
      return ;
  }

  private handleExceptions(e:any){
      if(e.code === 11000){
          throw new BadRequestException('Pokemon already exists',e.message);
      }
      throw new InternalServerErrorException(e.message);
  }
}
