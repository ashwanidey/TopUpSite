import Product from "../models/Products.js";

export const getGames = async(req,res) => {
  try{
    const games = await Product.find({type : "games"});
    res.status(200).json(games);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
}

export const getOtt = async(req,res) => {
  try{
    const ott = await Product.find({type : "ott"});
    res.status(200).json(ott);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
}

export const getTrending = async(req,res) => {
  try{
    const trending = await Product.find({isTrending : "true"});
    res.status(200).json(trending);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
}